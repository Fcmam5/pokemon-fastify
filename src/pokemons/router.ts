import { FastifyInstance } from 'fastify';
import {
  getPokemonByName,
  getAllPokemons,
  checkNameInParams
} from './controllers';

export default function router(fastify: FastifyInstance, opts, next) {
  fastify.get('/poke/:name', checkNameInParams(getPokemonByName));
  fastify.get('/poke', getAllPokemons);
  next();
}
