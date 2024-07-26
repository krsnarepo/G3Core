import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeepAvailabilityPageComponent } from './keep-availability-page/keep-availability-page.component';

const routes: Routes = [{ path : '' , component: KeepAvailabilityPageComponent  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeepAvailabilityRoutingModule { }
