import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
@Injectable({
  providedIn: 'root'
})
export class MemberResolver implements Resolve<any> {
  constructor(
      private userService: UserService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.userService.getUser(route.params['id']);
  }
}
