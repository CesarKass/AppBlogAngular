import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public title:string;
  public identify:string;
  public token:string;
  public status:string;
  public msg:string;
  public category:Category;

  constructor(
    private _userSerivice: UserService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { 
    this.title = 'Nueva catgoria';
    this.status = '';
    this.msg = '';
    this.identify = this._userSerivice.getIdentity();
    this.token = this._userSerivice.getToken();
    this.category = new Category(1, '');
  }

  ngOnInit(): void {
  }
  
  onSubmit(form: any): void {
    console.log(this.category);
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if (response.status=="success") {
          this.status = 'success';
          this.msg = 'Categoria Registrada';
          console.log(response);
          this._router.navigate(['inicio']);
        } else {
          
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
    
  }

}
