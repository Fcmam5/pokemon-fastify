import { StatD } from "./StatD";

export interface Stat {
  base_stat: number;
  effort: string;
  stat: StatD;
  averageStat: number;
}
