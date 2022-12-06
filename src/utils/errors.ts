export class InvalidBasicToken extends Error {
  public constructor(
    public message: string = "Invalid Basic token.",
    public code: number = 401,
    public type: string = "InvalidBasicToken"
  ) {
    super();
  }
}

export class UserNotFound extends Error {
  public constructor(
    public message: string = "User with a given username not found.",
    public code: number = 404,
    public type: string = "UserNotFound"
  ) {
    super();
  }
}

export class UnauthorizedException extends Error {
  public constructor(
    public message: string = "Forbidden access.",
    public code: number = 403,
    public type: string = "UnauthorizedException"
  ) {
    super();
  }
}

export class BadRequest extends Error {
  public constructor(
    public message: string = "Bad Request.",
    public code: number = 400,
    public type: string = "BadRequest"
  ) {
    super();
  }
}
