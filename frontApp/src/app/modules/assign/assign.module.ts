import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignRoutingModule } from './assign-routing.module';
import { AssignPageComponent } from './assign-page/assign-page.component';


@NgModule({
  declarations: [
    AssignPageComponent
  ],
  imports: [
    CommonModule,
    AssignRoutingModule,
    SharedModule
  ]
})
export class AssignModule { }
