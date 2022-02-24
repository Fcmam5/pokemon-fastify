import { getPokemonByName } from "./handlers";

export default function router(fastify, opts, next) {
  fastify.get("/poke/:name", getPokemonByName);
  next();
}
