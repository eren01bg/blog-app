import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';


@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.css']
})
export class ProfileEditFormComponent implements OnInit {

  userId: string | null = null;
  user: any = null;
  errorMessage = '';
  profileForm: FormGroup = new FormGroup({});
  profileObserver: Observer<any> = {
    next: (user: any) => {
      this.user = user;
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        biography: user.biography,
      });
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
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.userId = this.authService.getUserId();

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      image: ['', Validators.required],
      biography: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
    });

    if (this.userId !== null) {

      this.authService.getUserDetails(this.userId).subscribe(this.profileObserver);


    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.userId !== null) {
      const formData = this.profileForm.value;

      const observer = {
        next: () => {
        },
        error: (error: Error) => {
          console.log(error);
        },
        complete: () => {
          this.router.navigate(['/profile']);
        }
      };

      this.authService.updateUserDetails(this.userId ,formData).subscribe(observer);
    }
  }

}
