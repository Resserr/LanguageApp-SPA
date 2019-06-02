import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { LikeDislikeHelper } from '../_helpers/like-dislike.helper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private likeDislikeHelper: LikeDislikeHelper
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => this.user = data['user']);
  }

  modifyLike() {
    this.likeDislikeHelper.modifyLike(this.user);
  }

  modifyDislike() {
    this.likeDislikeHelper.modifyDislike(this.user);
  }
}
