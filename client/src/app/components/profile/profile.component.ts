import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  author: any = {};

  authorObserver: Observer<any> = {
    next: (author: any) => {
      console.log('author:', author);
      this.author = author;
    },
    error: (error: any) => {
      console.error('Error fetching author:', error);
    },
    complete: () => {},
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (userId !== null) {
      this.authService.getUserDetails(userId).subscribe(this.authorObserver);
    } else {
      this.router.navigate(['/']);
    }
  }
}
