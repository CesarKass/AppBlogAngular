import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Category } from '../../models/category';
import { Post } from '../../models/post';
import { global } from '../../services/globals';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {
  public titlePage:string;
  public identify:string;
  public token:string;
  public status:string;
  public msg:string;
  public post:Post;
  public categories:any;

  public resetVar: any;
  public imagePost: any;
  public imagePostName: any;


  public options: Object = {
    placeholderText: 'Escriba aquí',
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };

  constructor(
    private _userSerivice: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.titlePage = 'Crear post';
    this.status = '';
    this.msg = '';
    this.identify = this._userSerivice.getIdentity();
    this.token = this._userSerivice.getToken();
    this.post = new Post(
      1, 1, 1, 
      '',
      '',
      null,
      null); 
   }

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit(form: any): void {
    console.log(this.post);
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status=="success") {
          this.status = 'success';
          this.msg = 'Post Registrado';
          console.log(response);
          this._router.navigate(['/inicio']);
        } else {
          
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
    
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response.categories;   
      },
      error => { 
        console.log(<any>error);
      }
    )
  }




  public afuConfig: any = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",//MB
    uploadAPI: {
      url: global.url + 'post/upload',
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
      attachPinBtn: 'Subir imagen del post',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  ImageUpload(datos:any){ 
    if(datos.body){
      this.status = 'success';
      this.msg = 'Agrego una imagen al post';
      this.post.image = datos.body.image;
      this.imagePost = true;
      this.imagePostName = global.url + 'post/image/'+datos.body.image;
    }else{
      
    }
  }

}
