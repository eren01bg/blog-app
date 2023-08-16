import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private apiUrl = 'http://localhost:3000/api/posts';

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPost(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post(this.apiUrl, post);
  }

  updatePost(id: string, post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getPostsByUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  getPostsByCategory(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${id}`);
  }






}
