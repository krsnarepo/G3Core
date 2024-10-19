import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceTableRoutingModule } from './price-table-routing.module';
import { PriceTablePageComponent } from './price-table-page/price-table-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    PriceTablePageComponent
  ],
  imports: [
    CommonModule,
    PriceTableRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule
  ]
})
export class PriceTableModule { }
