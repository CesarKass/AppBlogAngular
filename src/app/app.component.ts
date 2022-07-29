import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Angular Blog';
  public identity : any;
  public token :any;

  constructor( private userService: UserService){
    this.cargarUsuario();
  }

  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

}
