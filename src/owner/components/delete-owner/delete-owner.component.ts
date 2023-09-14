import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OwnerService } from 'src/owner/services/owner-service.service';

@Component({
  selector: 'car-owners-delete-owner',
  templateUrl: './delete-owner.component.html',
  styleUrls: ['./delete-owner.component.css']
})
export class DeleteOwnerComponent implements OnInit, OnDestroy {

  delete_owner_subscription!: Subscription;
  get_owner_id_subscription!: Subscription;
  onwer_id: string | null = '';

  constructor(private route: ActivatedRoute, private router: Router, private ownerService: OwnerService) {}

  ngOnInit(): void {
    this.get_owner_id_subscription = this.route.paramMap.subscribe((params: ParamMap) => {
      this.onwer_id = params.get('owner_id');
      let owner_id_as_number: number = 0;
      if (this.onwer_id) {
        owner_id_as_number = parseInt(this.onwer_id);
      }

      this.delete_owner_subscription = this.ownerService.deleteOwner(owner_id_as_number).subscribe(response => {
        console.log(response);

        this.router.navigate(['/owner']);
      });
    });
  }

  ngOnDestroy(): void {
    this.get_owner_id_subscription?.unsubscribe();
    this.delete_owner_subscription?.unsubscribe();
  }

}
