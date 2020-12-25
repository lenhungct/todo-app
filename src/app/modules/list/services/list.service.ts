import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  apiUrl = environment.apiUrl;
  constructor(private restService: RestService) { }

  getLists(): Observable<IListDetail[]> {
    return this.restService.get(this.apiUrl + '/lists')
      .pipe(
        map((d) => {
          if (d) {
            return d as IListDetail[];
          }
          throwError('Error');
        }
      ));
  }

  getById(listId: number): Observable<IListDetail> {
    return this.restService.get(this.apiUrl + '/lists' + listId)
      .pipe(
        map((d) => {
          if (d) {
            return d as IListDetail;
          }
          throwError('Error');
        }
      ));
  }

  create(params: IList): Observable<IListDetail> {
    return this.restService.post(this.apiUrl + '/lists', params)
      .pipe(
        map(d => {
          if (d) {
            return d as IListDetail;
          }
          throwError('Error');
        }
      ));
  }

  updateById(listId: number, params: IList): Observable<IListDetail> {
    return this.restService.put(this.apiUrl + '/lists/' + listId, params)
      .pipe(
        map(d => {
          if (d) {
            return d as IListDetail;
          }
          throwError('Error');
        }
      ));
  }

  delete(listId: number): Observable<boolean> {
    return this.restService.delete(this.apiUrl + '/lists/' + listId)
      .pipe(
        map(d => {
          if (d) {
            return true;
          }
          throwError('Error');
        }
      ));
  }
}
