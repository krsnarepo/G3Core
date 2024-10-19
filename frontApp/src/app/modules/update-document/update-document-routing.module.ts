import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateDocumentPageComponent } from './update-document-page/update-document-page.component';

const routes: Routes = [{path : '' , component: UpdateDocumentPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateDocumentRoutingModule { }
