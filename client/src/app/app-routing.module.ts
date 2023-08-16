import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { ProfileEditFormComponent } from './components/profile-edit-form/profile-edit-form.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';


const routes: Routes = [
  {path: '', component : HomeComponent},
  {path: 'login', component : LoginComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'post/:id', component : PostComponent},
  {path: 'category/:id', component : CategoryComponent},
  {path: 'create-post', component : PostFormComponent, canActivate : [authGuard]},
  {path: 'edit-post/:id', component : PostFormComponent, canActivate : [authGuard]},
  {path: 'author/:id', component : AuthorPageComponent},
  {path: 'blog', component : BlogPageComponent},
  {path: 'profile', component : ProfileComponent, canActivate : [authGuard]},
  {path: 'profile/edit', component: ProfileEditFormComponent, canActivate : [authGuard]},
  {path: 'search', component: SearchResultsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
