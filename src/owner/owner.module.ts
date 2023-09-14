import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerComponent } from './components/owner/owner.component';
import { AddOwnerComponent } from './components/add-owner/add-owner.component';
import { FormsModule } from '@angular/forms';
import { DeleteOwnerComponent } from './components/delete-owner/delete-owner.component';
import { UpdateOwnerComponent } from './components/update-owner/update-owner.component';

@NgModule({
  declarations: [
    OwnerComponent,
    AddOwnerComponent,
    DeleteOwnerComponent,
    UpdateOwnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OwnerRoutingModule
  ]
})
export class OwnerModule { }
