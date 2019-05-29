import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: any;

  constructor(
    public authServiceFirebase: AngularFireAuth,
    private userService: UserService,
    private router: Router
  ) {}

  public register(email: string, password: string) {
    return this.getObservableAndSetToken(
      this.authServiceFirebase.auth.createUserWithEmailAndPassword(
        email,
        password
      ),
      true
    );
  }

  public loginWithEmail(email: string, password: string) {
    return this.getObservableAndSetToken(
      this.authServiceFirebase.auth.signInWithEmailAndPassword(email, password)
    );
  }

  public logout() {
    localStorage.removeItem('token');
    return this.authServiceFirebase.auth.signOut();
  }

  public isLogedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }

  // private isLogedIn() {
  //   this.theBoolean.next((!this.jwtHelper.isTokenExpired(localStorage.getItem('token'))));
  // }

  public loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.getObservableAndSetToken(
      this.authServiceFirebase.auth.signInWithPopup(provider)
    );
  }

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.getObservableAndSetToken(
      this.authServiceFirebase.auth.signInWithPopup(provider)
    );
  }

  private getObservableAndSetToken(
    promise: Promise<firebase.auth.UserCredential>,
    isNew: boolean = false
  ) {
    return from(promise).pipe(
      map(value => {
        if (value) {
          value.user.getIdToken(true).then(token => {
            localStorage.setItem('token', token);
            this.setInitialSettings(token, isNew);
            console.log(this.decodedToken);
          });
        }
      })
    );
  }
  private setInitialSettings(token: string, isNew: boolean) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
    if (this.isLogedIn()) {
      if (isNew) {
        this.userService.setUser(
          this.decodedToken.user_id,
          this.initializeNewUser()
        );
        this.router.navigate(['/profile/edit']);
      } else {
        this.router.navigate(['/news']);
      }
    }
  }
  private initializeNewUser(): User {
    const user: User = {
      name: '',
      surname: '',
      gender: '',
      // age?:,
      created: new Date(),
      country: '',
      city: '',
      photoUrl:
        'https://firebasestorage.googleapis.com/v0/b/languageapp-8a657.appspot.com' +
        '/o/avatar.jpg?alt=media&token=49e68538-ca65-461b-a2d3-4938660ae19b',
      introduction: ''
      // interests?: '',
      // knownLanguages?: [''],
      // wantedLanguages?: [''],
      // visitedCountries?: [''],
      // countriesToVisit?: [''],
      // facebookLink?: '',
      // instagramLink?: '',
      // email?: '',
    };
    return user;
  }
}
