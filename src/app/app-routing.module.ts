import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../error_pages/page-not-found/page-not-found.component';

const routes: Routes = [
	{ path: 'owner', loadChildren: () => import('../owner/owner.module').then(m => m.OwnerModule) },
	{ path: 'vehicle', loadChildren: () => import('../vehicle/vehicle.module').then(m => m.VehicleModule) },
	{ path: '', redirectTo: '/owner', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
