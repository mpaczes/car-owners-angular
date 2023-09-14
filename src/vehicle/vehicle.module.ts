import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { DeleteVehicleComponent } from './components/delete-vehicle/delete-vehicle.component';
import { UpdateVehicleComponent } from './components/update-vehicle/update-vehicle.component';
import { VehicleByVinNumberComponent } from './components/vehicle-by-vin-number/vehicle-by-vin-number.component';


@NgModule({
  declarations: [
    VehicleComponent,
    AddVehicleComponent,
    DeleteVehicleComponent,
    UpdateVehicleComponent,
    VehicleByVinNumberComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    ReactiveFormsModule
  ]
})
export class VehicleModule { }
