import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateReceiptRoutingModule } from './generate-receipt-routing.module';
import { GenerateReceiptPageComponent } from './generate-receipt-page/generate-receipt-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

const routes: Routes = [
  { path: '', component: GenerateReceiptPageComponent }
];

@NgModule({
  declarations: [
    GenerateReceiptPageComponent
  ],
  imports: [
    CommonModule,
    GenerateReceiptRoutingModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule
  ]
})
export class GenerateReceiptModule { }
