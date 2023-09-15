import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError, from, delay } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IVehicle } from '../interfaces/ivehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url_for_vehicle_api = '/bp_vehicle_api/vehicles';

  constructor(private httpClient: HttpClient) { }

  getAllVehicles(): Observable<IVehicle[]> {
    return this.httpClient.get<IVehicle[]>(this.url_for_vehicle_api, { responseType: 'json' });
  }

  getVehicle(vehicle_id: number): Observable<IVehicle> {
    return this.httpClient.get<IVehicle>(this.url_for_vehicle_api + '/' + vehicle_id, { responseType: 'json' });
  }

  getVehicleByVinNumber(vin_number: string): Observable<IVehicle> {
    return this.httpClient.get<IVehicle>(this.url_for_vehicle_api + '/vin_number/' + vin_number, { responseType: 'json' });
  }

  addVehicle(ownerId: number, vehicle: IVehicle): Observable<string> {
    return this.httpClient.post(this.url_for_vehicle_api + '/' + ownerId, 
      vehicle, 
      { responseType: 'text' as const, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  deleteVehicle(vehicle_id: number): Observable<string> {
    return this.httpClient.delete(this.url_for_vehicle_api + '/' + vehicle_id, { responseType: 'text' as const });
  }

  updateVehicle(vehicle_id: number, vehicle: IVehicle): Observable<string> {
    return this.httpClient.put(this.url_for_vehicle_api + '/' + vehicle_id,
      vehicle,
      { responseType: 'text' as const, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getAllVehiclesVinNumbers(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.url_for_vehicle_api + '/all_vin_numbers', { responseType: 'json' });
  }

  getOwnerVehicles(): Observable<any[]> {
    return of([
      {
        owner_id: 1,
        first_name: 'marcelina',
        last_name: 'zawadzka',
        email: 'marcelin.zawadzka@tlen.cz',
        date_of_birth: '1994-04-19 00:00:00.000000',
        vehicles: [
          {vehicle_id: 1, vin_number: 'JHMSZ542XDC028494', brand: 'Honda', model: 'Acord', color: 'blue', date_of_build: '2002-04-18 00:00:00.000000'},
          {vehicle_id: 2, vin_number: 'YV1672MK9D2304784', brand: 'Volvo', model: 'C30', color: 'white', date_of_build: '2004-02-15 00:00:00.000000'}
        ]
      },
      {
        owner_id: 2,
        first_name: 'magdalena',
        last_name: 'rozdzka',
        email: 'magdalena.rozdzka@tlen.cz',
        date_of_birth: '1995-03-19 00:00:00.000000',
        vehicles: [
          {vehicle_id: 3, vin_number: '4S3BJ6321N6900903', brand: 'Subaru', model: 'Legacy', color: 'red', date_of_build: '2010-09-09 00:00:00.000000'}
        ]
      }
    ])
    .pipe(delay(3000));
  }

}
