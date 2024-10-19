import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { KeepAvailabilityRoutingModule } from './keep-availability-routing.module';
import { KeepAvailabilityPageComponent } from './keep-availability-page/keep-availability-page.component';


@NgModule({
  declarations: [
    KeepAvailabilityPageComponent
  ],
  imports: [
    CommonModule,
    KeepAvailabilityRoutingModule,
    SharedModule
  ]
})
export class KeepAvailabilityModule { }
