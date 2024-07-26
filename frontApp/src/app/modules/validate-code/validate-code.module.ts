import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidateCodeRoutingModule } from './validate-code-routing.module';
import { ValidateCodePageComponent } from './validate-code-page/validate-code-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ValidateCodePageComponent
  ],
  imports: [
    CommonModule,
    ValidateCodeRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ValidateCodeModule { }
