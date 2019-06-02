import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/User';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private collection: AngularFirestoreCollection<{}>;
  private docCurrentUserId: string;
  constructor(private firestore: AngularFirestore, private userService: UserService, private authService: AuthService) {
    this.collection = this.firestore.collection('Likes');
    this.docCurrentUserId = this.authService.decodedToken.user_id;
  }

  addLike(user: User, isLiked: boolean): void {
    from(this.collection.doc(user.id).collection('Users').doc(this.docCurrentUserId).set({'isLiked': isLiked })).subscribe(() => {
      this.getLikeCount(user.id).subscribe( likesCount => {
        user.likes = likesCount;
        this.userService.modifyUserField(user.id, {likes: user.likes });
      });
    });
  }
  deleteLike(user: User): void {
    from(this.collection.doc(user.id).collection('Users').doc(this.docCurrentUserId).delete()).subscribe(() => {
      this.getLikeCount(user.id).subscribe( likesCount => {
        user.likes = likesCount;
        this.userService.modifyUserField(user.id, {likes: user.likes });
      });
    });
  }

  getLikeCount(docLikeId: string): Observable<number> {
    return this.collection.doc(docLikeId).collection('Users').get().pipe(map( data => data.docs.length));
  }

  userExist(docLikeId: string): Observable<boolean> {
    return this.collection.doc(docLikeId).collection('Users').doc(this.docCurrentUserId).get().pipe(map( data => data.exists));
  }
}
