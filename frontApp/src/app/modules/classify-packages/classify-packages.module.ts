import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifyPackagesRoutingModule } from './classify-packages-routing.module';
import { ClassifyPackagesPageComponent } from './classify-packages-page/classify-packages-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClassifyPackagesPageComponent
  ],
  imports: [
    CommonModule,
    ClassifyPackagesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ClassifyPackagesModule { }
