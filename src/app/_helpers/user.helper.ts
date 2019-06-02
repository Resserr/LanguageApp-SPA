import { User } from '../_models/User';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class UserHelper {
  initializeNewUser(userDto: any, decodedToken: any): User {
    console.log(decodedToken);
    let user: User;
    if (decodedToken.firebase.sign_in_provider === 'password') {
      user = this.initializeStandardUser(userDto);
    } else if (decodedToken.firebase.sign_in_provider === 'facebook.com' || decodedToken.firebase.sign_in_provider === 'google.com') {
      user = this.initializeFacebookGoogleUser(decodedToken);
    }
    this.initializeStandardFields(user, decodedToken);
    return user;
  }

  private initializeFacebookGoogleUser(decodedToken: any): User {
    const nameAndSurname: string = decodedToken.name.split(' ');
    return {
      city: '',
      country: '',
      gender: '',
      name: nameAndSurname[0],
      surname: nameAndSurname[1],
      email: decodedToken.email,
    };
  }

  private initializeStandardUser(userDto: any): User {
    return  {
      city: userDto.city,
      country: userDto.country,
      gender: userDto.gender,
      name: userDto.name,
      surname: userDto.surname,
      email: userDto.email
    };
  }

  private initializeStandardFields(user: User, decodedToken: any) {
    user.id = decodedToken.user_id;
    user.photoUrl =
      'https://firebasestorage.googleapis.com/v0/b/' +
      'languageapp-8a657.appspot.com/o/avatar.jpg?alt=media&token=49e68538-ca65-461b-a2d3-4938660ae19b';
    user.created = new Date();
    user.likes = 0;
    user.dislikes = 0;
  }
}
