import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateDocumentPageComponent } from './generate-document-page/generate-document-page.component';

const routes: Routes = [{
  path : '' , component: GenerateDocumentPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateDocumentRoutingModule { }
