import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';  // <-- #1 import module

import { MdMenuModule, MdButtonToggleModule, MdGridListModule, MdInputModule, MdTabsModule, MdProgressSpinnerModule, MdDialogModule } from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import 'hammerjs';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginErrorComponent } from './login-error/login-error.component';

import { AuthService } from './auth.service';
import { LoginStatusGuard } from './login-status.guard';
import { SportsComponent } from './sports/sports.component';
import { ItemsComponent } from './items/items.component';
import { TabsComponent } from './tabs/tabs.component';
import { AccountInfoComponent } from './account-info/account-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomePageComponent,
    LoginErrorComponent,
    SportsComponent,
    ItemsComponent,
    TabsComponent,
    AccountInfoComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MdMenuModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdDialogModule,
    MdTabsModule,
    MdGridListModule,
    MdButtonToggleModule
  ],
  entryComponents: [
    LoginErrorComponent
  ],
  providers: [
    AuthService,
    LoginStatusGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
