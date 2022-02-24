import { stat } from "fs"
import { StatD } from "./StatD";

export interface Stat {
    base_stat: number
    effort: String
    stat: StatD
    averageStat: number
}