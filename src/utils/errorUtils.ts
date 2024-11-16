import { FastifyReply } from "fastify";

export const handleError = (
  reply: FastifyReply,
  error: Error,
  statusCode: number = 500
) => {
  console.error("Error:", error.message);
  return reply.status(statusCode).send({ error: error.message });
};
