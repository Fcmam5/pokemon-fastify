import { Species } from "./Species";
import { Stat } from "./Stat";

export class PokemonWithStats {
  constructor(
    name: string,
    height: number,
    base_experience: number,
    averageBaseExperience: number,
    id: number,
    sprite_img: string,
    species: Species,
    url: string,
    stats: Array<Stat>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}
  // TODO revisit this
}
