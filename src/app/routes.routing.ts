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
import { ProfileEditLangResolver } from './_resolvers/profileEdit-lang.resolver';
import { FiendFriendsComponent } from './fiend-friends/fiend-friends.component';
import { MemberResolver } from './_resolvers/members.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'members', component: FiendFriendsComponent, resolve: {users : MemberResolver} },
      { path: 'profile/edit', component: ProfileEditComponent, resolve: { user : ProfileEditResolver,
         languages: ProfileEditLangResolver } },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
];
