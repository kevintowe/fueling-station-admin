import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { LoginStatusGuard } from './login-status.guard';
 
// import { CrisisListComponent }   from './crisis-list.component';
// import { HeroListComponent }     from './hero-list.component';
// import { PageNotFoundComponent } from './not-found.component';

import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ItemsComponent } from './items/items.component';
import { SportsComponent } from './sports/sports.component';
import { TabsComponent } from './tabs/tabs.component';
import { AccountInfoComponent } from './account-info/account-info.component';

import { AddSportComponent } from './add-sport/add-sport.component';

 
const appRoutes: Routes = [
  { path: '', component: HomePageComponent, canActivate:[LoginStatusGuard]},
  { path: 'landing', component: LandingPageComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'add-sport', component: AddSportComponent},
  { path: 'items', component: ItemsComponent },
  { path: 'tabs', component: TabsComponent },
  { path: 'account-info', component: AccountInfoComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full'},
  { path: '**', component: LandingPageComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}