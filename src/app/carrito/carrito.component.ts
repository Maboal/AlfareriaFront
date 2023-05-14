import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  arrayCarrito: any[] = [];
  arrayProductos: any[] = [];
  total: number = 0;
 

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const carritoString = localStorage.getItem('carrito');

    if (carritoString) {
      this.arrayCarrito = JSON.parse(carritoString);
    }

    console.log(this.arrayCarrito);

    this.arrayCarrito.forEach((elementCarrito) => {
      this.http
        .get(`http://localhost:8000/productos/${elementCarrito.id}`)
        .subscribe((data: any) => {
          this.arrayProductos.push({
            id: data[0].id,
            nombre: data[0].nombre,
            precio: data[0].precio,
            imagen_url: data[0].imagen_url,
            cantidad: elementCarrito.cantidad,
          });
          this.total += elementCarrito.cantidad * data[0].precio;
        });
    });
    console.log(this.arrayProductos);
  }

  realizarPedido() {
    var id_usuario = localStorage.getItem("id_usuario");

    var data :any = {
      "id_usuario": id_usuario,
      "total": this.total,
      "lineasPedidos": []
    }

    this.arrayProductos.forEach(producto => {
      var lineasPedidos = {
        "id_producto": producto.id,
        "cantidad" : producto.cantidad
      }

      data['lineasPedidos'].push(lineasPedidos); 
    });

    this.http.post('http://localhost:8000/pedidos/new', data).subscribe(
      response => {
        console.log(response);
        
      });
    }
}

