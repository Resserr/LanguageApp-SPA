import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, switchAll, switchMap, first } from "rxjs/operators";
import { User } from "../_models/User";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { analyzeAndValidateNgModules } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class UserService {
  user$: Observable<any>;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`Users/${user.uid}`).valueChanges();
        } else {
          return (null);
        }
      })
    );
  }

  getUser(id: string): Observable<any> {
    return this.firestore
      .collection("Users")
      .doc(id)
      .get()
      .pipe(map(data => data.data()));
  }
  getUserForChat() {
    return this.user$.pipe(first()).toPromise()
  }

  getAllUsers(): Observable<any> {
    return this.firestore.collection("Users").get();
  }
  setUser(id: string, user: User): Observable<any> {
    return from(
      this.firestore
        .collection("Users")
        .doc(id)
        .set(user)
    );
  }
}
