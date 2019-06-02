import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { routes } from './routes.routing';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profileEdit/profileEdit.component';
import { FiendFriendsComponent } from './fiend-friends/fiend-friends.component';
import { UserService } from './_services/user.service';
import { ProfileEditResolver } from './_resolvers/profileEdit.resolver';
import { ProfileEditLangResolver } from './_resolvers/profileEdit-lang.resolver';
import { LanguageService } from './_services/language.service';
import { UserHelper } from './_helpers/user.helper';
import { MemberResolver } from './_resolvers/member.resolver';
import { MembersResolver } from './_resolvers/members.resolver';
import { LikeService } from './_services/like.service';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MessengerComponent } from './messenger/messenger.component';
import { DislikeService } from './_services/dislike.service';
import { LikeDislikeHelper } from './_helpers/like-dislike.helper';

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
    ContactUsComponent,
    MessengerComponent
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
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB3JRtwW1rFF6vaWIIIestjYyetTzTqrtA'
    })
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    LanguageService,
    ProfileEditResolver,
    ProfileEditLangResolver,
    MemberResolver,
    MembersResolver,
    UserHelper,
    LikeService,
    DislikeService,
    LikeDislikeHelper,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
