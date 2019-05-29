import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule, Router } from '@angular/router';

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
import { ArticleComponent } from './article/article.component';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';

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
      ArticleComponent,
      
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(routes),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      BsDropdownModule.forRoot()

   ],
   providers: [
      AuthService,
      AlertifyService,
      AngularFirestore
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
