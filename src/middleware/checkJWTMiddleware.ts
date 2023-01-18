import { NextFunction, Request, Response } from "express";

import { UnauthorizedException } from "../utils/errors";
import { validateJWTToken } from "../services/authService";

const checkJWTMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { headers } = req;
  const { authorization } = headers;
  if (!authorization) {
    const response = {
      code: 401,
      message: "Authorization header not present in the request.",
      type: "UnauthorizedException",
    };
    res.status(401).send(response);
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    const response = {
      code: 401,
      message: "Bearer token not present in the request.",
      type: "UnauthorizedException",
    };
    res.status(401).send(response);
  }
  else {
    try {
      if (validateJWTToken(token)) next();
      else throw new UnauthorizedException();
    } catch (error) {
      console.error("check JWT failed", { error });
      const response = {
        code: error.code || 500,
        message: error.message || "Something went wrong",
        type: error.type || "UnknownError",
      };
      res.status(error.code || 500).send(response);
    }
  }
};

export { checkJWTMiddleware };
