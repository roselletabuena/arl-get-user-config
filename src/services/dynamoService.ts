import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { dynamoConfig } from "../utils";
import { CompanyDetails } from "../models/userInteface";

const client = new DynamoDBClient(dynamoConfig());
const dynamodb = DynamoDBDocumentClient.from(client);

export class DynamoService {
  static async getItemByUserId(user_id: string) {
    try {
      const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
          user_id: user_id,
        },
      };

      const { Item } = await dynamodb.send(new GetCommand(params));

      if (!Item) {
        throw new Error(`Item with ${user_id} not found`);
      }

      const { company_details } = Item;

      return company_details as CompanyDetails;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      throw new Error(`Failed to retrieve item: ${errorMessage}`);
    }
  }
}
