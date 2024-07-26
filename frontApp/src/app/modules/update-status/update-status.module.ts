import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateStatusRoutingModule } from './update-status-routing.module';
import { UpdateStatusPageComponent } from './update-status-page/update-status-page.component';


@NgModule({
  declarations: [
    UpdateStatusPageComponent
  ],
  imports: [
    CommonModule,
    UpdateStatusRoutingModule,
    SharedModule
  ]
})
export class UpdateStatusModule { }
