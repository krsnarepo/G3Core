import { Component, ElementRef, ViewChild } from '@angular/core';
import { UpdateDocumentService } from '../services/update-document.service';

@Component({
  selector: 'app-update-document-page',
  templateUrl: './update-document-page.component.html',
  styleUrls: ['./update-document-page.component.css']
})



export class UpdateDocumentPageComponent {

  @ViewChild('cod_doc') cod_doc!: ElementRef;

  list: any = [];
  anyt: any = []; 

  constructor(private updateService: UpdateDocumentService) { 

  }

  onSearch() {
    console.log('Search button clicked: ', this.cod_doc.nativeElement.value);
    const cod_doc = this.cod_doc.nativeElement.value;
    // Call the API to search for the document with the given cod_doc
    this.updateService.getDocument$(cod_doc).subscribe({
      next: (response) => {
        this.list = response;
        this.anyt = this.list?.pedidos;

        console.log('Document obtained: ', this.anyt);
      },
      error: (error) => {
        console.log('Error obtaining document: ', error);
      }
    });
  }

}
