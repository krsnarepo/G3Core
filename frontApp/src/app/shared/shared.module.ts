import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ModalPaymentComponent } from './components/modal-payment/modal-payment.component';
import { CorrectPaymentComponent } from './components/correct-payment/correct-payment.component';
import { HeaderWorkerComponent } from './components/header-worker/header-worker.component';
import { CorrectGenerateComponent } from './components/correct-generate/correct-generate.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    ModalPaymentComponent,
    HeaderWorkerComponent,
    CorrectPaymentComponent,
    CorrectGenerateComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    ModalPaymentComponent,
    HeaderWorkerComponent,
    CorrectPaymentComponent,
    CorrectGenerateComponent
  ]

})

export class SharedModule { }
