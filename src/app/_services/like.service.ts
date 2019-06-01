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
    return from(this.collection.doc(docId).collection('Users').doc(userId).update({
      'isLiked': isLiked
    }));
  }

  getAllLikes(docId: string): Observable<number> {
    return from(this.collection.doc(docId).collection('Users').ref.where('isLiked', '==', true).get()).pipe(map( data => {
      return data.docs.length;
    }));
  }

  getAllDislikes(docId: string): Observable<number> {
    return from(this.collection.doc(docId).collection('Users').ref.where('isLiked', '==', false).get()).pipe(map( data => {
      return data.docs.length;
    }));
  }

  // createUserLike(docId: string): Observable<any> {
  //   return from(this.collection.doc(docId).set({}));
  // }

  isExist(docId: string): Observable<boolean> {
    return this.collection.doc(docId).get().pipe(map(data => data.exists ));
  }

}
