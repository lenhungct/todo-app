import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private shareService: ShareService) { }

  header(): HttpHeaders {
    return this.shareService.getBearerHeader();
  }

  get(url: string) {
    return this.http.get(url, { headers: this.header() });
  }

  post(url: string, params: any, headerCustom?: HttpHeaders) {
    const header =  (headerCustom) ? headerCustom : this.header();
    return this.http.post(url, params, { headers: header });
  }

  put(url: string, params: any) {
    return this.http.put(url, params, { headers: this.header() });
  }

  delete(url: string) {
    return this.http.delete(url, { headers: this.header() });
  }
}
