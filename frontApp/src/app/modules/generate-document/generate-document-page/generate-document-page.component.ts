import { Component } from '@angular/core';
import { GenerateDocumentService } from '../services/generate-document.service';

@Component({
  selector: 'app-generate-document-page',
  templateUrl: './generate-document-page.component.html',
  styleUrls: ['./generate-document-page.component.css']
})
export class GenerateDocumentPageComponent {

  document: any = {};
  order: any[] = [];

  constructor(private generateDocService: GenerateDocumentService) { }

  loadDocument() {
    const observer = {
      next: (response: any) => {
        this.document = response;
        this.order = response.pedidos?.map((pedido: any) => {
          return {
            num_pedido: pedido.num_pedido,
            num_paquetes: pedido.paquetes.length,
            descripcion: pedido.paquetes?.map((paquete: any) => paquete.descripcion).join(', ')
          };
        });
        // console.log("Document: ", this.document);
      },
      error: (error: any) => {
        console.error('Error al cargar el documento', error);
      }
    };
    this.generateDocService.generateDocument$("fecha").subscribe(observer);
  }

}
