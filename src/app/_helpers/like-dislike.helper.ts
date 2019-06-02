import { Injectable } from '@angular/core';
import { LikeService } from '../_services/like.service';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { DislikeService } from '../_services/dislike.service';

@Injectable({
  providedIn: 'root'
})
export class LikeDislikeHelper {
  constructor(
    private likeService: LikeService,
    private dislikeService: DislikeService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  modifyLike(user: User) {
    this.likeService.userExist(user.id).subscribe( data => {
      if (data) {
        this.likeService.deleteLike(user);
      } else {
        this.dislikeService.userExist(user.id).subscribe( dislikeData => {
          if (dislikeData) {
            this.dislikeService.deleteDislike(user);
          }
          this.likeService.addLike(user, true);
        });
      }
    });
  }

  modifyDislike(user: User) {
    this.dislikeService.userExist(user.id).subscribe( data => {
      if (data) {
        this.dislikeService.deleteDislike(user);
      } else {
        this.likeService.userExist(user.id).subscribe( likedData => {
          if (likedData) {
            this.likeService.deleteLike(user);
          }
          this.dislikeService.addDislike(user, true);
        });
      }
    });
  }
}
