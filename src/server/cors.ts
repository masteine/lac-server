import cors from "cors";

const allowedOrigins = ["*", "http://localhost:3000"];

const corsSetup: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true
};

export default corsSetup;
