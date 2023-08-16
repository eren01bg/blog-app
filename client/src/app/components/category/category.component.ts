import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  category: any = {};

  categoryObserver: Observer<any> = {
    next: (category: any) => {
      console.log('category:', category);
      this.category = category;
    },
    error: (error: any) => {
      console.error('Error fetching category:', error);
    },
    complete: () => {},
  };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');

    if (categoryId !== null) {
      this.categoryService
        .getCategory(categoryId)
        .subscribe(this.categoryObserver);
    } else {
      this.router.navigate(['/']);
    }
  }
}
