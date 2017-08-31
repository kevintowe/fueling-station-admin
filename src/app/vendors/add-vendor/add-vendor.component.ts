import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent {

  newVendorForm: FormGroup;

  constructor(
    private _afDb: AngularFireDatabase,
    private _fb: FormBuilder,
  ) {
    this.buildNewVendorForm();
  }

  
  buildNewVendorForm() {
    this.newVendorForm = this._fb.group({
      name: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.newVendorForm.invalid) {
      // form invalid
    } else {
      // check if the vendor already exist (the name)
      if (this.doesVendorExist(this.newVendorForm.value.name) === false) {
        this._afDb.list(`vendors`).push({
          name: this.newVendorForm.value.name
        }).then( _ => {
          this.resetComponent();
        }, error => {
          // handle the error.
        })
      } else {
        // inform the user that the vendor name is already in use.
      }
    }
  }


  //  returns false if the vendor name does not already exists underneath `vendors/${vendorPushId}/name
  doesVendorExist(name: string) {
    // TODO check this.
    this._afDb.list(`vendors`, {
      query: {
        orderByChild: 'name',
        equalTo: name
      }
    }).subscribe( value => {
      // console.log('value of value is: ' + value);
      // console.dir(value);
    })

    return false;
  }


  resetComponent() {
    this.newVendorForm.reset();
  }


}
