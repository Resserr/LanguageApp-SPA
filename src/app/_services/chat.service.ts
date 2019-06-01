import { Injectable } from "@angular/core";
import { Observable, of, combineLatest } from "rxjs";
import { UserService } from "../_services/user.service";
import * as firebase from "firebase/app";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  user: Observable<any>;
  constructor(
    private afs: AngularFirestore,
    private authUser: UserService,
    private router: Router
  ) {}

  get(chatId) {
    return this.afs
      .collection<any>("chats")
      .doc("Ky9gdw5lUW4si6v3Nr8F")
      .snapshotChanges()
      .pipe(
        map(doc => {
          console.log({id: doc.payload.id, ...doc.payload.data()});
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }
  async create() {
    const { uid } = await this.authUser.getUserForChat();
    console.log("value id in chat" + uid);

    const data = {
      uid,
      createdAt: Date.now(),
      count: 0,
      messages: []
    };
    const docRef = await this.afs.collection("chats").add(data);
    return this.router.navigate(["messager", docRef.id]);
  }
  async sendMessage(chatId, content) {
    const { uid } = await this.authUser.getUserForChat();

    const data = {
      uid,
      content,
      createdAt: Date.now()
    };
    if (uid) {
      const ref = this.afs.collection("chats").doc(chatId);

      return ref.update({
        messages: firebase.firestore.FieldValue.arrayUnion(data)
      });
    }
  }
  joinUsers(chat$: Observable<any>) {
    let chat;
    const joinKeys = {};
    return chat$.pipe(
      switchMap(c => {
        //Unique User IDS
        chat = c;
        console.log("chat" , c);
        const uids = Array.from(new Set(c.messages.map(v => v.uid)));
        //Firestore User Doc Reads
        const userDocs = uids.map(u =>
          this.afs.doc(`Users/${u}`).valueChanges()
        );
        console.log(userDocs)
        return userDocs.length ? combineLatest(userDocs) : of([]);
      }),
      map(arr => {
        arr.forEach(v => (joinKeys[(<any>v).uid] = v));
        chat.messages = chat.messages.map(v => {
          return { ...v, user: joinKeys[v.uid] };
        });
        return chat;
      })
    );
  }
}
