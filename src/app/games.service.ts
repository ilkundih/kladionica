import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Locations } from './locations';
import { Leagues } from './leagues';
import { EventDateGroups } from './eventDateGroups';
import { Events } from './events';





@Injectable({
  providedIn: 'root'
})
export class GamesService {



  constructor(private http: HttpClient) { }

  private url = 'https://sportdataprovider.stage-volcano.com/api/public/prematch/SportEvents?SportId=1&LocationId=243&timezone=-120&clientType=MobileWebConsumer&lang=en';

  getLocations(): Observable<Locations[]> {
    return this.http.get<Locations[]>(this.url).pipe(map((response: any) => {
      return response.locations.map(location => {
        const locations = new Locations().loadModel(location);
        locations.leagues = locations.leagues.map(league => {
          const leagues = new Leagues().loadModel(league);
          leagues.eventDateGroups = leagues.eventDateGroups.map(eventDateGroup =>{
            const group = new EventDateGroups().loadModel(eventDateGroup);
            group.events = group.events.map(event =>{
              return new Events().loadModel(event);
            })
            return group;
          });
          return leagues;
        })
        return locations;
      })
    }))
  }



}
