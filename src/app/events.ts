import { Fixture } from "./fixture";
import { Markets } from "./markets";
import { Model } from "./models/model";


export class Events extends Model {
    isLive: boolean;
    sportId: string;
    id:  string;
    linkedId: string;
    fixture: Fixture;
    markets: Array<Markets>;
    topLeagues: any;
    marketsTotal: number;
    isHighlighted: boolean;
    willBeLive: boolean;
    pickstotal: number;

}