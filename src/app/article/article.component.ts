import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore/firestore";
import { Subscription } from "rxjs";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  key: string;
  title: String;
  content_1: String;
  content_2: String;
  img: string;

  constructor(
    private afs: AngularFirestore,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(v => {
      this.afs
        .doc("Article/" + v.key)
        .get()
        .subscribe(ds => {
          console.log(ds.data());
          this.title = ds.get("title");
          console.log(this.title);
        });
      this.activateRoute.params.subscribe(v => {
        this.afs
          .doc("Article/" + v.key)
          .get()
          .subscribe(ds => {
            console.log(ds.data());
            this.content_1 = ds.get("content_1");
            console.log(this.content_1);
          });
      });
      this.activateRoute.params.subscribe(v => {
        this.afs
          .doc("Article/" + v.key)
          .get()
          .subscribe(ds => {
            console.log(ds.data());
            this.content_2 = ds.get("content_2");
            console.log(this.content_1);
          });
      });
      this.activateRoute.params.subscribe(v => {
        this.afs
          .doc("Article/" + v.key)
          .get()
          .subscribe(ds => {
            console.log(ds.data());
            this.img = ds.get("img");
            console.log(this.content_1);
          });
      });
    });
  }
}
