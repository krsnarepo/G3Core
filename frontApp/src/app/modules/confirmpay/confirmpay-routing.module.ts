import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmpayPageComponent } from './confirmpay-page/confirmpay-page.component';

const routes: Routes = [ { path: '', component: ConfirmpayPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConfirmpayRoutingModule { }
