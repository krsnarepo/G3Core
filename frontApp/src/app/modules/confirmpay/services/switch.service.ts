import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SwitchService {

  constructor() { }

  $modal = new EventEmitter<any>();

  openModal(){
    this.$modal.emit(true);
  }

  closeModal(){
    this.$modal.emit(false)
  }
}
