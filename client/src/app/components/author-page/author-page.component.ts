import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
// import { faFacebook, faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})
export class AuthorPageComponent implements OnInit {

  author: any = {};
  authorObserver: Observer<any> = {
    next: (author: any) => {
      console.log('author:', author);
      this.author = author;
    },
    error: (error: any) => {
      console.error('Error fetching author:', error);
    },
    complete: () => { },
  };


  // faFacebook = faFacebook;
  // faYoutube = faYoutube;
  // faTwitter = faTwitter;
  // faInstagram = faInstagram;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const authorId = this.route.snapshot.paramMap.get('id');


    if (authorId !== null) {
      this.authService.getUserDetails(authorId).subscribe(this.authorObserver);
    } else {
      this.router.navigate(['/']);
    }



  }

}
