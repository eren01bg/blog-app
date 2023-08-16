import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { CategoryComponent } from './components/category/category.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeaturedPostComponent } from './components/featured-post/featured-post.component';
import { PostsGridComponent } from './components/posts-grid/posts-grid.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';
import { BlogPageComponent } from './components/blog-page/blog-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditFormComponent } from './components/profile-edit-form/profile-edit-form.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    CategoryComponent,
    PostFormComponent,
    HeaderComponent,
    FooterComponent,
    FeaturedPostComponent,
    PostsGridComponent,
    AuthorPageComponent,
    BlogPageComponent,
    ProfileComponent,
    ProfileEditFormComponent,
    SearchComponent,
    SearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
