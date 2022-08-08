import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "app.log" })],
});

export const responseHandler = (res, message, status, data) => {
  return res.status(status).send({
    message,
    data,
  });
};
