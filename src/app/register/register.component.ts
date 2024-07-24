import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const user = {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post('https://localhost:44371/api/Account/register', user)
      .subscribe(
        response => {
          alert('Registration successful');
          this.router.navigate(['/']); // Navigate to the login page after successful registration
        },
        (error: HttpErrorResponse) => {
          alert('Registration failed');
          if (error.status === 400) {
            this.errorMessage = error.error.message || 'Registration failed due to a bad request.';
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
  }
}
