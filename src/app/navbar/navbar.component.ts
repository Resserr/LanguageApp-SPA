import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  logedIn(): boolean {
    return this.authService.isLogedIn();
  }
}
