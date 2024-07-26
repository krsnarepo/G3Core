import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifyPackagesPageComponent } from './classify-packages-page/classify-packages-page.component';

const routes: Routes = [
  {path : '' , component: ClassifyPackagesPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassifyPackagesRoutingModule { }
