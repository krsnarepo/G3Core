import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceListService } from '../services/price-list.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-price-table-page',
  templateUrl: './price-table-page.component.html',
  styleUrls: ['./price-table-page.component.css']
})
export class PriceTablePageComponent {

  displayedColumns: string[] = ['codigo', 'tipo_paquete', 'peso', 'precio', 'distancia', 'agencia1', 'agencia2', 'agencia3', 'agencia4', 'select'];
  PrecioForm: FormGroup;
  Precios: any[] = [];
  selectedRowIndex: number | null = null;

  constructor(
    private priceListService: PriceListService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.PrecioForm = this.fb.group({
      Precios: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadPrecios();
  }

  loadPrecios(): void {
    this.priceListService.getPriceList().subscribe(data => {
      this.Precios = data;
      this.setPrecios(data);
    });
  }

  setPrecios(Precios: any[]): void {
    const PrecioFGs = Precios.map(Precio => this.fb.group(Precio));
    const PrecioFormArray = this.fb.array(PrecioFGs);
    this.PrecioForm.setControl('Precios', PrecioFormArray);
  }

  get PreciosFormArray(): FormArray {
    return this.PrecioForm.get('Precios') as FormArray;
  }

  addPrecio() {
    const precioForm = this.fb.group({
      codigo: ['', Validators.required],
      tipo_paquete: ['', Validators.required],
      peso: ['', Validators.required],
      precio: ['', Validators.required],
      distancia: ['', Validators.required],
      agencia1: ['', Validators.required],
      agencia2: ['', Validators.required],
      agencia3: ['', Validators.required],
      agencia4: ['', Validators.required]
    });
    this.PreciosFormArray.push(precioForm);
    this.Precios = this.PreciosFormArray.value;
    this.setPrecios(this.PreciosFormArray.value);
    this.cdr.detectChanges();
    console.log(this.PreciosFormArray.controls);
  }

  selectRow(index: number): void {
    this.selectedRowIndex = index;
  }

  createPrecio(): void {
    const Precio = this.PreciosFormArray.at(this.selectedRowIndex!).value;
    if (!Precio.codigo) {
      alert('No se puede crear un precio sin código');
      return;
    }
    this.priceListService.createPrice(Precio).subscribe({
      next: () => {
        this.loadPrecios();
      },
      error: (error) => {
        // Manejo del error del backend
        if (error.status === 400 && error.error.codigo[0] === 'tabla precios with this codigo already exists.') {          
          alert('El código del precio ya existe. Por favor, elige otro código.');
        } else {
          alert('Ocurrió un error al crear el precio. Inténtalo nuevamente.');
        }
      }
    });
  }

  updatePrecio(): void {
    const Precio = this.PreciosFormArray.at(this.selectedRowIndex!).value;
    if (Precio && Precio.codigo) {
      this.priceListService.updatePrice(Precio.codigo, Precio).subscribe(() => {
        this.loadPrecios();
      });
    } else {
      alert('No se puede actualizar un precio sin código');
    }
  }

  deletePrecio(): void {
    const PrecioCodigo = this.PreciosFormArray.at(this.selectedRowIndex!).value.codigo;
    if (PrecioCodigo) {
      this.priceListService.deletePrice(PrecioCodigo).subscribe(() => {
        this.loadPrecios();
      });
    } else {
      alert('No se puede eliminar un precio sin código');
    }
  }

}
