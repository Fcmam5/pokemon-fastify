import { Species } from '../models/Species';
import { Stat } from '../models/Stat';

export type PokemonListResponse = {
  count: number;
  next: string;
  previous: string;
  results: Species[];
};

// TODO Use proper Schema based on API response model
export type PokemonResponse = {
  name: string;
  height: number;
  base_experience: number;
  id: number;
  sprites: {
    front_default: string;
  };
  species: Species;
  stats: Array<Stat>;
};
