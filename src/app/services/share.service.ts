import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { APIKEY } from '../types/const';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  getBasicHeader(auth: Iuser): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(`${auth.username}:${auth.password}`)
    });
  }

  getBearerHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + this.getAPIKey()
    });
  }

  storeAPIKey(apiKey: string) {
    localStorage.setItem(APIKEY, apiKey);
  }

  getAPIKey() {
    return localStorage.getItem(APIKEY);
  }

  removeAPIKey() {
    localStorage.removeItem(APIKEY);
  }
}
