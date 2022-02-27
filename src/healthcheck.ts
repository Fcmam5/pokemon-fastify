import { FastifyInstance, FastifyReply } from 'fastify';

export default function router(fastify: FastifyInstance, opts, next) {
  fastify.get('/health', opts, (_, reply: FastifyReply) => {
    reply.send({
      status: 'ok',
      statusCode: 200
    });
  });
  next();
}
