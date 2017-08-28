import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class VendorService {

  /*
  Loading Subscribers(as observables).
  1. We call the next function on whichever vendor is loading.
  2. A component should subscribe to the `${variableName}loading$` observable.
  */
  // Item info loading observable and Subject
  private _vendorInfoLoading = new ReplaySubject<boolean>(1);
  vendorInfoLoading$ = this._vendorInfoLoading.asObservable();

  /*
   Vendor database snapshot value. 
   emits==>> _angularfireDatabase.object(`vendors/${itemPushId}`, {preserveSnapshot: true}).subscribe(snapshot => return snapshot)
    1. We call the next function on whichever vendor is loading.
    2. A component should subscribe to the `${variableName}loading$` observable.
  */
  private _currentVendor = new ReplaySubject<any>(1);
  currentVendor$ = this._currentVendor.asObservable();

  // firsbase storage reference for use to reference without typing so much in the rest of the file.
  storageRef = firebase.storage().ref('images/');



  constructor(
    private _afDb: AngularFireDatabase
  ) { }

  newItemSelected(vendorPushId: string) {
    // emit true for all loading<boolean> Subjects.
    this.newItemLoading();
    // fetch the image
    // this.fetchImage(itemPushId);
    // fetch the data
    this.fetchItemSnapshot(vendorPushId);
  }

  // we group together all of the loading observables so we can easily toggle all of them at once.
  newItemLoading() {
    this._vendorInfoLoading.next(true);
  }

  // Subsribe to the item snapshot, when the snapshot returns we call .next() on the apporpriate observable
  fetchItemSnapshot(vendorPushId: string) {
    let itemRef$ = this._afDb.object(`vendors/${vendorPushId}`, {preserveSnapshot: true});
    itemRef$.map( snapshot => {
      this._currentVendor.next(snapshot);
    }).subscribe();
  }

}
