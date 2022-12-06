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
