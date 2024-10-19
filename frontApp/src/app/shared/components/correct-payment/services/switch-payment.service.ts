import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchPaymentService {

  constructor() { }

  $modal = new EventEmitter<any>();

  openModalConfirm(){
    this.$modal.emit(true);
  }

  closeModalConfirm(){
    this.$modal.emit(false)
  }

}
