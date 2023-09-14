import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';

@Component({
  selector: 'car-owners-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css']
})
export class DeleteVehicleComponent implements OnInit, OnDestroy {

  vehicle_id!: string | null;
  vehicleIdSubscription!: Subscription;
  deleteVehicleSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleIdSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.vehicle_id = params.get('vehicle_id');
      let vehicle_id_as_number: number = 0;
      if (this.vehicle_id) {
        vehicle_id_as_number = parseInt(this.vehicle_id);
      }

      this.deleteVehicleSubscription = this.vehicleService.deleteVehicle(vehicle_id_as_number).subscribe(response => {
        console.log(response);

        this.router.navigate(['/vehicle']);
      });
    });
  }

  ngOnDestroy(): void {
    this.vehicleIdSubscription?.unsubscribe();
    this.deleteVehicleSubscription?.unsubscribe();
  }

}
