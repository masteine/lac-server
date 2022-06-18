class ResponseScheme {
  response(message: string, data: any) {
    return {
      message,
      data
    };
  }
}

export default new ResponseScheme();
