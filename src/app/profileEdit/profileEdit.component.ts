import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { UploadService } from '../_services/upload.service';

@Component({
  selector: 'app-profileEdit',
  templateUrl: './profileEdit.component.html',
  styleUrls: ['./profileEdit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  fileInputValue: string;
  dropdownList = [];
  dropdownSettings = {};
  dateTime: Date;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService,
    private uploadService: UploadService
  ) {
    this.fileInputValue = 'Choose file';
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.user = data['user'];
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
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
  onItemSelect() {
    this.editForm.controls['email'].markAsDirty();
  }

  updateChanges() {
    this.userService
      .setUser(this.authService.decodedToken.user_id, this.user)
      .subscribe(
        () => this.alertify.success('Data successfully changed'),
        error => this.alertify.error('Something went wrong. Try to reload the page')
      );
    this.editForm.reset(this.editForm.value);
  }
  upload(event) {
    const fileToDownload: File = event.target.files[0];
    this.fileInputValue = fileToDownload.name;
    const uploadTask = this.uploadService.uploadFile(fileToDownload, this.user);
    uploadTask.task.on('state_changed', null, (error) => console.log(error), () => {
      uploadTask.task.snapshot.ref.getDownloadURL().then((url) => {
        this.user.photoUrl = url;
        this.userService.modifyUserField(this.user.id, {photoUrl: this.user.photoUrl});
        this.alertify.success('Photo uploaded successfully');
      });
    });
  }
}
