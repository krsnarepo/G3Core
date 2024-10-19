import { Component, OnInit } from '@angular/core';
import { ServiceConfirmationService } from '../services/service-confirmation.service';
import { CorrectGenerateComponent } from 'src/app/shared/components/correct-generate/correct-generate.component';

@Component({
  selector: 'app-order-list-page',
  templateUrl: './order-list-page.component.html',
  styleUrls: ['./order-list-page.component.css']
})
export class OrderListPageComponent implements OnInit{

  generate: boolean = false;

  constructor(private serviceConfirmation: ServiceConfirmationService){
  }

  ngOnInit(): void {
    this.serviceConfirmation.$modal.subscribe((valor) => {
      this.generate = valor;
      console.log('valor -> ', valor)
    })
  }

  openModal(): void{
    this.serviceConfirmation.openModal();
  }
}
