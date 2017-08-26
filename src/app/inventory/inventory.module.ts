import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { InventoryRoutingModule } from './inventory-routing.module';

import { InventoryService } from './inventory.service';

import { EditItemComponent } from './edit-item/edit-item.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AllInventoryComponent } from './all-inventory/all-inventory.component';
import { InventoryComponent } from './inventory.component';

@NgModule({
  imports: [
    SharedModule,
    InventoryRoutingModule
  ],
  declarations: [
    EditItemComponent,
    AddItemComponent,
    AllInventoryComponent,
    InventoryComponent
  ]
})
export class InventoryModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InventoryModule,
      providers: [
        InventoryService
      ]
    }
  }

}
