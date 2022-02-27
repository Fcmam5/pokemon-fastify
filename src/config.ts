// I think that Fastify community should extend Fastify instances to better use their env plugin with TS: https://github.com/fastify/fastify-env#typescript
// For now, we'll just hardcode the values here, and import them in our files

// TODO: Use a plugin to inject these ENV variables
export const CONFIG: IConfig = {
  PORT: Number(process.env.PORT) || 3000,
  POKEMON_API_URL: 'https://pokeapi.co/api/v2/pokemon',
  REQUEST_ID_HEADER: 'X-TRACE-ID'
};

interface IConfig {
  PORT: number;
  POKEMON_API_URL: string;
  REQUEST_ID_HEADER: string;
}
