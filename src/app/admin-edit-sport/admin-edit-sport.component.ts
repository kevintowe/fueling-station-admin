import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Ng2FileDropAcceptedFile, Ng2FileDropRejectedFile }  from 'ng2-file-drop';

@Component({
  selector: 'app-admin-edit-sport',
  templateUrl: './admin-edit-sport.component.html',
  styleUrls: ['./admin-edit-sport.component.css']
})
export class AdminEditSportComponent implements OnInit {

  // 'Sport Push Id' input binding. When a user selects a sport from the 'AllSports' component, we receive the pushId of that sport here.
  @Input()
  set sportId(sportId: string) {
    // console.log('the @input sport id is : " ' + sportId)
    if (sportId === undefined || null || '') {
      console.log('sportId is null');
      return;
    } else {
      // we start by resetting everything.
      this.resetComponent();
      // we might look into making sure all the data has been fetched(name and possibly image) before setting this to true;
      this.sportSelected = true;
      // take the @Input sportId and apply it to _sportId.
      this._sportId = sportId;
      // console.log('_sportId is now: ' + this._sportId);
      // Take a snapshot of the sport DB ref. We use this snap to get the sport name and determine if there is an image.
      this._afDb.object(`sports/${this._sportId}`, {preserveSnapshot: true})
      .subscribe( snapshot => {
        let value = snapshot.val();
        // every sport has to have a name so we just set it and don't perform any checks.
        this.currentSportName = value.name;
        console.log('currentSportName: ' + this.currentSportName);
        // The sport image might not exist yet, so we need to determine if it does.
        if (value.hasImage === undefined){
          console.log("Image is: || " + value.image + " || lets display the 'drop image here' component");
          this.hasImage = false;
          this.imageToDisplay = false;
        } else {
          // there IS an image, lets fetch the image and display it.
          firebase.storage().ref().child(`images/${this._sportId}.png`).getDownloadURL().then( url => {
            this.currentProfileImage = url;
          }).then( _ => {
            this.calculatedImageName = `images/${this._sportId}`;
            this.imageToDisplay = true;
          });
        }
      });
    }
  }

  @ViewChild('sportImageElementRef') imageElementRef: ElementRef;


  // the form group we will work with.
  editSportForm: FormGroup;
  
  // boolean that gets set when a sport is selected. We use this in the 'deleteImage()' function, to know if we need to delete an image from cloud storage.
  hasImage: boolean;
  // wheather or not we should currently be displaying an image or the 'drag image here' component.
  imageToDisplay: boolean;
  // not sure about this.
  currentProfileImage: string;
  // we define the maximum file size a user can upload. Maybe this should go inside an interface.
  maximumFileSizeInBytes: number = 1e+6;

  // how we will store the image in cloud storage.
  calculatedImageName: string = '';
 
  get name(): string { return this._sportId; }

  // we desiginate this as private with the underscore(' _ ') to differentiate between the sportId input binding.
  _sportId;

  sportRef$: FirebaseObjectObservable<any>;

  // I think if we dynamically created the form each time we wouldn't have to have these, but that might be more work than is worth it.
  currentSportName;
  currentSportImage;

  // only true when editing a sport.
  sportSelected: boolean;

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder
  ) {
    this.buildEditSportForm();

    this.imageToDisplay = false;

    // by default there is no item selected;
    this.sportSelected = false;
    this._sportId = "";
  }

  ngOnInit() {
  }

  buildEditSportForm() {
    this.editSportForm = this._fb.group({
      name: [this.currentSportName],
      imageName: []
    })
  }

  // resets the component
  resetComponent(): boolean {
    this.editSportForm.reset();
    this.sportSelected = false;
    this.currentSportName = '';
    this.calculatedImageName = '';
    return true;
  }

  saveSport() {
    if (this.editSportForm.invalid) {
      // from invalid
      console.log('form invalid');
    } else {
      let sportRef$ = this._afDb.object(`sports/${this._sportId}`);
      // start with uploading the image.
      if (this.imageToDisplay) {
        console.log('there is an image to display, and were trying to save it');
        console.log('calculatedImageName: ' + this.calculatedImageName);
        let storageRef = firebase.storage().ref().child(this.calculatedImageName);
        console.log('currentProfileImage: ' + this.currentProfileImage);
        storageRef.putString(this.currentProfileImage, 'data_url').then( snapshot => {
          console.log('The file was uploaded');
          // specifiy inside the database that this sport has an image.
        }, error => {
          console.log('looks like there was an error');
        }).then( _ => {
          console.log('the form value is: ' + this.editSportForm.value.name);
          sportRef$.update({name: this.currentSportName, hasImage: true});
        }).then( _ => {
          this.resetComponent();
        })
      } else {
        // no image, just save the name.
        sportRef$.set({name: this.currentSportName}).then( _ => {
          this.resetComponent();
        })
      }
    }
  }

  dismissSport() {
    this.resetComponent();
  }

  deleteSport() {
    this._afDb.object(`sports/${this._sportId}`).remove().then( _ => {
      // if the sport has an image, delete it as well.
      if (this.hasImage){
        firebase.storage().ref().child(`images/${this._sportId}.png`).delete();
      }
      this.resetComponent();
    });
  }

  deleteImage() {
    this.imageToDisplay = false;
    this.calculatedImageName = '';
    // if the image exists in cloud storage, delete it.
    if (this.deleteImage) {
      firebase.storage().ref().child(`images/${this._sportId}.png`).delete().then( _ => {
        // successfully deleted the image
      }, error => {
        // hmmmm
      });
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
         this.currentProfileImage = fileReader.result;
         this.imageToDisplay = true;
         this.calculatedImageName = `images/${this._sportId}.png`;
     };

     // Read in the file
     fileReader.readAsDataURL(acceptedFile.file);
  }
 
  // File being dragged has been dropped and has been rejected
  private dragFileRejected(rejectedFile: Ng2FileDropRejectedFile) {
  }
 
}
