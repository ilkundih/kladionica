import { Component, ElementRef, OnInit, ViewChild, NgModule } from '@angular/core';
import { EventDateGroups } from '../eventDateGroups';
import { Events } from '../events';
import { GamesService } from '../games.service';
import { Locations } from '../locations';
import { Markets } from '../markets';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  title= "Ticket Calculator";
  searchLeague: any;
  searchTeam: any;
  locations: Locations[] = [];
  ticketList: Array<Ticket> = [];
  @ViewChild('betAmount', {static: false}) betAmount: any;
  isShowTicket = false;
  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getLocations().subscribe(locations => this.locations = locations);
  }


  getPicksByGroup(eventDateGroup: EventDateGroups) {
    const allPicks = eventDateGroup.events.map((event: Events) => {
      const basicMarket = event.markets.find((market: Markets) => {
        return market.marketId === '1';
      });
      const sortedPicks = basicMarket.picks.sort((prev, current) => prev.order > current.order ? 1 : -1)

      return sortedPicks.map(pick => {
        return pick.name;
      })

    })


    const uniquePicks: string[] = [];
    allPicks.forEach(value => {
      if (!value.length) {
        return;
      }
      value?.forEach(val => {
        if (!uniquePicks.includes(val)) {
          uniquePicks.push(val);
        }
      })
    });
    return uniquePicks;
  }


  handleTicketClick(event: Events, selectedOdd: number, pickName : string): void {
    const newTicket = new Ticket();
    newTicket.participants = event.fixture.participants;
    newTicket.odd = selectedOdd;
    newTicket.pick = pickName;
    newTicket.eventId = event.id;
    
    const existingTicket = this.ticketList.find((ticket : Ticket) => ticket.eventId === newTicket.eventId);
    if(!existingTicket){
      this.ticketList.push(newTicket);
      return;
    }

    if(existingTicket.pick !== newTicket.pick){
      existingTicket.pick =  newTicket.pick;
      return;
    }

    this.ticketList = this.ticketList.filter((ticket : Ticket)=> ticket.eventId !== newTicket.eventId);

    console.log(this.ticketList.length);
  }

  deletePick(addedItem: Ticket){
    var i = this.ticketList.indexOf(addedItem);

    this.ticketList.splice(i, 1);
  }

  getSortedPicks(event: { markets: any; }){
    return this.getMarketById(event.markets,'1').picks.sort((prev: { order: number; }, current: { order: number; }) => prev.order > current.order ? 1 : -1);
  }


  getMarketById(markets: any, id: string) {
    return markets.find((market: { marketId: string; }) => { return market.marketId === id })
  }


  getTotalOdds(): any{
    if(!this.ticketList.length){
      return 0;
    }
    return this.ticketList.reduce(((accumulator,Ticket) => accumulator+Ticket.odd),0).toFixed(2);
  }


  getTotalProfit():any{
    if(!this.ticketList.length){
      return 0;
    }
    return this.getTotalOdds()*this.betAmount.nativeElement.value;
  }
  
  collapseTicket(){
    this.isShowTicket = !this.isShowTicket;
  }
  

}
