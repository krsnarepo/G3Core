import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateStatusPageComponent } from './update-status-page/update-status-page.component';

const routes: Routes = [{ path : '' , component: UpdateStatusPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateStatusRoutingModule { }
