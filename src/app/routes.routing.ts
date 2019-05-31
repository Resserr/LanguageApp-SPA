import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profileEdit/profileEdit.component';
import { ProfileEditResolver } from './_resolvers/profileEdit.resolver';
import { ArticleComponent } from "./article/article.component";
import { MessagingComponent } from './messaging/messaging.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/edit', component: ProfileEditComponent, resolve: { user : ProfileEditResolver } },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'messaging', component: MessagingComponent },
  { path: 'about', component: AboutComponent },
  { path: "article/:key", component: ArticleComponent },
];
