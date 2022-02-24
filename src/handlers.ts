import { FastifyRequest, FastifyReply } from "fastify";
import { PokemonWithStats } from "models/PokemonWithStats";

export async function getPokemonByName(request: FastifyRequest, reply: FastifyReply) {
  var name: string = request.params['name']

  reply.headers['Accept'] = 'application/json'

  var urlApiPokeman = `https://pokeapi.co/api/v2/pokemon/`;

  var params = {}

  name == null
      ? name.trim() != ''
      ? (params["name"] = name, urlApiPokeman = urlApiPokeman + '/', urlApiPokeman = urlApiPokeman + name)
      : (urlApiPokeman = urlApiPokeman + '"?offset=20"', urlApiPokeman = urlApiPokeman + "&limit=20")
      : (urlApiPokeman = urlApiPokeman + '"?offset=20"', urlApiPokeman = urlApiPokeman + "&limit=20")

  const http = require('http');
  const keepAliveAgent = new http.Agent({ keepAlive: true });

  let response: any = ""

  http.request({ ...reply.headers, ...({ hostname: urlApiPokeman, port: 80, }) }, (result) => { response = result })

  if (response == null) {
    reply.code(404)
  }

  computeResponse(response, reply)

  reply.send(response)

  return reply
}

export const computeResponse = async (response: unknown, reply: FastifyReply) => {
  const resp = response as any

  let types = resp.types.map(type => type.type).map(type => { return type.url }).reduce((types, typeUrl) => types.push(typeUrl));

  let pokemonTypes = []

  types.forEach(element => {
    const http = require('http');
    const keepAliveAgent = new http.Agent({ keepAlive: true });

    http.request({ hostname: element }, (response) => pokemonTypes.push(response))

  });

  if (pokemonTypes == undefined)
    throw pokemonTypes

  response.stats.forEach(element => {
    var stats = []

    pokemonTypes.map(pok =>
        pok.stats.map(st =>
            st.stat.name.toUpperCase() == element.stat.name
                ? stats.push(st.base_state)
                : ([])
        )
    )

    if (stats) {
      let avg = stats.reduce((a, b) => a + b) / stats.length
      element.averageStat = avg
    } else {
      element.averageStat = 0
    }
  });

}