import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  public page_title: string; 
  public posts:any;
  public url:any;
  public identify:string;

  constructor(
    private _userSerivice: UserService,
    private _postService: PostService
  ) { 
    this.page_title = 'Inicio';
    this.url = global.url;
    this.identify = this._userSerivice.getIdentity();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        this.posts = response.posts; 
        
      },
      error => { 
        console.log(<any>error);
      }
    )
  }

}
