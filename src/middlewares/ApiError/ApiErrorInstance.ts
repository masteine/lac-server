export default class ApiErrorInstance extends Error {
  public status;
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiErrorInstance(404, message);
  }

  static internal(message) {
    return new ApiErrorInstance(500, message);
  }

  static forbidden(message) {
    return new ApiErrorInstance(403, message);
  }
}
