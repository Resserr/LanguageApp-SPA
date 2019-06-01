import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Like } from '../_models/Like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private collection: AngularFirestoreCollection<{}>;
  constructor(private firestore: AngularFirestore) {
    this.collection = this.firestore.collection('Likes');
  }

  addLike(docId: string, userId: string, isLiked: boolean): Observable<void> {
    return from(this.collection.doc(docId).collection('Users').doc(userId).set({
      'isLiked': isLiked
    }));
  }
  deleteLike(docLikeId: string, docUserId: string): Observable<void> {
    return from(this.collection.doc(docLikeId).collection('Users').doc(docUserId).delete());
  }

  userExist(docLikeId: string, docUserId: string): Observable<boolean> {
    return this.collection.doc(docLikeId).collection('Users').doc(docUserId).get().pipe(map( data => data.exists));
  }
}
