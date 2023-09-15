import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOwner } from 'src/owner/interfaces/iowner';
import { IVehicle } from 'src/vehicle/interfaces/ivehicle';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';

@Component({
  selector: 'car-owners-vehicles-by-owner',
  templateUrl: './vehicles-by-owner.component.html',
  styleUrls: ['./vehicles-by-owner.component.css']
})
export class VehiclesByOwnerComponent implements OnInit, OnDestroy {

  mapperOwnerToVehicles = new Map<IOwner, IVehicle[]>();
  ownerVehicles: IVehicle[] | undefined = [];
  ownerVehiclesSubscription!: Subscription;
  mapKeys: IterableIterator<IOwner> | undefined;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.ownerVehiclesSubscription = this.vehicleService.getOwnerVehicles().subscribe(ownerVehicles => {
      
      this.mapperOwnerToVehicles.clear();

      for (let owner of ownerVehicles) {
        this.mapperOwnerToVehicles.set(owner, []);
        let ownerVehicles = owner.vehicles;
        for (let vehicle of ownerVehicles) {
          if (this.mapperOwnerToVehicles.has(owner)) {
            this.mapperOwnerToVehicles.get(owner)?.push(vehicle);
          }
        }
      }

      this.setMapKeys();

    });
  }

  showOwnerVehicles(owner: IOwner | undefined) {
    if (owner) {
      if (this.mapperOwnerToVehicles.has(owner)) {
        this.ownerVehicles = this.mapperOwnerToVehicles.get(owner);

        this.setMapKeys();
      }
    }
  }

  isMapperOwnerToVehiclesEmpty(mapperOwnerToVehicles:  Map<IOwner, IVehicle[]>): boolean {
    return mapperOwnerToVehicles.size == 0;
  }

  isOwnerVehiclesEmpty(ownersVehicles: IVehicle[] | undefined): boolean {
    return ownersVehicles ? ownersVehicles.length == 0 : true;
  }

  // Do not bind to a method 'map.keys()' in the template. It will be called every time change detection runs.
  // 'object.keys()' returns a new object every time is is called and Angular recognizes this as an unexpected change, which leads to error 'Expression has changed after iw was chekced'.
  setMapKeys() {
    this.mapKeys = this.mapperOwnerToVehicles.keys();
  }

  ngOnDestroy(): void {
    this.ownerVehiclesSubscription?.unsubscribe();
  }

}
