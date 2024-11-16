import { FastifyPluginAsync } from "fastify";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoConfig } from "../utils";
import { CompanyDetails } from "../models/userInteface";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { getCorsOrigin } from "../utils";

const client = new DynamoDBClient(dynamoConfig());
const dynamodb = DynamoDBDocumentClient.from(client);

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.get("/users/config", async function (_, reply) {
    try {
      // const command = new ScanCommand({
      //   TableName: process.env.TABLE_NAME,
      // });

      // const response = await dynamodb.send(command);

      reply
        .status(200)
        .headers({
          "Access-Control-Allow-Origin": getCorsOrigin(),
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        })
        .send({ response: "hello" });
    } catch (error) {
      console.error("Error fetching products:", error);
      reply.status(500).send({ error: "Failed to fetch products" });
    }
  });
};

export default root;
