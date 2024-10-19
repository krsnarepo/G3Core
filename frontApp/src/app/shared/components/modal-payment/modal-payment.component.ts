import { Component, OnInit } from '@angular/core';
import { SwitchService } from 'src/app/modules/confirmpay/services/switch.service';
import { SwitchPaymentService } from '../correct-payment/services/switch-payment.service';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.css']
})

export class ModalPaymentComponent implements OnInit{

  switchPayment: boolean = false;

  constructor(private switchService: SwitchService, private switchServiceConfirm: SwitchPaymentService){
  }

  ngOnInit(): void {
    this.switchServiceConfirm.$modal.subscribe((valor) => {
      this.switchPayment = valor;
      console.log("valor", valor);
    })
  }

  closeModal(): void {
    this.switchService.closeModal();
  }

  openModalConfirm(): void {
    this.switchServiceConfirm.openModalConfirm();
  }
}
