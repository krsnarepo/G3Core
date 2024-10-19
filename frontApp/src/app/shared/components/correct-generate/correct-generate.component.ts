import { Component } from '@angular/core';
import { ServiceConfirmationService } from 'src/app/modules/order-list/services/service-confirmation.service';

@Component({
  selector: 'app-correct-generate',
  templateUrl: './correct-generate.component.html',
  styleUrls: ['./correct-generate.component.css']
})
export class CorrectGenerateComponent {

  constructor(private serviceConfirmation: ServiceConfirmationService){

  }

  closeModal(): void {
    this.serviceConfirmation.closeModal();
  }

}
