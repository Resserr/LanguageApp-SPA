import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-profileEdit',
  templateUrl: './profileEdit.component.html',
  styleUrls: ['./profileEdit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  dropdownList = [];
  dropdownSettings = {};
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.user = data['user'];
      console.log(data['languages']);
      data['languages'].forEach(element => {
        this.dropdownList.push(element.name);
      });
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect() {
    this.editForm.controls['email'].markAsDirty();
  }

  updateChanges() {
    console.log(this.user);
    this.userService
      .setUser(this.authService.decodedToken.user_id, this.user)
      .subscribe(
        () => this.alertify.success('Data succsessfuly changed'),
        error => this.alertify.error('Something went wrong. Try to reload the page')
      );
    this.editForm.reset(this.editForm.value);
  }

}
