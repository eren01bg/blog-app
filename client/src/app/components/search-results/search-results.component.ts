import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    const query = this.route.snapshot.queryParamMap.get('q');

    if(query) {
      this.searchQuery = query;
    }
  }
}
