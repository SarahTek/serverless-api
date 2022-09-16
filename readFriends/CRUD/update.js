const dynamoose = require("dynamoose");
const friendSchema = new dynamoose.Schema({

  "id": String,
  "Name": String,
  "Phone": String

});
const FriendsModel = dynamoose.model("Friends", friendSchema);

exports.handler = async (event) => {

  const id = event.pathParameters.id;
  const friends = {
    name: event.queryStringParameters.Name,
  }

  try {
    let updateFriend = await FriendsModel.update(id, friends);

    const response = {
      statusCode: 200,
      body: JSON.stringify(updateFriend),

    }
    return response

  } catch (error) {
    const response = {

      statusCode: 500,
      body: JSON.stringify(new Error('Could not read from the Friend table')),
    }
    return response;
  }
};
