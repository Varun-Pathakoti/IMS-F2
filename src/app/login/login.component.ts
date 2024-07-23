import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordVisible = false;
  isPasswordFocused = false;
  usernameLength = 0;
  email = '';
  password = '';
  errorMessage = '';

  @ViewChild('usernameRef', { static: false }) usernameRef!: ElementRef;
  @ViewChild('faceRef', { static: false }) faceRef!: ElementRef;

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  handlePasswordFocus() {
    this.isPasswordFocused = true;
  }

  handlePasswordBlur() {
    this.isPasswordFocused = false;
  }

  handleUsernameFocus() {
    this.usernameLength = Math.min(this.usernameRef.nativeElement.value.length - 16, 19);
  }

  handleUsernameBlur() {
    this.usernameLength = 0;
  }

  handleUsernameInput(event: any) {
    this.usernameLength = Math.min(event.target.value.length - 16, 19);
  }

  onSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.http.post('https://localhost:44371/api/Account/login', user).subscribe(
      response => {
        alert('Login successful');
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/navbar']); // Navigate to the dashboard after successful login

        // Reset the email and password fields
        this.email = '';
        this.password = '';
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your email and password.';

        // Reset the email and password fields
        this.email = '';
        this.password = '';
      }
    );
  }
}
