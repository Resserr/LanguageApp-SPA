import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LikeService } from '../_services/like.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileLikeResolver implements Resolve<any> {
  constructor(private likeService: LikeService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return this.likeService.getAllLikes();
  }
}
