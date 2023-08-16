import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css'],
})
export class CreateBlogComponent {
  createBlogForm: FormGroup = new FormGroup({});
  errorMessage = '';

  categories = [
    { value: 'technology', viewValue: 'Technology' },
    { value: 'lifestyle', viewValue: 'Lifestyle' },
    { value: 'food', viewValue: 'Food' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createBlogForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createBlogForm.valid) {
      const formData = this.createBlogForm.value;


      const observer = {
        next: (response: any) => {

        },
        error: (error: HttpErrorResponse) => {
          if(error?.error?.message !== undefined){
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

      this.postService.createPost(formData).subscribe(observer);
    }
  }
}
