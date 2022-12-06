import { Request } from "express";
import { decode } from "jsonwebtoken";
import { get } from "lodash";

export const getUsernameFromToken = (req: Request) => {
  const authorization = get(req, "headers.authorization");
  const token = authorization.split(" ")[1];
  const decodedToken = decode(token);
  return get(decodedToken, "context.username");
};
