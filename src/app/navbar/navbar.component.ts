import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isLoggedIn = currentUser !== null && !!currentUser.username;
    this.username = currentUser.username || '';

    console.log(this.isLoggedIn, this.username, 'currentUser');
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/']);
  }

  openNav(): void {
    const sideMenu = document.getElementById("sideMenu");
    const contentArea = document.getElementById("contentArea");

    if (sideMenu && contentArea) {
      sideMenu.style.width = "300px";
      contentArea.style.marginLeft = "300px";
    }
  }

  closeNav(): void {
    const sideMenu = document.getElementById("sideMenu");
    const contentArea = document.getElementById("contentArea");

    if (sideMenu && contentArea) {
      sideMenu.style.width = "0";
      contentArea.style.marginLeft = "0";
    }
  }


}
