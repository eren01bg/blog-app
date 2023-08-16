import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { PostService } from '../../services/post.service';
import { Observer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-posts-grid',
  templateUrl: './posts-grid.component.html',
  styleUrls: ['./posts-grid.component.css'],
})
export class PostsGridComponent implements OnChanges, OnInit {
  @Input() postType: string = 'latest';
  // typeId can be either the ID of a category or the author's ID depending on the postType value
  @Input() typeId: string = '';
  @Input() limit: number = 6;
  @Input() showTitle: boolean = true;
  @Input() title: string = 'Latest Posts';
  @Input() showMoreButton: boolean = true;
  @Input() showActions: boolean = false;

  posts: any[] = [];
  userId: string | null = null;

  faPencil = faPencil;
  faTrash = faTrash;

  postObserver: Observer<any[]> = {
    next: (posts: any[]) => {
      this.posts = posts;
    },
    error: (error: any) => {
      console.error('Error fetching posts:', error);
    },
    complete: () => {},
  };

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.userId = this.authService.getUserId();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postType'] || changes['typeId'] || changes['limit']) {
      this.fetchPosts();
    }
  }

  private fetchPosts(): void {
    if (this.postType === 'latest') {
      this.postService.getPosts(this.limit).subscribe(this.postObserver);
    }
    if (this.postType === 'category' && this.typeId !== undefined) {
      this.postService
        .getPostsByCategory(this.typeId, this.limit)
        .subscribe(this.postObserver);
    }
    if (this.postType === 'author' && this.typeId !== undefined) {
      this.postService
        .getPostsByAuthor(this.typeId, this.limit)
        .subscribe(this.postObserver);
    }
  }

  onDelete(postId: string): void {
    // this.postService.deletePost(postId).subscribe(() => {
    //   this.fetchPosts();
    // });
  }
}
