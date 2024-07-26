import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShippingService } from '../services/shipping.service';
import { OrderStateServiceService } from '../../payment/services/order-state-service.service';

@Component({
  selector: 'app-shipping-form-page',
  templateUrl: './shipping-form-page.component.html',
  styleUrls: ['./shipping-form-page.component.css']
})
export class ShippingFormPageComponent {

  orderForm: FormGroup;

  constructor(private fb:FormBuilder, private router: Router, private shippingService: ShippingService, private orderStateService: OrderStateServiceService) { 
    this.orderForm = this.fb.group({
      nombre: ['Juan', Validators.required],
      apellido: ['Perez', Validators.required],
      telefono: ['123456789', Validators.required],
      prioridad: ['Inmediata', Validators.required],
      dni_emisor: ['12345678', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      dni_receptor: ['87654321', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      direccion: ['Calle Principal 123, Ciudad', Validators.required],
      paquetes: this.fb.array([]),
    });
    this.addPackage();
  }

  get packages() {
    return this.orderForm.get('paquetes') as FormArray;
  }

  addPackage() {
    const paquete = this.fb.group({
      tipo: ['Printed Matter', Validators.required],
      descripcion: ['desc', Validators.required],
      precio: ['10', Validators.required],
      largo: ['10', Validators.required],
      ancho: ['10', Validators.required],
      altura: ['2', Validators.required],
      peso: ['2', Validators.required],
    });
    this.packages.push(paquete);
  }

  removePackage(index: number) {
    this.packages.removeAt(index);
  }

  onSubmit() {
    console.log('Form before validation', this.orderForm.value);
    if (this.orderForm.valid) {
      console.log('Form send to service');
      
      this.shippingService.sendShippingData$(this.orderForm.value).subscribe({
        next: (response) => {
          //iconsole.log('Shipping data sent successfully: ', response);
          if (response && response.num_pedido && response.total_price && response.list_price) {
            this.orderStateService.setOrderData(response);
            this.orderStateService.setPackageData(this.orderForm.value.paquetes);
            console.log('Order data set in service:', this.orderStateService.getOrderData());
            this.router.navigate(['/payment']);
          } else {
            console.error('Respuesta del servidor incompleta:', response);
            alert('Hubo un error al procesar tu pedido. Por favor, intenta de nuevo.');
          }
        },
        error: (error) => {
          console.error('Error sending shipping data: ', error);
          alert('An error occurred while sending the data. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched(this.orderForm);
      alert('Please correct the errors in the form before submitting.');
    }
  }

  // Manejo de errores
  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  getErrorMessage(controlName: string, arrayName?: string, index?: number): string {
    let control;
    if (arrayName && typeof index !== 'undefined') {
      control = (this.orderForm.get(arrayName) as FormArray).at(index).get(controlName);
    } else {
      control = this.orderForm.get(controlName);
    }

    if (control && control.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido.';
      }
      if (control.errors['pattern']) {
        switch(controlName) {
          case 'telefono':
            return 'El teléfono debe tener 9 dígitos.';
          case 'dni_emisor':
          case 'dni_receptor':
            return 'El DNI debe tener 8 dígitos.';
          case 'dimensiones':
            return 'Las dimensiones deben tener el formato LxAxA (ej. 10x20x30).';
          default:
            return 'El formato ingresado no es válido.';
        }
      }
      if (control.errors['min']) {
        return `El valor mínimo es ${control.errors['min'].min}.`;
      }
    }
    return '';
  }

}
