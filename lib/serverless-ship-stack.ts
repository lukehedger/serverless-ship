import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { join } from "path";

export class ServerlessShipStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new Table(this, "ServerlessShipTable", {
      partitionKey: {
        name: "id",
        type: AttributeType.STRING,
      },
      tableName: "ServerlessShipTable",
    });

    const handler = new NodejsFunction(this, "ServerlessShipFunction", {
      entry: join(__dirname, "/../src/handler.ts"),
      environment: {
        TABLE_NAME: table.tableName,
      },
    });

    table.grantWriteData(handler);

    const api = new LambdaRestApi(this, "ServerlessShipApi", {
      handler: handler,
    });
  }
}
