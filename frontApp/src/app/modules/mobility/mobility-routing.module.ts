import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobilityPageComponent } from './mobility-page/mobility-page.component';

const routes: Routes = [{ path : '' , component: MobilityPageComponent  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobilityRoutingModule { }
