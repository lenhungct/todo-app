import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private shareService: ShareService) { }

  get(url: string) {
    const header = this.shareService.getBearerHeader();
    return this.http.get(url, { headers: header });
  }

  post(url: string, params: any, headerCustom?: HttpHeaders) {
    let header = this.shareService.getBearerHeader();
    if (headerCustom) {
      header = headerCustom;
    }
    return this.http.post(url, params, { headers: header });
  }

  put(url: string, params: any) {
    const header = this.shareService.getBearerHeader();
    return this.http.put(url, params, { headers: header });
  }

  delete(url: string) {
    const header = this.shareService.getBearerHeader();
    return this.http.delete(url, { headers: header });
  }
}
