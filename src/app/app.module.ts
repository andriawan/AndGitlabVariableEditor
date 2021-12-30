import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ButtonPrimaryComponent } from './components/button-primary/button-primary.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchRepositoryComponent } from './components/search-repository/search-repository.component';
import { InputPrimaryComponent } from './components/input-primary/input-primary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingleVarGitlabComponent } from './components/single-var-gitlab/single-var-gitlab.component';
import { ApiInterceptor } from './utils/api-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingPageComponent,
    DashboardComponent,
    ButtonPrimaryComponent,
    SearchRepositoryComponent,
    InputPrimaryComponent,
    SingleVarGitlabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
