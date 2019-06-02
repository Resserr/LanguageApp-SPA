import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';
  import { AlertifyService } from '../_services/alertify.service';
  import { AuthService } from '../_services/auth.service';
  import { Injectable } from '@angular/core';
  
  @Injectable({
    providedIn: 'root'
  })
  export class StartUpGuard implements CanActivate {
    constructor(
      private alertifyService: AlertifyService,
      private routeSerivce: Router,
      private authService: AuthService
    ) {}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      if (this.authService.isLogedIn()) {
        this.routeSerivce.navigate(['/news']);
        return false;
      }
      return true;
    }
  }