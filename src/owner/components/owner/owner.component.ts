import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private ownerService: OwnerService, private router: Router) {}

  ngOnInit(): void {
    this.onwers_subscription = this.ownerService.getAllOwners().subscribe(owners => {
      this.owners = owners;
    });
  }

  ngOnDestroy(): void {
    this.onwers_subscription?.unsubscribe();
  }

  getConfirmMessage(confirmMessage: {message: string, owner_id?: number}) {
    if (confirmMessage.message === 'DELETE') {
      if (confirmMessage.owner_id) {
        console.log('OwnerComponent - ', confirmMessage.message, confirmMessage.owner_id);

        this.ownerService.deleteOwner(confirmMessage.owner_id).subscribe(answer => {
          // Angular (SPA) refreshing page
          this.router.navigate(['/vehicle']).then(answer => {
            this.router.navigate(['/owner']);
          });
        });
      }
    } else if (confirmMessage.message === 'CLOSE') {
      if (confirmMessage.owner_id) {
        console.log('OwnerComponent - ', confirmMessage.message, confirmMessage.owner_id);
      }
    }
  }

}
