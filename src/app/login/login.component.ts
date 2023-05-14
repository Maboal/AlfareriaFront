import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loggedIn = false;

  constructor(private http: HttpClient) {}

  public login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<number>('http://localhost:8000/login/', loginData).subscribe(
      response => {
        console.log(response); // Mostrar la respuesta en la consola del navegador

        // Si la respuesta es correcta, guardar la información en el localStorage
        if ( response !== null) {
          localStorage.setItem('id_usuario', response.toString());
          localStorage.setItem('username', this.username);
          localStorage.setItem('loggedIn', 'true');
          this.loggedIn = true;
        }
      },
      error => {
        console.error(error); // Mostrar el error en la consola del navegador
      }
    );
  }
}