import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  public username: string = '';
  public email: string = '';
  public id: string = '';
 public  fullname: string = '';
 public  image: string = '';
 public userId: string = ''; 
 //mail: string = '';
  isProfileCardVisible: boolean = false;

  constructor( private router: Router,public auth:AuthService) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = currentUser.username;
    this.fullname = currentUser.fullName;
    this.id = currentUser.id;
    this.image = currentUser.imageUrl;
    this.email = localStorage.getItem('email') || currentUser.email; 
    this.userId = currentUser.$id;
  }
  toggleProfileCard() {
    this.isProfileCardVisible = !this.isProfileCardVisible;
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.auth.isLoggedIn;
    this.username = '';
    this.router.navigate(['/']);
  }
}
    /* this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.username = user.username;
        this.email = user.email;
      } else {
        this.isAuthenticated = false;
        this.username = '';
        this.email = '';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    this.username = '';
    this.router.navigate(['/']); // Redirect to homepage
  }

*/