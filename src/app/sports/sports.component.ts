import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit {

  addSportForm: FormGroup;

  sportSelected: boolean = false;

  noMens: boolean;
  noWomens: boolean;

  // master list of Sports, we use this to propagate the " + Add new Sport " component.
  genericSports: FirebaseListObservable<any>;
  userSports: FirebaseListObservable<any>;

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder
  ) {
    this.userSports = this._afDb.list(`userSports/${this._afAuth.auth.currentUser.uid}`);
    this.genericSports = this._afDb.list(`sports/`);

    this.buildAddSportForm();
   }

  ngOnInit() {
  }

  buildAddSportForm() {
    this.addSportForm = this._fb.group({
      sport: [''],
      mens: [],
      womens: []
    })
  }

  addSport() {

  }

}
