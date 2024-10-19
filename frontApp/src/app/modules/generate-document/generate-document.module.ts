import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateDocumentRoutingModule } from './generate-document-routing.module';
import { GenerateDocumentPageComponent } from './generate-document-page/generate-document-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    GenerateDocumentPageComponent
  ],
  imports: [
    CommonModule,
    GenerateDocumentRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class GenerateDocumentModule { }
