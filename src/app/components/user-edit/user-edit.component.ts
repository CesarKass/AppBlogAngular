import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/globals';

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
  public msg: string;
  public avatarUser: any;
  public avatarUserName: any;
  public identity: any;
  public token: any;
  public resetVar: any;
  public options: Object = {
    placeholderText: 'Escriba aquí',
    charCounterCount: true,
    language: 'es',
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
  };

 

  constructor(
    private _userSerivice: UserService
  ) {
    this.status = '';
    this.msg = '';
    this.avatarUser = true; 
    this.identity = this._userSerivice.getIdentity();
    this.token = this._userSerivice.getToken();
    this.resetVar = false;
    this.user = new User(
      1,
      this.identity.name,
      this.identity.surname,
      '2',
      this.identity.email,
      this.identity.password,
      this.identity.descripcion,
      this.identity.image
    );
    
    this.avatarUserName = global.url + 'user/avatar/' + this.identity.image;
    // console.log(this.avatarUserName);
    // this.user = this.identity; 
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this._userSerivice.update(this.token, this.user).subscribe(
      response => {
        if (response) {
          console.log(this.user);
 
          if (response.changes.name) {
            this.user.name = response.changes.name;
          }
          if (response.changes.surname) {
            this.user.surname = response.changes.surname;
          }
          if (response.changes.email) {
            this.user.email = response.changes.email;
          }
          if (response.changes.descripcion) {
            this.user.descripcion = response.changes.descripcion;
          }

          this.identity = this.user;
          this.identity.sub = this.user.id;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          console.log(this.user);
          console.log(this.identity);
          this.msg = 'El usuario fue actualizado correctamente.';
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
 
  public afuConfig: any = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",//MB
    uploadAPI: {
      url: global.url + 'user/upload',
      headers: { 
        "Authorization": this._userSerivice.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir avatar',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  AvatarUpload(datos:any){ 
    if(datos.body){
      this.status = 'success';
      this.msg = 'El avatar del usuario fue actualizado';
      this.user.image = datos.body.image;
      this.avatarUser = true;
      this.avatarUserName = global.url + 'user/avatar/'+datos.body.image;
    }else{
      
    }
  }
}



