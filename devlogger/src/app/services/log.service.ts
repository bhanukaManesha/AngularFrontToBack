import { Injectable } from '@angular/core';
import { Log } from '../models/Log';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs : Log[];

  private logSource = new BehaviorSubject<Log>({id:null,text:null,date:null})
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true)
  stateClear = this.stateSource.asObservable()

  constructor() {
  //   this.logs = [
  //     {id:'1', text:'Generated Components' , date: new Date("12/26/2017 12:54:24")},
  //     {id:'2', text:'Added Bootstrap' , date: new Date("12/27/2017 9:34:24")},
  //     {id:'3', text:'Add logs Component' , date: new Date("12/31/2017 12:17:24")}
  // ]

    this.logs = []
   }

  getLogs():Observable<Log[]>{
    if(localStorage.getItem('logs') === null){
      this.logs = []
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs'))
    }

    return of(this.logs.sort((a,b)=>{
      return b.date = a.date;
    }))
  }

  setFormLog(log:Log){
    this.logSource.next(log);
  }

  addLog(log:Log){
    this.logs.unshift(log);

    //Adding to local storage
    localStorage.setItem('logs',JSON.stringify(this.logs))


  }

  updateLog(log:Log){
    this.logs.forEach((curr,index) => {
      if (log.id == curr.id) { 
        this.logs.splice(index,1);
      }
    });
    this.logs.unshift(log)
    
    //Update local storage
    localStorage.setItem('logs',JSON.stringify(this.logs))
  }

  deleteLog(log:Log){
    this.logs.forEach((curr,index) => {
      if (log.id == curr.id) { 
        this.logs.splice(index,1);
      }
    });

    //Delete local storage
    localStorage.setItem('logs',JSON.stringify(this.logs))
  }

  clearState(){
    this.stateSource.next(true);
  }

}
