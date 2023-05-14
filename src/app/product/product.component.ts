import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id = '';
  producto: any = {};
  arrayCarrito: any = [];
  added: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.http.get(`http://localhost:8000/productos/${this.id}`).subscribe((data: any) => {
      this.producto = data[0];
    });
    // Pasar local storage Carrito al array
    
    var stringCarrito = localStorage.getItem('carrito');

    if (stringCarrito !== null){
      this.arrayCarrito = JSON.parse(stringCarrito);
    }
    console.log(this.arrayCarrito);
    console.log(stringCarrito);

  }

  agregarAlCarrito() {

    var objetoEncontrado = this.arrayCarrito.find((objeto: { id: string; }) => objeto.id === this.id);

    if (objetoEncontrado) {
      objetoEncontrado.cantidad += 1;
    } else {
      objetoEncontrado = {id : this.id, cantidad : 1};
      this.arrayCarrito.push(objetoEncontrado);
    }

    
    localStorage.setItem('carrito', JSON.stringify(this.arrayCarrito));
    this.added = true;
    // localStorage.setItem('loggedIn', 'true');
    
  }


}