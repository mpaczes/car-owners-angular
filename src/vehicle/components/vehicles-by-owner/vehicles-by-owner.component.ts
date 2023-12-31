import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOwner } from 'src/owner/interfaces/iowner';
import { IVehicle } from 'src/vehicle/interfaces/ivehicle';
import { OwnerService } from 'src/owner/services/owner-service.service';

@Component({
  selector: 'car-owners-vehicles-by-owner',
  templateUrl: './vehicles-by-owner.component.html',
  styleUrls: ['./vehicles-by-owner.component.css']
})
export class VehiclesByOwnerComponent implements OnInit, OnDestroy {

  mapperOwnerToVehicles = new Map<IOwner, IVehicle[]>();
  ownerVehicles: IVehicle[] | undefined = [];
  ownerVehiclesSubscription!: Subscription;
  // mapKeys: IterableIterator<IOwner> | undefined;

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.ownerVehiclesSubscription = this.ownerService.getOwnerVehicles().subscribe(ownerVehicles => {
      
      this.mapperOwnerToVehicles.clear();

      for (let owner of ownerVehicles) {
        this.mapperOwnerToVehicles.set(owner, []);
        if (owner.vehicles) {
          let ownerVehicles = owner.vehicles;
          for (let vehicle of ownerVehicles) {
            if (this.mapperOwnerToVehicles.has(owner)) {
              this.mapperOwnerToVehicles.get(owner)?.push(vehicle);
            }
          }
        }
      }

      // this.setMapKeys();

    });
  }

  showOwnerVehicles(owner: IOwner | undefined) {
    if (owner) {
      if (this.mapperOwnerToVehicles.has(owner)) {
        this.ownerVehicles = this.mapperOwnerToVehicles.get(owner);

        // this.setMapKeys();
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
  // 'object.keys()' returns a new object every time is is called and Angular recognizes this as an unexpected change, which leads to error 'Expression has changed after iw was checked'.
  // setMapKeys() {
  //   this.mapKeys = this.mapperOwnerToVehicles.keys();
  // }

  // As described above error.
  getMapKeys() {
    return Array.from(this.mapperOwnerToVehicles.keys());
  }

  ngOnDestroy(): void {
    this.ownerVehiclesSubscription?.unsubscribe();
  }

}
