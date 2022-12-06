import { decode, JwtPayload, sign, verify } from "jsonwebtoken";

import { User } from "../models/user";
import { getUserByUsername } from "./DB/databaseService";
import {
  InvalidBasicToken,
  UnauthorizedException,
  UserNotFound,
} from "../utils/errors";

const SECRET = "Jigy1dh0cC6rIsRCkbdWOf14z5J0Nipp"; // normally I wouldn't put the secret or private key as hardcoded string, this is a big simplification

const generateUserToken = async (basicToken: string): Promise<string> => {
  const decodedUserFromToken = decodeBasicToken(basicToken);
  const user = await getUserByUsername(decodedUserFromToken.username);
  if (!user) throw new UserNotFound();
  if (decodedUserFromToken.password !== user.password)
    throw new InvalidBasicToken("Incorrect login or password");
  const date = Date.now();
  const tokenExpiration = date + 3600 * 1000; //1 hour exp date
  const tokenData = JSON.stringify({
    context: {
      username: user.username,
    },
    iss: "recruitment-task",
    sub: "user",
    aud: ["all"],
    iat: date,
    exp: tokenExpiration,
  });
  return sign(tokenData, SECRET);
};

const validateJWTToken = (token: string): boolean => {
  try {
    if (verify(token, SECRET)) {
      const tokenPayload = decode(token) as JwtPayload;
      if (tokenPayload.exp && tokenPayload.exp > Date.now()) {
        return true;
      }
    }
    throw new UnauthorizedException();
  } catch (error) {
    throw new UnauthorizedException(error);
  }
};
const decodeBasicToken = (basicToken: string): User => {
  const decodedToken: string[] = Buffer.from(basicToken, "base64")
    .toString()
    .split(":");
  if (decodedToken.length !== 2) throw new InvalidBasicToken();
  return {
    username: decodedToken[0],
    password: decodedToken[1],
  };
};

export { generateUserToken, validateJWTToken };
