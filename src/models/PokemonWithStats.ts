import { Species } from "./Species";
import { Stat } from "./Stat";

export class PokemonWithStats {
    constructor(name: String, height: number, base_experience: number, averageBaseExperience: number, id: number, sprite_img: string, species: Species, url: string, stats: Array<Stat>) { }
} 