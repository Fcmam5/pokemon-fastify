import { FastifyRequest, FastifyReply } from "fastify";
import { httpGet } from "./infrastructure/http-client";
import { PokemonWithStats } from "models/PokemonWithStats";
import { getNotFoundResponse } from "./errors";

const APPLICATION_JSON_HEADER = "application/json";
const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

// TODO: get all pokemons ?offset=20&limit=20

export async function getPokemonByName(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const name: string = request.params["name"];
  const url = `${POKEMON_API_URL}/${name}`;

  let response = await httpGet(url);

  if (!response) {
    reply.code(404).send(
      getNotFoundResponse({
        detail: `The Pokemon with the name "${name}" is not found`,
        instance: `pokemon/${name}`,
      })
    );
  }

  // computeResponse(response, reply);

  reply.send(response);

  return reply;
}

export const computeResponse = async (response: any, reply: FastifyReply) => {
  const resp = response as any;

  let types = resp.types
    .map((type) => type.type)
    .map((type) => {
      return type.url;
    })
    .reduce((types, typeUrl) => types.push(typeUrl));

  let pokemonTypes = [];

  types.forEach((element) => {
    const http = require("http");
    const keepAliveAgent = new http.Agent({ keepAlive: true });

    http.request({ hostname: element }, (response) =>
      pokemonTypes.push(response)
    );
  });

  if (pokemonTypes == undefined) throw pokemonTypes;

  response.stats.forEach((element) => {
    var stats = [];

    pokemonTypes.map((pok) =>
      pok.stats.map((st) =>
        st.stat.name.toUpperCase() == element.stat.name
          ? stats.push(st.base_state)
          : []
      )
    );

    if (stats) {
      let avg = stats.reduce((a, b) => a + b) / stats.length;
      element.averageStat = avg;
    } else {
      element.averageStat = 0;
    }
  });
};
