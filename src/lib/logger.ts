import winston from "winston";

// if it was run in production, show only warn and error messages.
const level = process.env.NODE_ENV !== "production" ? "debug" : "warn";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
  new winston.transports.File({ filename: "logs/info.log", level: "info" }),
  new winston.transports.File({ filename: "logs/http.log", level: "http" }),
  new winston.transports.File({ filename: "logs/debug.log", level: "debug" }),
  new winston.transports.File({ filename: "logs/combined.log" }),
];

const exceptionHandlers = [
  new winston.transports.File({ filename: "logs/exceptions.log" }),
];

export function buildLogger() {
  return winston.createLogger({
    level,
    levels,
    format,
    transports,
    exceptionHandlers,
  });
}
