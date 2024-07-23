/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private username: string = '';
  private email: string = '';

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor (private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    console.log("currentUser is "+ this.currentUser);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  getEmail(): string {
    return this.email;
  }

  getUsername(): string {
    return this.username;
  }

  login(email: string, password: string): void {
    this.http.post<any>('api/login', { email, password }).subscribe(user => {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isAuthenticated = true;
        this.email = user.email;
        this.username = user.username;
      }
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({});
    this.isAuthenticated = false;
    this.username = '';
  }

  getCurrentUser() {
    return this.http.get<any>('api/getCurrentUser').pipe(map(user => {
      this.username = user.username;
      this.email = user.email;
      return user;
    }));
  }
}*/
