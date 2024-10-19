import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../services/switch.service';
import { ModalPaymentComponent } from 'src/app/shared/components/modal-payment/modal-payment.component';

@Component({
  selector: 'app-confirmpay-page',
  templateUrl: './confirmpay-page.component.html',
  styleUrls: ['./confirmpay-page.component.css']
})

export class ConfirmpayPageComponent implements OnInit{

  modalSwitch: boolean = false;

  constructor(private switchService: SwitchService){
  }

  ngOnInit(): void {
    this.switchService.$modal.subscribe((valor) => {
      this.modalSwitch = valor;
      console.log("valor", valor);
    })
  }

  openModal(): void {
    this.switchService.openModal()
  }
}
