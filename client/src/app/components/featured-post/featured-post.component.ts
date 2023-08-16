import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-featured-post',
  templateUrl: './featured-post.component.html',
  styleUrls: ['./featured-post.component.css']
})
export class FeaturedPostComponent implements OnInit {

  post: any = {};

  postObserver: Observer<any> = {
    next: (post: any) => {
      this.post = post;
      console.log('post:', this.post);
    },
    error: (error: any) => {
      console.error('Error fetching post:', error);
    },
    complete: () => {
    },
  };



  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getLatestPost().subscribe(this.postObserver);
  }

}
