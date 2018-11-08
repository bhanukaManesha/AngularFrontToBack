import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings:Settings = {
    allowRegistation:false,
    disableBalanceOnAdd:true,
    disableBalanceOnEdit:true
  }
  constructor() { 
    if (localStorage.getItem('settings') != null ){
      this.settings = JSON.parse(localStorage.getItem('settings'));

    }
  }

  getSettings():Settings{
    return this.settings;
  }

  changeSettings(settings){
    localStorage.setItem('settings',JSON.stringify(settings))
  }
  
}


