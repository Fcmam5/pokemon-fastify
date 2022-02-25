import { Species } from "./Species";
import { Stat } from "./Stat";

export class PokemonWithStats {
  public averageStat: number;

  constructor(
    public name: string,
    public height: number,
    public base_experience: number,
    // public averageBaseExperience: number,
    public id: number,
    public sprite_img: string,
    public species: Species,
    public url: string,
    public stats: Array<Stat>
  ) {
    this.calculateAverageStat();
  }

  private calculateAverageStat() {
    const count = this.stats.length;
    this.averageStat =
      this.stats.reduce((acc, st) => st.base_stat + st.base_stat, 0) / count;
  }
}
