import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { delay } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  loginWithEmail() {
    this.authService
      .loginWithEmail(this.model.email, this.model.password)
      .subscribe(
        value => this.alertifyService.success('Successfully loged in.'),
        err => this.alertifyService.error('Something went wrong')
      );
  }
  authWithFacebook() {
    this.authService.loginWithFacebook().subscribe(
      null,
      error => {
        this.alertifyService.error('Something went wrong. Try again!');
      },
      () => this.alertifyService.success('Succsesfully sign in with Facebook')
    );
  }
  authWithGoogle() {
    this.authService.loginWithGoogle().subscribe(
      null,
      error => {
        this.alertifyService.error('Something went wrong. Try again!');
      },
      () => this.alertifyService.success('Succsesfully sign in with Google') 
    );
  }
}
