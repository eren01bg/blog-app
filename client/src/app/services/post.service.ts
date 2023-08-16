import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/api/posts';

  getPosts(limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}`);
  }

  getLatestPost(): Observable<any> {
    return this.http.get(`${this.apiUrl}/latest`);
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

  getPostsByAuthor(id: string, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/author/${id}?limit=${limit}`);
  }

  getPostsByCategory(id: string, limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${id}?limit=${limit}`);
  }






}
