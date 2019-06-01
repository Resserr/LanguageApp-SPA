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

  addLike(docId: string, userId: string, isLiked: boolean): Observable<any> {
    return from(this.collection.doc(docId).update({
      'user_id': userId,
      'isLiked': isLiked
    }));
  }

  getAllLikes(docId: string): Observable<Like[]> {
    return this.collection.doc(docId).get().pipe(map(data => {
      data.
    }));
  }

  getAllDislikes() {
    return from(this.collection.ref.where('isLiked', '==', false).get()).pipe(map(data => data.docs.length));
  }

  createUserLike(docId: string): Observable<any> {
    return from(this.collection.doc(docId).set({}));
  }

  isExist(docId: string): Observable<boolean> {
    return this.collection.doc(docId).get().pipe(map(data => data.exists ));
  }

}
