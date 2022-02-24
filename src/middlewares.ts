/**
 * DISCLAIMER: I'm not familiar with Fastify there must be a better/native way for implementing middleware;
 *             I'm just going for this naïve approach for the sake of this exercise
 */

import { getBadRequestResponse } from "./errors";
import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { BAD_REQUEST } from "http-status";

export const checkNameInParams = (fn) => (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const nameInParams = ((request.params["name"] as string) || "").trim();

  if (!nameInParams.length) {
    return reply.code(BAD_REQUEST).send(getBadRequestResponse());
  }

  return fn(request, reply);
};
