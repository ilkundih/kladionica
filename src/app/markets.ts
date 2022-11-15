import { Picks } from "./picks";

export class Markets {
    marketId: string;
    bl: number;
    name: string;
    picks: Array<Picks>;
    order: number;
    isValid: boolean;
}