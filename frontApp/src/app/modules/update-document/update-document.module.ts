import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateDocumentRoutingModule } from './update-document-routing.module';
import { UpdateDocumentPageComponent } from './update-document-page/update-document-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UpdateDocumentPageComponent
  ],
  imports: [
    CommonModule,
    UpdateDocumentRoutingModule,
    SharedModule
  ]
})
export class UpdateDocumentModule { }
