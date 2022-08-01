import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { global } from './services/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Angular Blog';
  public identity: any;
  public token: any;
  public avatarUserName: any;
  public categories: any;


  constructor(private userService: UserService, private categoryService: CategoryService) {
    this.cargarUsuario();
    this.categories = '';
    this.getCategories();
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();  
    this.avatarUserName = global.url + 'user/avatar/' + this.identity.image;
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      response => {
        this.categories = response.categories;   
      },
      error => { 
        console.log(<any>error);
      }
    )
  }

}
