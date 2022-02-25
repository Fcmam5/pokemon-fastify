import { Species } from "models/Species";

export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: Species[];
};
