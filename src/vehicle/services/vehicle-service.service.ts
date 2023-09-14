import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
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

}
