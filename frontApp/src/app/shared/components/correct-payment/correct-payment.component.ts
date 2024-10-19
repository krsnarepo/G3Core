import { Component } from '@angular/core';
import { SwitchPaymentService } from './services/switch-payment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-correct-payment',
  templateUrl: './correct-payment.component.html',
  styleUrls: ['./correct-payment.component.css']
})

export class CorrectPaymentComponent {

  constructor(private switchServiceConfirm: SwitchPaymentService, private router: Router){
  }

  ngOnInit(): void {

  }

  closeModalConfirm(): void {
    this.switchServiceConfirm.closeModalConfirm();
  }

  openGenerateReceipt(): void {
    this.router.navigate(['/generatereceipt'])
  }
}
