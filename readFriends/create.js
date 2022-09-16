'use strict';

const dynamoose = require('dynamoose');

const friendSchema = new dynamoose.Schema({
  "id": String,
  "Name": String,
  "Phone": String
});

const friendModel = dynamoose.model('Friend', friendSchema);

exports.handler = async (event) => {

  const friend = {
    id: event.queryStringParameters.id,
    Name: event.queryStringParameters.Name,
    Phone: event.queryStringParameters.Phone,
  };

  try {
    let newfriend = await friendModel.create(friend);
    const response = {
      statusCode: 200,
      body: JSON.stringify(newfriend),
    }
    return response;
  } catch (error) {

    const response = {
      statusCode: 500,
      body: JSON.stringify(new Error('Could not read from the Friend table'))
    };
    return response;


  }
};
