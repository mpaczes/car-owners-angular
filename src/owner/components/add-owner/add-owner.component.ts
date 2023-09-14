import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOwner } from 'src/owner/interfaces/iowner';
import { OwnerService } from 'src/owner/services/owner-service.service';

@Component({
  selector: 'car-owners-add-owner',
  templateUrl: './add-owner.component.html',
  styleUrls: ['./add-owner.component.css']
})
export class AddOwnerComponent implements OnDestroy {

  addOwnerSubscription!: Subscription;

  constructor(private ownerService: OwnerService, private router: Router) {}

  onSubmit(data: any) {
    let firstName: string = data.firstName;
    let lastName: string = data.lastName;
    let email: string = data.email;
    let dateOfBirth: Date = data.dateOfBirth;

    let owner: IOwner = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      date_of_birth: dateOfBirth
    };

    this.addOwnerSubscription = this.ownerService.addOwner(owner).subscribe(response => {
      console.log(response);

      this.router.navigate(['/owner']);
    });
  }

  ngOnDestroy(): void {
    this.addOwnerSubscription?.unsubscribe();
  }

}
