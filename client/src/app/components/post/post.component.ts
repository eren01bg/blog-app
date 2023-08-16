import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  post: any = {};
  sanitizedContent: SafeHtml = '';
  postObserver: Observer<any> = {
    next: (post: any) => {
      this.post = post;
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
        post?.content
      );
    },
    error: (error: any) => {
      console.error('Error fetching post:', error);
    },
    complete: () => {},
  };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId !== null) {
      this.postService.getPost(postId).subscribe(this.postObserver);
    } else {
      this.router.navigate(['/']);
    }
  }
}
