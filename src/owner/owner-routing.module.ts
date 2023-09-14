import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnerComponent } from './components/owner/owner.component';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';
import { DeleteOwnerComponent } from './components/delete-owner/delete-owner.component';
import { UpdateOwnerComponent } from './components/update-owner/update-owner.component';

const routes: Routes = [
	{ path: '', component: OwnerComponent },
	{ path: 'add', component: AddOwnerComponent },
	{ path: 'delete/:owner_id', component: DeleteOwnerComponent },
	{ path: 'update/:owner_id', component: UpdateOwnerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
