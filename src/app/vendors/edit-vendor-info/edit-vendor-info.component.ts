import { any } from 'codelyzer/util/function';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { VendorService } from '../vendor.service';


@Component({
  selector: 'app-edit-vendor-info',
  templateUrl: './edit-vendor-info.component.html',
  styleUrls: ['./edit-vendor-info.component.css']
})
export class EditVendorInfoComponent {

  public isLoading: boolean;
  public vendorSelected: boolean;
  public editing: boolean;

  editVendorForm: FormGroup;

  // TODO, find a better way than this. Maybe just save the vendor in the service.
  currentVendorId;


  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder,
    private _vendorService: VendorService
  ) {
    this.buildEditVendorForm();

    this._vendorService.vendorInfoLoading$.subscribe( value => {
      this.vendorSelected = value;
      this.isLoading = value;
    });


    this._vendorService.currentVendor$.subscribe( snapshot => {
      this.editVendorForm.reset();
      let value = snapshot.val();
      this.isLoading = false;
      this.editVendorForm.disable();

      this.currentVendorId = snapshot.key;
      console.log(snapshot.key);

      this.editVendorForm.controls['name'].setValue(value.name);
      this.editVendorForm.controls['email'].setValue(value.email);
      this.editVendorForm.controls['phoneNumber'].setValue(value.phoneNumber);
      this.editVendorForm.controls['vendor'].setValue(value.vendor);
    });
  }

  editVendor() {
    this.editing = true;
    this.editVendorForm.enable();
  }


  buildEditVendorForm() {
    this.editVendorForm = this._fb.group({
      name: [Validators.required],
      email: [],
      phoneNumber: [],
      website: [],
    });
  }


  save() {
    if (this.editVendorForm.invalid) {
      // inform user of an error
    } else {
      let vendorRef = this._afDb.object(`vendors/${this.currentVendorId}`);
      let formRef = this.editVendorForm;
      let toWrite: any = {};

      if (!this.editVendorForm.pristine) {
        if (!formRef.controls['name'].pristine) {
          // vendorRef.update({name: formRef.value.name});
          toWrite.name = formRef.value.name;
        }
        if (!formRef.controls['email'].pristine) {
          // vendorRef.update({email: formRef.value.email});
          toWrite.email = formRef.value.email;
        }
        if (!formRef.controls['phoneNumber'].pristine) {
          // vendorRef.update({phoneNumber: formRef.value.phoneNumber});
          toWrite.phoneNumber = formRef.value.phoneNumber;
        }
        // now make the database write
        this._afDb.object(`vendors/${this.currentVendorId}`).update(toWrite);

        // TODO, re format the above flow so that these two actions run once all possible database wrties have finished.
        this.editing = false;
        this.editVendorForm.disable();
      }
    }
  }


  dismiss() {
    this.editing = false;
    this.editVendorForm.disable();
  }


  delete() {
    this._afDb.object(`vendors/${this.currentVendorId}`).remove().then( snapshot => {
      this.editing = false;
      this.editVendorForm.disable();
    });
  }


}
