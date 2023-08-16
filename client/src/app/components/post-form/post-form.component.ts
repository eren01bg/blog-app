import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent {

  postForm: FormGroup = new FormGroup({});
  errorMessage = '';
  title = 'Create Post';
  action = 'add';
  postId = '';
  categories: any[] = [];

  categoryObserver: Observer<any[]> = {
    next: (categories: any[]) => {
      this.categories = categories;
    },
    error: (error: any) => {
      console.error('Error fetching categories:', error);
    },
    complete: () => {
    },
  };



  postObserver = {
    next: (post: any) => {
      this.postForm.patchValue({
        title: post?.title,
        content: post?.content,
        image: post?.image,
        category: post?.category?._id,
      })
    },
    error: (error: HttpErrorResponse) => {
      if (error?.error?.message !== undefined) {
        this.errorMessage = error?.error?.message;
      } else if (error?.error?.errors[0] !== undefined) {
        this.errorMessage = error?.error?.errors[0]?.message;
      } else {
        this.errorMessage = 'An error occurred.';
      }
    },
    complete: () => {},
  };

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const postId = this.route.snapshot.paramMap.get('id') || null;

    if (postId !== null) {
      this.action = 'edit';
      this.title = 'Edit Post';
      this.postId = postId;
    }


    if (this.postId !== null) {

      this.postService.getPost(this.postId).subscribe(this.postObserver);

    }

    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.categoryService.getCategories().subscribe(this.categoryObserver);
  }



  onSubmit() {

    if (this.postForm.valid) {
      const formData = this.postForm.value;

      const observer = {
        next: (response: any) => {},
        error: (error: HttpErrorResponse) => {
          if (error?.error?.message !== undefined) {
            this.errorMessage = error?.error?.message;
          } else if (error?.error?.errors[0] !== undefined) {
            this.errorMessage = error?.error?.errors[0]?.message;
          } else {
            this.errorMessage = 'An error occurred.';
          }
        },
        complete: () => {
          this.router.navigate(['/']);
        },
      };

      if (this.action === 'add') {
        this.postService.createPost(formData).subscribe(observer);
      }
      if (this.action === 'edit' && this.postId !== '') {
        this.postService.updatePost(this.postId, formData).subscribe(observer);
      }


    }

  }
}
