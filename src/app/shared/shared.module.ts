/**
 * 
 * SharedModule exists to make commonly used components, directives, and pipes available for use in the templates of components in many other modules.
 * 
 * 
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Ng2FileDropModule }  from 'ng2-file-drop';

@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [

  ],
  exports : [
    // https://angular.io/guide/ngmodule#re-exporting-other-modules
    CommonModule,
    ReactiveFormsModule,
    Ng2FileDropModule
  ]

})
export class SharedModule { }
