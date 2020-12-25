import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { RestService } from '../services/rest.service';
import { ShareService } from '../services/share.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  constructor(private restService: RestService, private shareService: ShareService) { }

  login(auth: IUser): Observable<any> {
    const  headers = this.shareService.getBasicHeader(auth);
    return this.restService.post(this.apiUrl + '/auth/login', null, headers)
      .pipe(
        map((d: IApiKey) => {
          this.shareService.storeAPIKey(d.apiKey);
          return d;
        }, throwError('Could not be authenticated')
    ));
  }

  logout(): Observable<boolean> {
    return this.restService.post(this.apiUrl + '/auth/logout', null)
      .pipe(
        map(d => {
          this.shareService.removeAPIKey();
          return true;
        }, throwError('Could not be authenticated')
    ));
  }

  loggedIn(): boolean {
    return (this.shareService.getAPIKey() !== null);
  }
}
