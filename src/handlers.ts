import { FastifyRequest, FastifyReply } from "fastify";
import { httpGetWithCache } from "./infrastructure";
import { getNotFoundResponse } from "./errors";
import { PokemonListResponse, PokemonResponse } from "handlers.responses";
import { PokemonWithStats } from "./models/PokemonWithStats";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

// TODO: Use caching
export async function getPokemonByName(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const name: string = request.params["name"];
  const url = `${POKEMON_API_URL}/${name}`;

  const response = await httpGetWithCache<PokemonResponse>(url);

  if (!response) {
    return reply.code(404).send(
      getNotFoundResponse({
        detail: `The Pokemon with the name "${name}" is not found`,
        instance: `pokemon/${name}`,
      })
    );
  }

  reply.send(computeResponseForOne(response));

  return reply;
}

export async function getAllPokemons(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // TODO: Implement pagination feature
  const response = await httpGetWithCache<PokemonListResponse>(
    `${POKEMON_API_URL}?offset=20&limit=50`
  );
  const computed = await computeResponseForSet(response);

  reply.send(computed);

  return reply;
}

// Requirements are unclear for the method that was implemented here;
// It is really confusing to guess what's expected as it was using wrong object keys; and doing weird calculations
export const computeResponseForSet = async (rs: PokemonListResponse) => {
  const urls = rs.results.map((rs) => rs.url);
  const promises = urls.map((url) => httpGetWithCache<PokemonResponse>(url));

  // Only supported in Node >=12.9.0: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  const responses = await Promise.allSettled(promises);

  const rss = [];

  responses.forEach((rs) => {
    if (rs.status === "rejected") {
      // TODO: log warning
      return;
    }
    rss.push(computeResponseForOne(rs.value));
  });
  return rss;
};

export const computeResponseForOne = (rs: PokemonResponse) => {
  // The expected results are unclear, so not doing anything in this method
  return new PokemonWithStats(
    rs.name,
    rs.height,
    rs.base_experience,
    rs.id,
    rs.sprites.front_default,
    rs.species,
    `${POKEMON_API_URL}/${rs.id}`,
    rs.stats
  );
};
