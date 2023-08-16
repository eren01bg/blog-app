import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/api/categories';

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCategory(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

}
