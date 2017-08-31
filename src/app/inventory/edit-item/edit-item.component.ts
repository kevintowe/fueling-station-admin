import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {

  public vendorList: any = [];

  public itemSelected: boolean;
  public isLoading: boolean;
  public editing: boolean;

  // define the formGroup
  editItemForm: FormGroup;

  // TODO, find a better way than this. Maybe just save the vendor in the service.
  currentItemId;

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder,
    private _inventoryService: InventoryService
  ) {
    this.buildEditItemForm();

    this.vendorList = this._inventoryService.vendorList;

    this._inventoryService.itemInfoLoading$.subscribe( value => {
      this.itemSelected = value;
      this.isLoading = value;
    });

    this._inventoryService.currentItem$.subscribe( snapshot => {
      this.editItemForm.reset();
      let value = snapshot.val();
      this.isLoading = false;
      this.editItemForm.disable();

      this.currentItemId = snapshot.key;
      
      this.editItemForm.controls['name'].setValue(value.name);
      this.editItemForm.controls['currentQuantity'].setValue(value.currentQuantity);
      this.editItemForm.controls['restockingQuantity'].setValue(value.restockingQuantity);
      this.editItemForm.controls['vendor'].setValue(value.vendor);

      // console.log('value of current item is: ' + value);
      // console.dir(value);
    });

   }

   editItem() {
     this.editing = true;
     this.editItemForm.enable();
   }

   buildEditItemForm() {
     this.editItemForm = this._fb.group({
       name: [],
       vendor: [],
       currentQuantity: [],
       restockingQuantity: []
     });
   }

  save() {
    if (this.editItemForm.invalid) {
      // inform user of an error
    } else {
      let itemRef = this._afDb.object(`inventoryItems/${this.currentItemId}`);
      let formRef = this.editItemForm;
      let toWrite: any = {};

      if (!this.editItemForm.pristine) {
        if (!formRef.controls['name'].pristine) {
          toWrite.name = formRef.value.name;
        }
        if (!formRef.controls['vendor'].pristine) {
          toWrite.vendor = formRef.value.vendor;
        }
        if (!formRef.controls['currentQuantity'].pristine) {
          toWrite.currentQuantity = formRef.value.currentQuantity;
        }
        if (!formRef.controls['restockingQuantity'].pristine) {
          toWrite.restockingQuantity = formRef.value.restockingQuantity;
        }
        // now make the database write
        this._afDb.object(`inventoryItems/${this.currentItemId}`).update(toWrite);

        // TODO, re format the above flow so that these two actions run once all possible database wrties have finished.
        this.editing = false;
        this.editItemForm.disable();
      }
    }
  }


  dismiss() {
    this.editing = false;
    this.editItemForm.disable();
  }


  delete() {
    this._afDb.object(`inventoryItems/${this.currentItemId}`).remove().then( snapshot => {
      this.editing = false;
      this.editItemForm.disable();
    });
  }


}
