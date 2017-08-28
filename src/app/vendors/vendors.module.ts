import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { SharedModule } from '../shared/shared.module';

import { VendorsRoutingModule } from './vendors-routing.module';

import { VendorService } from './vendor.service';

import { VendorsComponent } from './vendors/vendors.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { AllVendorsComponent } from './all-vendors/all-vendors.component';
import { EditVendorInfoComponent } from './edit-vendor-info/edit-vendor-info.component';

@NgModule({
  imports: [
    SharedModule,
    AngularMaterialModule,
    VendorsRoutingModule
  ],
  declarations: [
    VendorsComponent,
    AddVendorComponent,
    AllVendorsComponent,
    EditVendorInfoComponent
  ],
  exports: [
    VendorsComponent
  ], 
  providers: [
    VendorService
  ]
})
export class VendorsModule { }
