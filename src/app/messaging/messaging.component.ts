import { Component, OnInit } from "@angular/core";
import { MessagingService } from "./messaging.service";

@Component({
  selector: "app-messaging",
  templateUrl: "./messaging.component.html",
  styleUrls: ["./messaging.component.css"]
})
export class MessagingComponent implements OnInit {
  message;
  constructor(private messagingService: MessagingService) {}

  ngOnInit() {
    const userId = "user001";
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
