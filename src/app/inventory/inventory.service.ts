import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class InventoryService {

  // create the vendor list within this service.
  public vendorList: any = [];

  /*
    Loading Subscribers(as observables).
    1. We call the next function on whichever item is loading.
    2. A component should subscribe to the `${variableName}loading$` observable.
  */
  // Image loading observable and Subject
  private _imageLoading = new ReplaySubject<boolean>(1);
  imageLoading$ = this._imageLoading.asObservable();

  // Item info loading observable and Subject
  private _itemInfoLoading = new ReplaySubject<boolean>(1);
  itemInfoLoading$ = this._itemInfoLoading.asObservable();

  /*
   Item database snapshot value. 
   emits==>> _angularfireDatabase.object(`inventoryItems/${itemPushId}`, {preserveSnapshot: true}).subscribe(snapshot => return snapshot)
    1. We call the next function on whichever item is loading.
    2. A component should subscribe to the `${variableName}loading$` observable.
  */
  private _currentItemSource = new ReplaySubject<any>(1);
  currentItem$ = this._currentItemSource.asObservable();

  /*
   Image. 
   emits==>> _angularfireDatabase.object(`inventoryItems/${itemPushId}`, {preserveSnapshot: true}).subscribe(snapshot => return snapshot)
    1. We call the next function on whichever item is loading.
    2. A component should subscribe to the `${variableName}loading$` observable.
  */
  private _image = new ReplaySubject(1);
  image$ = this._image.asObservable();

  // firsbase storage reference for use to reference without typing so much in the rest of the file.
  storageRef = firebase.storage().ref('images/');


  constructor(
    private _afDb: AngularFireDatabase
  ) {
    this._afDb.list(`vendors`, {preserveSnapshot: true}).subscribe( snapshots => {
      snapshots.forEach( snapshot => {
        this.vendorList.push({name: snapshot.val().name, id: snapshot.key});
      })
    })
  }


  newItemSelected(itemPushId: string) {
    // emit true for all loading<boolean> Subjects.
    this.newItemLoading();
    // fetch the data
    let item = this.fetchItemSnapshot(itemPushId);

    // fix this later
    this._afDb.object(`inventoryItems/${itemPushId}`, {preserveSnapshot: true}).subscribe( snapshot => {
      let value = snapshot.val();
      if (value.hasImage != true) {
        // no image, just emit false for the image loading observable.
        this._imageLoading.next(false);
      } else {
        this.fetchImage(itemPushId);
      }
    });
  }


  // we group together all of the loading observables so we can easily toggle all of them at once.
  newItemLoading() {
    this._imageLoading.next(true);
    this._itemInfoLoading.next(true);
  }


  // Subsribe to the item snapshot, when the snapshot returns we call .next() on the apporpriate observable
  fetchItemSnapshot(itemPushId: string) {
    let itemRef$ = this._afDb.object(`inventoryItems/${itemPushId}`, {preserveSnapshot: true});
    itemRef$.map( snapshot => {
      this._currentItemSource.next(snapshot);
    }).subscribe();
  }


  // 
  fetchImage(itemPushId: string): any {
    this.storageRef.child(`${itemPushId}.jpg`).getDownloadURL().then( url => {
      // this is confusing. https://firebase.google.com/docs/storage/web/download-files
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = ( event => {
        console.log('about to return the xhr.response');
        this._image.next({image: xhr.response, id: itemPushId});
      });
      xhr.open('GET', url);
      xhr.send();
    }, error => {
      // maybe the image doesn't exist.
      console.log(error.message);
    });
  }

}