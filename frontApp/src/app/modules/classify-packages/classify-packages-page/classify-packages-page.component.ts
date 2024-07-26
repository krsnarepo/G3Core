import { Component, OnInit } from '@angular/core';
import { ClassifyService } from '../services/classify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classify-packages-page',
  templateUrl: './classify-packages-page.component.html',
  styleUrls: ['./classify-packages-page.component.css']
})
export class ClassifyPackagesPageComponent implements OnInit{
  
  paquetes: any[] = [];
  selectedPackage: any = null;
  agencia: string = '';
  distancia: string = '';
  classifiedPackages: any[] = [];

  constructor(private classifyService: ClassifyService, private router: Router) { }

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.classifyService.getPackages$().subscribe(
      response => {
        this.paquetes = response;
        console.log("Paquetes: ", this.paquetes)
      },
      error => {
        console.error('Error al cargar los paquetes', error);
      }
    );
  }

  selectPackage(paquete: any) {
    this.selectedPackage = paquete;
  }

  classifyPackage() {
    if (this.selectedPackage) {
      const updateData = {
        agencia: this.agencia,
        distancia: this.distancia
      };

      this.classifyService.updatePackage$(this.selectedPackage.codigo, updateData).subscribe(
        response => {
          this.classifiedPackages.push({
            codigo: this.selectedPackage.codigo,
            descripcion: this.selectedPackage.descripcion,
            distancia: this.distancia,
            agencia: this.agencia,
            tipo: this.selectedPackage.tipo,
            precio: this.selectedPackage.precio,
            categoria: response.categoria // Suponiendo que el backend responde con una categoría
          });
          this.selectedPackage = null;
          this.agencia = '';
          this.distancia = '';
        },
        error => {
          console.error('Error al clasificar el paquete', error);
        }
      );
    }
  }

  exit() {
    // Redirige al home o realiza alguna acción para salir
    this.router.navigate(['/home']);
  }

  confirm() {
    // Redirige a la generación del documento de control
    this.router.navigate(['/generate-document']);
  }
}
