import { Error } from 'tslint/lib/error';
import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  editing: boolean;

  toggleText: string = "Edit"

  currentSchoolName: string = "";

  accountInfoForm: FormGroup;

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder
  ) {
    this.buildAccountInfoForm();
    this.editing = false;
    this.accountInfoForm.get('schoolName').disable();
  }

  ngOnInit() {
  }

  buildAccountInfoForm() {
    this.accountInfoForm = this._fb.group({
      schoolName: ['',]
    })
  }

  edit() {
    const inputCtrl = this.accountInfoForm.get('schoolName');
    inputCtrl.enable();
    this.editing = true;
  }

  save() {
    const inputCtrl = this.accountInfoForm.get('schoolName');
    if (this.accountInfoForm.invalid) {
      // The form was invaild, maybe we should inform the user.
    } else {
      // the form was valid.
      // Now we need to save the information to the databse.

      inputCtrl.disable();
      this.editing = false;

      // this._afDb.object(`users/${this._afAuth.auth.currentUser.uid}`).update({
      //   schoolName: this.accountInfoForm.value.schoolName
      // }).then( snapshot => {

      // }, error => {
      //   console.log('somethings wrong in account info: ' + 'error.name' + error.name + ' | ' + 'error.message: ' + error.message);
      // })
    }
  }

  toggleChanged() {

  }
}
