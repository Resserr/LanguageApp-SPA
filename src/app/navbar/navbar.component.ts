import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;

  constructor(public authService: AuthService, private routeService: Router) {}

  ngOnInit() {}

  logedIn(): boolean {
    return this.authService.isLogedIn();
  }

  logout() {
    this.authService.logout();
    this.routeService.navigate(['']);
  }
}
