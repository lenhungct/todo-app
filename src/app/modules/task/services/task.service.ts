import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = environment.apiUrl;

  constructor(private restService: RestService) { }

  getTasks(): Observable<ITaskDetail[]> {
    return this.restService.get(this.apiUrl + '/tasks')
      .pipe(
        map((d) => {
          if (d) {
            return d as ITaskDetail[];
          }
          throwError('Error');
        }
      ));
  }

  getByListId(listId: number): Observable<ITaskDetail[]> {
    return this.restService.get(this.apiUrl + '/lists/' + listId + '/tasks')
      .pipe(
        map((d) => {
          if (d) {
            return d as ITaskDetail[];
          }
          throwError('Error');
        }
      ));
  }

  create(listId: number, params: INewTask): Observable<ITaskDetail> {
    return this.restService.post(this.apiUrl + '/lists/' + listId + '/tasks', params)
      .pipe(
        map(d => {
          if (d) {
            return d as ITaskDetail;
          }
          throwError('Error');
        }
      ));
  }

  updateById(listId: number, taskId: number, params: INewTask): Observable<ITaskDetail> {
    return this.restService.put(this.apiUrl + '/lists/' + listId + '/tasks/' + taskId, params)
      .pipe(
        map(d => {
          if (d) {
            return d as ITaskDetail;
          }
          throwError('Error');
        }
      ));
  }

  delete(listId: number, taskId: number): Observable<boolean> {
    return this.restService.delete(this.apiUrl + '/lists/' + listId + '/tasks/' + taskId)
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
