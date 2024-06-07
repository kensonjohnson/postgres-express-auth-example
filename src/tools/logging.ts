import { pinoHttp, type Options } from "pino-http";
import { pino, type Logger } from "pino";

let options: Options = {};

// Logging is way too verbose with the defaults,
// so trim it back when in development.
if (process.env.NODE_ENV === "development") {
  options = {
    transport: {
      target: "pino-pretty",
    },
    autoLogging: false,
    serializers: {
      req: (req) => {
        return `${req.method}: ${req.url}`;
      },
      res: (res) => `${res.statusCode}`,
      err: pino.stdSerializers.err,
    },
  };
}

export const httpLogger = pinoHttp(options);

export const pinoLogger = pino({
  transport: { target: "pino-pretty" },
}) as Logger;
