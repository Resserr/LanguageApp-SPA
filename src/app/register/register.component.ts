import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.register(this.model.email, this.model.password).then(
      value => {
        console.log(value);
      },
      error => {
        console.log(error);
      }
    );
  }

  authWithFacebook() {
    this.authService
      .loginWithFacebook()
      .subscribe(user => this.alertifyService.success('Succsesfully sign up'), error => {
        this.alertifyService.error('Something went wrong. Try again!');
      });
  }

  authWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
