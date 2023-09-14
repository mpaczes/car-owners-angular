import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOwner } from 'src/owner/interfaces/iowner';
import { OwnerService } from 'src/owner/services/owner-service.service';

@Component({
  selector: 'car-owners-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit, OnDestroy {

  onwers_subscription: Subscription | undefined;
  owners: IOwner[] = [];

  constructor(private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.onwers_subscription = this.ownerService.getAllOwners().subscribe(owners => {
      this.owners = owners;
    });
  }

  ngOnDestroy(): void {
    this.onwers_subscription?.unsubscribe();
  }

}
