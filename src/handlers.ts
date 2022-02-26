import { FastifyRequest, FastifyReply } from "fastify";
import { httpGetWithCache } from "./infrastructure";
import { getNotFoundResponse } from "./errors";
import { PokemonListResponse, PokemonResponse } from "handlers.responses";
import { PokemonWithStats } from "./models/PokemonWithStats";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonByName(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const name: string = request.params["name"];
  const url = `${POKEMON_API_URL}/${name}`;

  const response = await httpGetWithCache<PokemonResponse>(url);

  if (!response) {
    const msg = `The Pokemon with the name "${name}" is not found`;
    request.log.warn(msg);
    return reply.code(404).send(
      getNotFoundResponse({
        detail: msg,
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
    `${POKEMON_API_URL}?offset=20&limit=20`
  );
  const computed = await computeResponseForSet(response, request);

  reply.send(computed);

  return reply;
}

// Requirements are unclear for the method that was implemented here;
// It is really confusing to guess what's expected as it was using wrong object keys; and doing weird calculations
export const computeResponseForSet = async (
  rs: PokemonListResponse,
  req?: FastifyRequest
) => {
  const urls = rs.results.map((rs) => rs.url);
  const promises = urls.map((url) => httpGetWithCache<PokemonResponse>(url));

  req.log.debug(`Fetching ${urls.length}`);

  // Only supported in Node >=12.9.0: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  const responses = await Promise.allSettled(promises);

  const rss = [];

  responses.forEach((rs) => {
    if (rs.status === "rejected") {
      req.log.warn("Failed to load pokemon", rs.reason);
      return;
    }
    rss.push(computeResponseForOne(rs.value));
  });

  req.log.debug(
    `Going to return  ${rss.length} Pokemons (${
      urls.length - rss.length
    } missing)`
  );

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
