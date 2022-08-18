import { APIGatewayEvent } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { nanoid } from "nanoid";

const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

export const handler = async (event: APIGatewayEvent) => {
  const id = nanoid();

  const putItemCommand = new PutItemCommand({
    Item: {
      id: { S: id },
    },
    TableName: process.env.TABLE_NAME,
  });

  try {
    await dynamoDBClient.send(putItemCommand);

    console.info(`Put item ${id} to ${process.env.TABLE_NAME}`);
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
    };
  }

  return {
    body: "Hello, Serverless Days!",
    statusCode: 200,
  };
};
