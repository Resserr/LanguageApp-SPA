import { Component, OnInit } from "@angular/core";
import { ChatService } from "../_services/chat.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../_services/auth.service";
@Component({
  selector: "app-messanging",
  templateUrl: "./messanging.component.html",
  styleUrls: ["./messanging.component.css"]
})
export class MessangingComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;

  constructor(
    public cs: ChatService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get("id");
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source);
  }
  submit(chatId){
    this.cs.sendMessage(chatId, this.newMsg)
    this.newMsg = "";
  }
  trackByCreated(i, msg){
    return msg.createdAt;
  }
}
