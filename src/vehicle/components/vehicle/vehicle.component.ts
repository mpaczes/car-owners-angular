import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IVehicle } from 'src/vehicle/interfaces/ivehicle';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';

@Component({
  selector: 'car-owners-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit, OnDestroy {

  vehicles: IVehicle[] = [];
  vehiclesSubscription: Subscription | undefined;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehiclesSubscription = this.vehicleService.getAllVehicles().subscribe(vehicles => {
      this.vehicles = vehicles;
    });
  }

  ngOnDestroy(): void {
    this.vehiclesSubscription?.unsubscribe();
  }

}
