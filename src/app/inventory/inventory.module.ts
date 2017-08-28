import { NgModule } from '@angular/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

// import {MdProgressSpinnerModule} from '@angular/material';

import { SharedModule } from '../shared/shared.module';

import { InventoryRoutingModule } from './inventory-routing.module';

import { InventoryService } from './inventory.service';

import { EditItemComponent } from './edit-item/edit-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AllInventoryComponent } from './all-inventory/all-inventory.component';
import { InventoryComponent } from './inventory.component';
import { EditItemImageComponent } from './edit-item-image/edit-item-image.component';

import { Ng2FileDropModule }  from 'ng2-file-drop';

@NgModule({
  imports: [
    SharedModule,
    InventoryRoutingModule,
    AngularMaterialModule,
    // Ng2FileDropModule
    // MdProgressSpinnerModule
  ],
  declarations: [
    EditItemComponent,
    AddItemComponent,
    AllInventoryComponent,
    InventoryComponent,
    EditItemImageComponent
  ],
  exports: [
    InventoryComponent
  ],
  providers: [
    InventoryService
  ]
})
export class InventoryModule {}