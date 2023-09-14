import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOwner } from 'src/owner/interfaces/iowner';
import { OwnerService } from 'src/owner/services/owner-service.service';

import { IVehicle } from 'src/vehicle/interfaces/ivehicle';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';

@Component({
  selector: 'car-owners-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit, OnDestroy {

  addVehicleForm!: FormGroup;
  allOwners!: IOwner[];
  newVehicle!: IVehicle;
  getAllOwnersSubscription!: Subscription;
  addVehicleSubscription!: Subscription;

  constructor(private vehicleService: VehicleService, private ownerService: OwnerService, private router: Router) {}

  ngOnInit(): void {
    this.addVehicleForm = new FormGroup({
      owner_id: new FormControl(null, Validators.required),    // lista rozwijana z właścicielami
      vin_number: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      color: new FormControl(''),
      date_of_build: new FormControl(null)
    });

    this.getAllOwnersSubscription = this.ownerService.getAllOwners().subscribe(owners => {
      this.allOwners = owners;
    });
  }

  submitVehicleForm() {
    let formStatus = this.addVehicleForm.status;
    let valuesOfEnabledControls = this.addVehicleForm.value;
    let isFormValid = this.addVehicleForm.valid;

    if (isFormValid) {
      this.newVehicle = this.addVehicleForm.value;

      if (this.addVehicleForm.value.owner_id) {
        this.addVehicleSubscription = this.vehicleService.addVehicle(parseInt(this.addVehicleForm.value.owner_id), this.newVehicle).subscribe(response => {
          console.log(response);

          this.router.navigate(['/vehicle']);
        });
      }
    } else {
      console.log('Add vehicle form is invalid');
    }
  }

  ngOnDestroy(): void {
    this.getAllOwnersSubscription?.unsubscribe();
    this.addVehicleSubscription?.unsubscribe();
  }

}
