import { decode, JwtPayload } from "jsonwebtoken";

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return decode(token) as JwtPayload;
  } catch (error) {
    throw new Error("Failed to decode the token");
  }
};
