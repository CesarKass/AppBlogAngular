import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Category } from '../../models/category';
import { global } from '../../services/globals';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers : [CategoryService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title : string;
  public category : Category;
  public posts : any;
  public url : string;
  public identify:string;
  public token:string;
  constructor(
    private _activatedRoute : ActivatedRoute,
    private _router : Router,
    private _categoryService : CategoryService,
    private _userSerivice : UserService,
    private _postService: PostService
  ) {
    this.page_title = 'Categoria'; 
    this.url = global.url; 
    this.category = new Category(1,'');
    this.identify = this._userSerivice.getIdentity();
    this.token = this._userSerivice.getToken();
   }

  ngOnInit(): void {
    this.getPostsByCategory();

  }

  getPostsByCategory(){ 
      this._activatedRoute.params.subscribe(params =>{
      let id = params['id']; 
      this._categoryService.getCategory(id).subscribe(
        response => { 
          if (response.status == 'success') {
            console.log(response);
            this.page_title = 'Categoria - ' + response.categories.name; 

            this._categoryService.getPosts(id).subscribe(
              response => {
                if (response.status == 'success') {
                  this.posts = response.post;
                  console.log(response.post);
                  
                }
              },
              error => {

              },
            )
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

    deletePost(id:any){ 
      this._postService.delete(this.token, id).subscribe(
        response => {
          this.getPostsByCategory();
        },
        error => { 
          console.log(<any>error);
        }
      )
    } 

}
