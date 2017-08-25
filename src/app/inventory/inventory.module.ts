import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditItemComponent } from './edit-item/edit-item.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EditItemComponent,
    AddItemComponent
  ]
})
export class InventoryModule { }
