import { FastifyPluginAsync } from "fastify";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoConfig } from "../utils";
import { getCorsOrigin } from "../utils";
import { handleError } from "../utils/errorUtils";
import { decodeToken } from "../utils/jwtUtils";
import { DynamoService } from "../services/dynamoService";

const client = new DynamoDBClient(dynamoConfig());
const dynamodb = DynamoDBDocumentClient.from(client);

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.get("/users/config", async function (request, reply) {
    const token = request.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return handleError(
        reply,
        new Error("Authorization token is missing"),
        400
      );
    }

    try {
      const decoded = decodeToken(token);
      const userId = decoded?.["cognito:username"];

      if (!userId) {
        return reply
          .status(400)
          .send({ error: "username not found in the token" });
      }

      const customerSettings = await DynamoService.getItemByUserId(userId);

      return reply
        .status(200)
        .headers({
          "Access-Control-Allow-Origin": getCorsOrigin(),
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        })
        .send({ invoice_config: customerSettings });
    } catch (error) {
      console.log("Error fetching products:", error, typeof error);
      return reply.status(500).send({ error });
    }
  });
};

export default root;
