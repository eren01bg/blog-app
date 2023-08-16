import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateLoginStatus();
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token) as { exp: number };
      const now = Date.now() / 1000;

      if (decodedToken.exp > now) {
        return true;
      } else {
        localStorage.removeItem('token');
        this.updateLoginStatus();
        return false;
      }

    }
    return false;
  }

  updateLoginStatus(): void {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  logout(): void {
    localStorage.removeItem('token');
    this.updateLoginStatus();
  }

  getAuthorizationToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token) as { userId: string };
      return decodedToken.userId;
    }
    return null;
  }

  getUserDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }


}
