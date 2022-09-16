const dynamoose = require("dynamoose");
const friendSchema = new dynamoose.Schema({

  "id": String,
  "Name": String,
  "Phone": String

});
const FriendsModel = dynamoose.model("Friends", friendSchema);

exports.handler = async (event) => {

  let updatePeople;


  try {
    let str = event.body.toString();
    let json = JSON.parse(str);

    let newFriend = {
      body: json
    };

    updatePeople = await FriendsModel.update({
      id: event.pathParameters.id.toString(),
      Name: newFriend.body.name,
      Phone: newFriend.body.Phone
    });
    const response = {
      statusCode: 200,
      body: JSON.stringify(updatePeople),

    };
    return response;

  } catch (error) {
    const response = {

      statusCode: 500,
      body: JSON.stringify(new Error('Could not read from the Friend table')),
    };
    return response;
  }
};
