import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  public post : any;
  public page_title : string;
  constructor(
    private _postService: PostService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { 
    this.page_title = 'Detalle del post';
    this.post = '';
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    this._activatedRoute.params.subscribe(params =>{
      let id = params['id'];

      
      this._postService.getPost(id).subscribe(
        response => {
          console.log(response);
          if (response.status == 'success') {
            this.post = response.post;
          } else {
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          this._router.navigate(['/inicio']);
        }
      );
      
    })
  }

}
