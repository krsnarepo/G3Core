import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmpayRoutingModule } from './confirmpay-routing.module';
import { ConfirmpayPageComponent } from './confirmpay-page/confirmpay-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ { path: '', component: ConfirmpayPageComponent }];

@NgModule({
  declarations: [
    ConfirmpayPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConfirmpayRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class ConfirmpayModule { }
