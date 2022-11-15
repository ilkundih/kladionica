import { EventDateGroups } from './eventDateGroups';
import { Model } from './models/model';

export class Leagues extends Model{
    id: string;
    name: string;
    iconId: string;
    eventDateGroups: Array<EventDateGroups>;
    order: number;

    getNameAndId(){
        return `${this.id}${this.name}` 
    }
}
