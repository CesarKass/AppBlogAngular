import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  constructor(
    private _userSerivice: UserService
  ) {
    this.page_title = 'Registrate';
    this.user = new User(1, '', '', '2', '', '', '', '');
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    console.log(this.user);
    console.log(this._userSerivice.test());
    
    form.reset();
  }

}
