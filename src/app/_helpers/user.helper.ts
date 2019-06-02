import { User } from '../_models/User';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class UserHelper {
  initializeNewUser(user: User, user_id): User {
    user.id = user_id;
    user.photoUrl =
      'https://firebasestorage.googleapis.com/v0/b/' +
      'languageapp-8a657.appspot.com/o/avatar.jpg?alt=media&token=49e68538-ca65-461b-a2d3-4938660ae19b';
    user.created = new Date();
    user.likes = 0;
    user.dislikes = 0;
    return user;
  }
}
