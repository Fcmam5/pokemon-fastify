import fastify, { FastifyServerOptions, FastifyLoggerInstance, FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import router from "./router";

const serverOptions: FastifyServerOptions<Server, FastifyLoggerInstance> = {
  // Logger only for production
  logger: !!(process.env.NODE_ENV !== "development")
};

const app: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify(serverOptions);

// Middleware: Router
app.register(router);

export default app;
