'use strict';

const dynamoose = require("dynamoose");
const friendSchema = new dynamoose.Schema({

  "id": String,
  "Name": String,
  "Phone": String

});

const FriendsModel = dynamoose.model("Friends", friendSchema);

exports.handler = async (event) => {

  const id = event.pathParameters.id;

  try {
    let FriendToDelete = await FriendsModel.get(id);
    await FriendsModel.delete(id);

    const response = {
      statusCode: 200,
      body: JSON.stringify(`${FriendToDelete.Name} was successfully deleted`),
    }
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(new Error('Could not delete the friend from the table')),
    }
    return response;
  }
};
