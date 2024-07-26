import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateCodePageComponent } from './validate-code-page/validate-code-page.component';

const routes: Routes = [
 { path : "" , component : ValidateCodePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidateCodeRoutingModule { }
