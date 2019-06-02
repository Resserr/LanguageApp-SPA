import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/User';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DislikeService {
  private docCurrentUserId: string;
  private collection: AngularFirestoreCollection<{}>;
  constructor(private firestore: AngularFirestore, private userService: UserService, private authService: AuthService) {
    this.docCurrentUserId = authService.decodedToken.user_id;
    this.collection = this.firestore.collection('Dislikes');
  }

  addDislike(user: User, isLiked: boolean): void {
    from(this.collection.doc(user.id).collection('Users').doc(this.docCurrentUserId).set({'isDisliked': isLiked })).subscribe(() => {
      this.getDislikeCount(user.id).subscribe( dislikesCount => {
        user.dislikes = dislikesCount;
        this.userService.modifyUserField(user.id, {dislikes: user.dislikes });
      });
    });
  }
  deleteDislike(user: User): void {
    from(this.collection.doc(user.id).collection('Users').doc(this.docCurrentUserId).delete()).subscribe(() => {
      this.getDislikeCount(user.id).subscribe( dislikesCount => {
        user.dislikes = dislikesCount;
        this.userService.modifyUserField(user.id, {dislikes: user.likes });
      });
    });
  }

  getDislikeCount(docLikeId: string): Observable<number> {
    return this.collection.doc(docLikeId).collection('Users').get().pipe(map( data => data.docs.length));
  }

  userExist(docLikeId: string): Observable<boolean> {
    return this.collection.doc(docLikeId).collection('Users').doc(this.docCurrentUserId).get().pipe(map( data => data.exists));
  }

}
