import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { NewsComponent } from "./news/news.component";
import { ArticleComponent } from "./article/article.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "news", component: NewsComponent },
  { path: "article/:key", component: ArticleComponent }
];
