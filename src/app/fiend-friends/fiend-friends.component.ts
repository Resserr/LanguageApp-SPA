import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';

@Component({
  selector: 'app-fiend-friends',
  templateUrl: './fiend-friends.component.html',
  styleUrls: ['./fiend-friends.component.css']
})
export class FiendFriendsComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.users = data['users'];
      console.log(this.users);
    });
  }

}
