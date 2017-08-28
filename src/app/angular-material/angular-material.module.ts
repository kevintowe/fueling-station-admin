import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdMenuModule, MdCheckboxModule, MdListModule, MdSelectModule, MdButtonToggleModule, 
  MdGridListModule, MdInputModule, MdTabsModule, MdProgressSpinnerModule, 
  MdDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    MdMenuModule, MdCheckboxModule, MdListModule, MdSelectModule, MdButtonToggleModule, MdGridListModule,
      MdInputModule, MdTabsModule, MdProgressSpinnerModule, MdDialogModule
  ]
})
export class AngularMaterialModule { }
