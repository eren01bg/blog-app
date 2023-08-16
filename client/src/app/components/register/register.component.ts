import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../utils/custom-validators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        image: ['' , [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', Validators.required],
      },
      {
        validator: passwordMatchValidator(),
      }
    );
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      const observer = {
        next: (response: any) => {

          if(response.token) {
            localStorage.setItem('token', response.token);
          }

        },
        error: (error: Error) => {
          console.log(error);
        },
        complete: () => {
          this.authService.updateLoginStatus();
          this.router.navigate(['/']);
        }
      };

      this.authService.registerUser(formData).subscribe(observer);
    }
  }
}
