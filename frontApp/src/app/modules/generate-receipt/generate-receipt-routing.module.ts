import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateReceiptPageComponent } from './generate-receipt-page/generate-receipt-page.component';

const routes: Routes = [
  {
    path:"", component: GenerateReceiptPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateReceiptRoutingModule { }
