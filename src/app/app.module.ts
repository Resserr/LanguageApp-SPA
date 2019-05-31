import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { RouterModule, Router } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { routes } from "./routes.routing";
import { FooterComponent } from "./footer/footer.component";
import { AboutComponent } from "./about/about.component";
import { NewsComponent } from "./news/news.component";
import { environment } from "src/environments/environment";
import { AuthService } from "./_services/auth.service";
import { AlertifyService } from "./_services/alertify.service";
import { AuthGuard } from "./_guards/auth.guard";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileEditComponent } from "./profileEdit/profileEdit.component";
import { FiendFriendsComponent } from "./fiend-friends/fiend-friends.component";
import { UserService } from "./_services/user.service";
import { ProfileEditResolver } from "./_resolvers/profileEdit.resolver";
import { ArticleComponent } from "./article/article.component";
import { AngularFirestoreModule } from "@angular/fire/firestore";
// messaging
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { MessagingService } from "../app/messaging/messaging.service";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AsyncPipe } from "../../node_modules/@angular/common";
import { MessagingComponent } from "./messaging/messaging.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    NewsComponent,
    ProfileComponent,
    ProfileEditComponent,
    FiendFriendsComponent,
    ArticleComponent,
    MessagingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    ProfileEditResolver,
    MessagingService,
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
