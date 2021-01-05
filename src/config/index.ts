import bunyan from "bunyan";

export const port = process.env.PORT || 8080;

export const configuration = {
  API_PREFIX: "/api",
  VERSION: "/v1",
};

export const logger = bunyan.createLogger({
  name: "hermes",
  level: "info",
  stream: process.stdout,
});

export const errors = {
  MONGODB_CONNECT_ERROR: {
    code: 500,
    message: "Could not connect to MongoDB",
  },
};
