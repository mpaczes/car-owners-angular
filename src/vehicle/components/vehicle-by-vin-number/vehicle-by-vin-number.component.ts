import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IVehicle } from 'src/vehicle/interfaces/ivehicle';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';

@Component({
  selector: 'car-owners-vehicle-by-vin-number',
  templateUrl: './vehicle-by-vin-number.component.html',
  styleUrls: ['./vehicle-by-vin-number.component.css']
})
export class VehicleByVinNumberComponent implements OnInit, OnDestroy {

  allVeviclesVinNumbers!: string[];
  allVinNumbersSubscription!: Subscription;
  submitFormSubscription!: Subscription;
  allVinNumbersForm!: FormGroup;
  vehicle!: IVehicle;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.allVinNumbersForm = new FormGroup({
      vinNumber: new FormControl(null, Validators.required)
    });

    this.allVinNumbersSubscription = this.vehicleService.getAllVehiclesVinNumbers().subscribe(response => {
      this.allVeviclesVinNumbers = response;
    });
  }

  ngOnDestroy(): void {
    this.allVinNumbersSubscription?.unsubscribe();
    this.submitFormSubscription?.unsubscribe();
  }

  submitAllVinNumbersForm() {
    this.submitFormSubscription = this.vehicleService.getVehicleByVinNumber(this.allVinNumbersForm.value.vinNumber).subscribe(response => {
      this.vehicle = response;
    });
  }

}
