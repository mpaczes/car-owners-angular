import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { IVehicle } from 'src/vehicle/interfaces/ivehicle';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';

@Component({
  selector: 'car-owners-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit, OnDestroy {

  vehicle!: IVehicle;
  vehicle_id!: string | null;
  vehicleUpdateSubscription!: Subscription;
  getVehicleSubscription!: Subscription;
  updateVehicleForm!: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, 
    private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.vehicle_id = params.get('vehicle_id');
      let vehicle_id_as_number = 0;
      if (this.vehicle_id) {
        vehicle_id_as_number = parseInt(this.vehicle_id);
        this.getVehicleSubscription = this.vehicleService.getVehicle(vehicle_id_as_number).subscribe(vehicle => {
          this.vehicle = vehicle;

          this.updateVehicleForm = new FormGroup({
            vehicle_id: new FormControl(this.vehicle.vehicle_id, Validators.required),  // hidden field
            owner_id: new FormControl(this.vehicle.owner_id, Validators.required),  // lista rozwijana
            vin_number: new FormControl(this.vehicle.vin_number, Validators.required),
            brand: new FormControl(this.vehicle.brand, Validators.required),
            model: new FormControl(this.vehicle.model, Validators.required),
            color: new FormControl(this.vehicle.color),
            date_of_build: new FormControl(this.vehicle.date_of_build)
          });
        });
      }
    });
  }

  submitUpdateVehicleForm() {
    let updatedVehicle: IVehicle = this.updateVehicleForm.value;
    if (updatedVehicle.vehicle_id) {
      this.vehicleUpdateSubscription = this.vehicleService.updateVehicle(updatedVehicle.vehicle_id, updatedVehicle).subscribe(response => {
        console.log(response);

        this.router.navigate(['/vehicle']);
      });
    }
  }

  ngOnDestroy(): void {
    this.vehicleUpdateSubscription?.unsubscribe();
    this.getVehicleSubscription?.unsubscribe();
  }

}
