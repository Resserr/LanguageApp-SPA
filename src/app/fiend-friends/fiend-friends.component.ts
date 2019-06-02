import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { LikeDislikeHelper } from '../_helpers/like-dislike.helper';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-fiend-friends',
  templateUrl: './fiend-friends.component.html',
  styleUrls: ['./fiend-friends.component.css']
})
export class FiendFriendsComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private likeDislikeHelper: LikeDislikeHelper,
    private authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.users = data['users'];
      this.users.splice(this.users.findIndex(x => x.id === this.authService.decodedToken.user_id), 1);
      console.log(this.users);
    });
  }
  modifyLike(user: User) {
    this.likeDislikeHelper.modifyLike(user);
  }
  modifyDislike(user: User) {
    this.likeDislikeHelper.modifyDislike(user);
  }

}
