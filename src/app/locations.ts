import { Leagues } from "./leagues";
import { Model } from "./models/model";



export class Locations extends Model{
    id: string;
    name: string;
    leagues: Array<Leagues>;
    order: number;

}