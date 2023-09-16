import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { IOwner } from '../interfaces/iowner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  /*
    (1) utworzyć plik 'proxy.conf.json' poza katalogiem 'src'
    (2) w pliku 'package.json' zmienić to : "start": "ng serve --proxy-config proxy.conf.json",
    (3) uruchomić projekt tak : 'npm start'
    (4) w adresie URL dla serwisu nie używać 'http://localhost:5000'
  */

  url_for_owner_api = '/bp_owner_api/owners';

  constructor(private httpClient : HttpClient) { }

  getAllOwners(): Observable<IOwner[]> {
    return this.httpClient.get<IOwner[]>(this.url_for_owner_api, { responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  getOwner(owner_id: number): Observable<IOwner> {
    return this.httpClient.get<IOwner>(this.url_for_owner_api + '/' + owner_id, { responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  addOwner(owner: IOwner): Observable<string> {
    return this.httpClient.post(this.url_for_owner_api, 
          owner, 
          { responseType: 'text' as const, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(catchError(this.handleError));
  }

  deleteOwner(owner_id: number): Observable<string> {
    return this.httpClient.delete(this.url_for_owner_api + '/' + owner_id, { responseType: 'text' as const })
      .pipe(catchError(this.handleError));
  }

  updateOwner(owner: IOwner): Observable<string> {
    return this.httpClient.put(this.url_for_owner_api + '/' + owner.owner_id, 
          owner, 
          { responseType: 'text' as const, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(catchError(this.handleError));
  }

  getOwnerVehicles(): Observable<IOwner[]> {
    return this.httpClient.get<IOwner[]>(this.url_for_owner_api + '/assigned_vehicles', { responseType: 'json' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occured. Handle it accordingly.
      console.error('An error occured : ', error.error);
    } else {
      // The backend returned an unseccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error('Backend returned code ${error.status}, body was : ', error.error);
    }

    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened. Please try again later.'))
  }
  
}
