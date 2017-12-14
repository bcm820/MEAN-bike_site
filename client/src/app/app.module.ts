import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { SplashComponent } from './components/splash/splash.component';
import { LoginComponent } from './components/splash/login/login.component';
import { RegistrationComponent } from './components/splash/registration/registration.component';
import { RandomComponent } from './components/splash/random/random.component';

import { BrowseComponent } from './components/browse/browse.component';
import { BikeComponent } from './components/browse/bike/bike.component';

import { ListingsComponent } from './components/listings/listings.component';
import { CreateComponent } from './components/listings/create/create.component';
import { EditComponent } from './components/listings/edit/edit.component';

import { AuthService } from './services/auth.service';
import { BikeService } from './services/bike.service';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    BrowseComponent,
    ListingsComponent,
    LoginComponent,
    RegistrationComponent,
    RandomComponent,
    BikeComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, BikeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
