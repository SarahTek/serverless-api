const dynamoose = require("dynamoose");
const friendSchema = new dynamoose.Schema({

  id: String,
  Name: String,
  Phone: String

});
const FriendsModel = new dynamoose.model("Friends", friendSchema);
exports.handler = async (event) => {
  // TODO implement
  console.log(event);

  const friendData = await FriendsModel.query().exec();

  const response = {
    statusCode: 200,
    body: JSON.stringify(friendData),
  };
  return response;
};
