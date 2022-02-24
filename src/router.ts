import { FastifyInstance } from "fastify";
import { checkNameInParams } from "middlewares";
import { getPokemonByName } from "./handlers";

export default function router(fastify: FastifyInstance, opts, next) {
  fastify.get("/poke/:name", checkNameInParams(getPokemonByName));
  next();
}
