import { Component } from '@angular/core';
import { faFacebook, faYoutube, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrls: ['./author-page.component.css']
})
export class AuthorPageComponent {

  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  constructor() { }

}
