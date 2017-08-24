import { FirebaseListFactoryOpts } from 'angularfire2/database/interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.css']
})
export class AddSportComponent implements OnInit {

  selectedSportId;

  addSportForm: FormGroup

  allSports: FirebaseListObservable<any>;


  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder
  ) {
    this.buildAddSportForm();

    this.allSports = _afDb.list('sports');
  }

  ngOnInit() {

  }

  buildAddSportForm() {
    this.addSportForm = this._fb.group({
      name: ['', Validators.required]
    })
  }

  addSport() {
    if (this.addSportForm.invalid) {
      // invalid
      return;
    } else {
      // add sport to databse.
        // first get a new reference
      let newSport = firebase.database().ref('sports').push();
      newSport.set({
        name: this.addSportForm.value.name
      }).then( snapshot => {
        this.addSportForm.reset();
      }, error => {
        // tell user there was an error.
      })
    }
  }

  selectedSport(sport) {
    // update the selected sport variable
    this.selectedSportId = sport.$key
  }

}
