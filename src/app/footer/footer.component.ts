import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  user: any = localStorage.getItem('username')
  // isAdmin: boolean = localStorage.getItem('isAdmin')

  onInit(): void {

  }

}
