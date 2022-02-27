import { v4 as uuidV4 } from 'uuid';
import fastify, {
  FastifyServerOptions,
  FastifyLoggerInstance,
  FastifyInstance
} from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { CONFIG } from './config';
import router from './pokemons/router';

const serverOptions: FastifyServerOptions<Server, FastifyLoggerInstance> = {
  logger: {
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
  },
  genReqId: () => uuidV4(),
  requestIdHeader: CONFIG.REQUEST_ID_HEADER,
  disableRequestLogging: true // It's the proxy's responsibility
};

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify(serverOptions);

// Middleware
app.register(router);

export default app;
