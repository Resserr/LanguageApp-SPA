import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { LikeService } from '../_services/like.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private likeService: LikeService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => this.user = data['user']);
  }
}
