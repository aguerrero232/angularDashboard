import { DATA } from './mock-data';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import {Data} from './data';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private messageService: MessageService) { }

  getDataArray(): Data[] {
    // TODO: send the message _after_ fetching the data
    return DATA;
  }
  
  // needs a new name
  getSpecificData(date: Date): Observable<Data> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`DataService: fetched data date=${date}`);
    return of(DATA.find(data => data.date === date));
  }

  addToData(d: Data){
    DATA.push(d);
    DATA.sort(function(a, b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return  b.date.getDate() -  a.date.getDate();
    });
  }

}
