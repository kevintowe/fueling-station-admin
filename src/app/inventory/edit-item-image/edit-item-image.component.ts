import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { InventoryService } from '../inventory.service';

import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';

@Component({
  selector: 'app-edit-item-image',
  templateUrl: './edit-item-image.component.html',
  styleUrls: ['./edit-item-image.component.css']
})
export class EditItemImageComponent {

  imageToDisplay: boolean;
  itemSelected: boolean;

  currentImage;

  loading: boolean;

  calculatedImageName: string;

  _itemId: string = '';

  maximumFileSizeInBytes: number = 1e+6;

  @ViewChild('imageElementRef') imageElementRef: ElementRef;

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder,
    private _inventoryService: InventoryService
  ) {
    this.imageToDisplay = false;

    this._inventoryService.imageLoading$.subscribe( value => {
      this.itemSelected = true;
      this.loading = value;
    });

    this._inventoryService.image$.subscribe( value => {
      console.log('value is: ' + value);
      console.dir(value);
      this.loading = false;
      this.currentImage = value;
    });
  }

  deleteImage() {
    this.imageToDisplay = false;
    this.calculatedImageName = '';
    if (this.deleteImage) {
      return firebase.storage().ref(`images/inventory/${this._itemId}.png`).delete().then( _ => {
        // success
      }, error => {
        // hhhmmdmmmmmm
      })
    }
  }


  // File being dragged has moved into the drop region
  private dragFileOverStart() {
  }
 
  // File being dragged has moved out of the drop region
  private dragFileOverEnd() {
  }
 
  // File being dragged has been dropped and is valid
  private dragFileAccepted(acceptedFile: Ng2FileDropAcceptedFile) {
     // Load the image in
     let fileReader = new FileReader();
     fileReader.onload = () => {

        // Set and show the image
        this.currentImage = fileReader.result;
        this.imageToDisplay = true;
        this.calculatedImageName = `images/inventory/${this._itemId}.png`;
     };

     // Read in the file
     fileReader.readAsDataURL(acceptedFile.file);
  }
 
  // File being dragged has been dropped and has been rejected
  private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
  }
 


}
