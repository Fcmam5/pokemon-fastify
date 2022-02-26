import { FastifyInstance } from "fastify";
import { checkNameInParams } from "./middlewares";
import { getPokemonByName, getAllPokemons } from "./handlers";

export default function router(fastify: FastifyInstance, opts, next) {
  fastify.get("/poke/:name", checkNameInParams(getPokemonByName));
  fastify.get("/poke", getAllPokemons);
  next();
}
