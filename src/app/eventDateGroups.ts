import { Events } from "./events";
import { Model } from "./models/model";

export class EventDateGroups extends Model {
    date: string;
    events: Array<Events>;
}