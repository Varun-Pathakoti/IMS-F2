import { Component, OnInit } from '@angular/core';
//import { AuthService } from './auth.service';
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

  constructor( private router: Router) {}

  ngOnInit(): void {
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