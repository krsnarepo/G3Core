import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../services/validate.service';

@Component({
  selector: 'app-validate-code-page',
  templateUrl: './validate-code-page.component.html',
  styleUrls: ['./validate-code-page.component.css']
})
export class ValidateCodePageComponent {
  codeToValidate: string = ''; // El valor del código del paquete
  validationResult: any;

  constructor(private validateService: ValidateService) { }

  validateCode() {
    if (!this.codeToValidate) {
      console.error('El código del paquete es requerido');
      return;
    }
    
    this.validateService.validateCode$(this.codeToValidate).subscribe(
      response => {
        if (response.mensaje === 'Validación exitosa') {
          this.validationResult = response.formulario;
          console.log('Código validado con éxito', this.validationResult);
          // Puedes redirigir a otra página o mostrar el formulario aquí
        } else {
          console.error('Código inválido');
        }
      },
      error => {
        console.error('Error al validar el código', error);
      }
    );
  }
}
