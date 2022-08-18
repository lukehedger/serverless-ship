export const handler = async () => {
  console.log("Hello, Serverless Days!");

  return {
    body: "Hello, Serverless Days!",
    statusCode: 200,
  };
};
