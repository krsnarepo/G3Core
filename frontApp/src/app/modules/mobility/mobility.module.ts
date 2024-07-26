import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MobilityRoutingModule } from './mobility-routing.module';
import { MobilityPageComponent } from './mobility-page/mobility-page.component';


@NgModule({
  declarations: [
    MobilityPageComponent
  ],
  imports: [
    CommonModule,
    MobilityRoutingModule,
    SharedModule
  ]
})
export class MobilityModule { }
