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
    this.authService.register(this.model).subscribe(
      user => this.alertifyService.success('Succsesfully registered!'),
      error => {
        this.alertifyService.error('Something went wrong. Try again!');
      }
    );
  }

  authWithFacebook() {
    this.authService.loginWithFacebook().subscribe(
      user => console.log(user),
      error => {
        this.alertifyService.error('Something went wrong. Try again!');
      }
    );
  }
// this.alertifyService.success('Succsesfully sign up')
  authWithGoogle() {
    this.authService.loginWithGoogle().subscribe(
      user => console.log(user)
    );
  }
}
