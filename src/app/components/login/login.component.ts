import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public identity: string;
  public token: string;
  constructor(
    private _userSerivice: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.page_title = 'Identificate';
    this.status = '';
    this.identity = '';
    this.token = '';
    this.user = new User(1, '', '', '2', '', '', '', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form: any) {
    //Obtener el token con las credenciasles del usuario
    this._userSerivice.sigup(this.user).subscribe(
      response => {
        if (response.status != 'error') {
          this.token = response;
          this.status = 'success';
          this.obtenerDatosUsuario();
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

  obtenerDatosUsuario() {
    this._userSerivice.sigup(this.user, true).subscribe(
      response => {
        this.identity = response;

        //Persistir datos del usuario
        localStorage.setItem('token', this.token);
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this.router.navigate(['inicio']);
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }

  logout() {
    this.activatedRoute.params.subscribe(params => {
      let logout = +params['sure'];
      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = '';
        this.token = '';
        
        this.router.navigate(['inicio']);
      }
    });
  }



}
