import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { LoginStatusGuard } from './login-status.guard'; // <-- check authentication status, returns boolean

import { HomePageComponent } from './home-page/home-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SportsComponent } from './sports/sports.component';
import { TabsComponent } from './tabs/tabs.component';
import { AccountInfoComponent } from './account-info/account-info.component';

import { AddSportComponent } from './add-sport/add-sport.component';

 
const appRoutes: Routes = [
  { path: '', component: HomePageComponent, canActivate:[LoginStatusGuard]},
  { path: 'home', component: HomePageComponent, canActivate:[LoginStatusGuard] },
  { path: 'landing', component: LandingPageComponent, canActivate:[LoginStatusGuard] },
  { path: 'sports', component: SportsComponent, canActivate:[LoginStatusGuard] },
  { path: 'add-sport', component: AddSportComponent, canActivate:[LoginStatusGuard] },
  { path: 'inventory', loadChildren: 'app/inventory/inventory.module#InventoryModule' },
  { path: 'vendors', loadChildren: 'app/vendors/vendors.module#VendorsModule'},
  { path: 'tabs', component: TabsComponent, canActivate:[LoginStatusGuard] },
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

