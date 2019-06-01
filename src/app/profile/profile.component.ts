import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { LikeService } from '../_services/like.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private likeService: LikeService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => this.user = data['user']);
  }

  addLike() {
    // if (this.likeService.isExist(this.user.id)) {
      this.likeService.userExist(this.user.id, this.authService.decodedToken.user_id).subscribe( data => {
        if (data) {
          this.user.likes -= 1;
          this.likeService.deleteLike(this.user.id, this.authService.decodedToken.user_id).subscribe();
        } else {
          this.user.likes += 1;
          this.likeService.addLike(this.user.id, this.authService.decodedToken.user_id, true).subscribe();
        }
        this.userService.modifyUserField(this.user.id, {likes: this.user.likes });
      });
  }
}
