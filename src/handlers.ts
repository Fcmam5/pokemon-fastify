import { FastifyRequest, FastifyReply } from "fastify";
import { httpGet } from "./infrastructure/http-client";
import { getNotFoundResponse } from "./errors";
import { PokemonListResponse } from "handlers.responses";
import { PokemonWithStats } from "./models/PokemonWithStats";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonByName(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const name: string = request.params["name"];
  const url = `${POKEMON_API_URL}/${name}`;

  const response = await httpGet(url);

  if (!response) {
    return reply.code(404).send(
      getNotFoundResponse({
        detail: `The Pokemon with the name "${name}" is not found`,
        instance: `pokemon/${name}`,
      })
    );
  }

  reply.send(computeResponseForOne(response, url));

  return reply;
}

export async function getAllPokemons(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // TODO: Implement pagination feature
  const response = await httpGet<PokemonListResponse>(
    `${POKEMON_API_URL}?offset=20&limit=20`
  );
  // computeResponse(response);

  reply.send(response);

  return reply;
}

// export const computeResponse = async (response: any) => {
//   const resp = response as any;

//   let types = resp.types
//     .map((type) => type.type)
//     .map((type) => {
//       return type.url;
//     })
//     .reduce((types, typeUrl) => types.push(typeUrl));

//   let pokemonTypes = [];

//   types.forEach((element) => {
//     const http = require("http");
//     const keepAliveAgent = new http.Agent({ keepAlive: true });

//     http.request({ hostname: element }, (response) =>
//       pokemonTypes.push(response)
//     );
//   });

//   if (pokemonTypes == undefined) throw pokemonTypes;

//   response.stats.forEach((element) => {
//     var stats = [];

//     pokemonTypes.map((pok) =>
//       pok.stats.map((st) =>
//         st.stat.name.toUpperCase() == element.stat.name
//           ? stats.push(st.base_state)
//           : []
//       )
//     );

//     if (stats) {
//       let avg = stats.reduce((a, b) => a + b) / stats.length;
//       element.averageStat = avg;
//     } else {
//       element.averageStat = 0;
//     }
//   });
// };

export const computeResponseForOne = (rs: any, url: string) => {
  // The expected results are unclear, so
  return new PokemonWithStats(
    rs.name,
    rs.height,
    rs.base_experience,
    rs.id,
    rs.sprites.front_default,
    rs.species,
    url,
    rs.stats
  );
};
