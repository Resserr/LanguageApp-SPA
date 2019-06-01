import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Language } from '../_models/Language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private firestore: AngularFirestore) {}

  getAllLanguages(): Observable<any> {
    const list: Language[] = [];
    console.log('wad');
    return this.firestore.collection('Languages').get().pipe(map(data => {
      data.docs.forEach((value) => list.push(value.data() as Language));
      return list;
    }));
  }
}
