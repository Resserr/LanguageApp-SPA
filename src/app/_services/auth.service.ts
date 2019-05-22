import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private authService: AngularFireAuth) {}
  private jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: any;

  public register(email: string, password: string): Promise<object> {
    return this.authService.auth.createUserWithEmailAndPassword(
      email,
      password
    );
  }

  public loginWithEmail(email: string, password: string) {
    return this.getObservableAndSetToken(
      this.authService.auth.signInWithEmailAndPassword(email, password)
    );
  }

  public logout() {
    localStorage.removeItem('token');
    return this.authService.auth.signOut();
  }

  public isLogedIn(): boolean {
    return !this.jwtHelper.isTokenExpired(localStorage.getItem('token'));
  }

  public loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.getObservableAndSetToken(
      this.authService.auth.signInWithPopup(provider)
    );
  }

  public loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.getObservableAndSetToken(
      this.authService.auth.signInWithPopup(provider)
    );
  }

  private getObservableAndSetToken(
    promise: Promise<firebase.auth.UserCredential>
  ) {
    return from(promise).pipe(
      map(value => {
        if (value) {
          value.user.getIdToken(true).then(token => {
            localStorage.setItem('token', token);
            this.decodedToken = this.jwtHelper.decodeToken(token);
            console.log(this.decodedToken);
          });
        }
      })
    );
  }
}
