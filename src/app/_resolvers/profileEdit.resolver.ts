import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { AlertifyService } from '../_services/alertify.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileEditResolver implements Resolve<User> {
  constructor(
    private alertify: AlertifyService,
    private usersService: UserService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    console.log(this.authService.decodedToken.user_id);
    return this.usersService.getUser(
      this.authService.decodedToken.user_id
    );
  }
}
