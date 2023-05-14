import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  productos: any;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8000/productos/').subscribe((data) => {
      this.productos = data;
    });
  }
}
