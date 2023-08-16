import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({});

  faSearch = faSearch;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,

  ) {}

  ngOnInit(): void {


    this.searchForm = this.formBuilder.group(
      {
        search: ['', [Validators.required]],
      }
    );

  }

  onSubmit() {

    if(this.searchForm.valid) {
      const formData = this.searchForm.value;
      this.router.navigate(['/search'], { queryParams: { q: formData.search } });
    }

  }

}
