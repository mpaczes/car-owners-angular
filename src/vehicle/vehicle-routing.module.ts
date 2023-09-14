import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleComponent } from './components/vehicle/vehicle.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { DeleteVehicleComponent } from './components/delete-vehicle/delete-vehicle.component';
import { UpdateVehicleComponent } from './components/update-vehicle/update-vehicle.component';
import { VehicleByVinNumberComponent } from './components/vehicle-by-vin-number/vehicle-by-vin-number.component';

const routes: Routes = [
	{ path: '', component: VehicleComponent },
	{ path: 'add', component: AddVehicleComponent },
  { path: 'delete/:vehicle_id', component: DeleteVehicleComponent },
  { path: 'update/:vehicle_id', component: UpdateVehicleComponent },
  { path: 'show_by_vin_number', component: VehicleByVinNumberComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
