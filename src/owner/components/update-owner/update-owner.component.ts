import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOwner } from 'src/owner/interfaces/iowner';
import { OwnerService } from 'src/owner/services/owner-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'car-owners-update-owner',
  templateUrl: './update-owner.component.html',
  styleUrls: ['./update-owner.component.css']
})
export class UpdateOwnerComponent implements OnInit, OnDestroy {

  owner_id: string | null = '';
  route_subscription!: Subscription;
  owner_service_subscription!: Subscription;
  owner_update_service_subscription!: Subscription;
  owner!: IOwner;

  constructor(private ownerService: OwnerService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route_subscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.owner_id = params.get('owner_id');

      let owner_id_as_number: number = 0;
      if (this.owner_id) {
        owner_id_as_number = parseInt(this.owner_id);
      }

      this.owner_service_subscription = this.ownerService.getOwner(owner_id_as_number).subscribe(owner => {
        this.owner = owner;
      });
    });
  }

  onSubmitForm(data: any) {
    let updated_owner: IOwner = {
      owner_id: data.ownerId,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      date_of_birth: data.dateOfBirth
    };

    this.owner_update_service_subscription = this.ownerService.updateOwner(updated_owner).subscribe(response => {
      console.log(response);

      this.router.navigate(['/owner']);
    });
  }

  ngOnDestroy(): void {
    this.route_subscription?.unsubscribe();
    this.owner_service_subscription?.unsubscribe();
    this.owner_update_service_subscription?.unsubscribe();
  }

}
