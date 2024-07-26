import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateDocumentRoutingModule } from './generate-document-routing.module';
import { GenerateDocumentPageComponent } from './generate-document-page/generate-document-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GenerateDocumentPageComponent
  ],
  imports: [
    CommonModule,
    GenerateDocumentRoutingModule,
    SharedModule
  ]
})
export class GenerateDocumentModule { }
