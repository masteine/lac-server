import ApiErrorInstance from "./ApiErrorInstance";

function ApiError(err, req, res, next) {
  if (err instanceof ApiErrorInstance) {
    res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: "Critical error" });
}

export default ApiError;
