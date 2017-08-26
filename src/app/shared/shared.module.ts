/**
 * 
 * SharedModule exists to make commonly used components, directives, and pipes available for use in the templates of components in many other modules.
 * 
 * 
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

  ],
  exports : [
    // https://angular.io/guide/ngmodule#re-exporting-other-modules
    CommonModule,
    ReactiveFormsModule
  ]

})
export class SharedModule { }
