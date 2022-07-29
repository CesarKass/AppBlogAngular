import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service'; 

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  title = 'Edicion de usuario';
  public user: User;
  public status: string;
  public identity : any;
  public token :any;
  public options: Object = {
    placeholderText: 'Escriba aquí',
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  constructor(
    private _userSerivice: UserService
  ) {
    this.status = '';
    this.identity = this._userSerivice.getIdentity();
    this.token = this._userSerivice.getToken();
    this.user = new User(
                            1, 
                            this.identity.name, 
                            this.identity.surname, 
                            '2', 
                            this.identity.email, 
                            this.identity.password, 
                            this.identity.descripcion, 
                            this.identity.iamge
                        );
    // this.user = this.identity; 
   }

  ngOnInit(): void { 
  }

  onSubmit(form: any) { 
    this._userSerivice.update(this.token, this.user).subscribe(
      response => {
        if(response){
          console.log(this.user);

          if(response.changes.name){
            this.user.name = response.changes.name;
          }
          if(response.changes.surname){
            this.user.surname = response.changes.surname;
          }
          if(response.changes.email){
            this.user.email = response.changes.email;
          }
          if(response.changes.descripcion){
            this.user.descripcion = response.changes.descripcion;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          console.log(this.user);
          console.log(this.identity);
          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
    
  } 
}



