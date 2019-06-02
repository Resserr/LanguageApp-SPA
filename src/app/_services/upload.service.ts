import { Injectable } from '@angular/core';
import { User } from '../_models/User';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

constructor(private storageService: AngularFireStorage) { }

uploadFile(file: File, user: User) {
  const ref = this.storageService.ref('/user_photos/' + file.name);
  return ref.put(file);
}

}
