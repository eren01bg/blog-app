import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      }
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      const observer = {
        next: (response: any) => {

          if(response.token) {
            localStorage.setItem('token', response.token);
          }

        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error?.error?.message || 'An error occurred.';
        },
        complete: () => {
          this.authService.updateLoginStatus();
          this.router.navigate(['/']);
        }
      };

      this.authService.loginUser(formData).subscribe(observer);
    }
  }

}
