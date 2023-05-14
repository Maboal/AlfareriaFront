import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
selector: 'app-crear-producto',
templateUrl: './crear-producto.component.html',
styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  campos: any = {};
  created: boolean = false;

  constructor(private http: HttpClient) { }

  onSubmit(formulario: any): void {
    this.campos = formulario.value;
    console.log(this.campos); // Imprime los valores del formulario en la consola

    this.http.post('http://localhost:8000/productos/new', this.campos)
      .subscribe(
        response => {
          console.log(response);
          this.created = true;
        },
        error => console.log(error),
        );
  }
}

