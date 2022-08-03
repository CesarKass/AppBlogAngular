import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { global } from '../../services/globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService]
})
export class ProfileComponent implements OnInit {
  public page_title: string; 
  public posts:any;
  public user:any;
  public url:any;
  public identify:string;
  public token:string;
  public avatarUserName: any;
  constructor(
    private _userSerivice: UserService,
    private _postService: PostService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { 
    this.page_title = 'Inicio';
    this.url = global.url;
    this.identify = this._userSerivice.getIdentity();
    this.token = this._userSerivice.getToken();
    this.user = new User(1, '', '', '2', '', '', '', '');
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params =>{
    let userID = params['id'];
    this.getPosts(userID);
    this.getUser(userID);
    }) 
  }

  getUser(userID:any){
    this._userSerivice.getUser(userID).subscribe(
      response => {
        this.user = response.user;  
        this.avatarUserName = global.url + 'user/avatar/' + this.user.image;
        console.log(this.user);
        
      },
      error => { 
        console.log(<any>error);
      }
    )
  }

  getPosts(userID:any){
    this._userSerivice.getPosts(userID).subscribe(
      response => {
        this.posts = response.post;   
        console.log(response);
      },
      error => { 
        console.log(<any>error);
      }
    )
  }

  deletePost(id:any){ 
    this._postService.delete(this.token, id).subscribe(
      response => {
        this._activatedRoute.params.subscribe(params =>{
          let userID = params['id'];
          this.getPosts(userID);
          }) 
      },
      error => { 
        console.log(<any>error);
      }
    )
  } 

}
