import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class InventoryService {

  currentInventoryItem$: FirebaseObjectObservable<any>;

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
  ) { }


  // we need to emit some information that says a new item has been selected.
  inventoryItemSelected(item: any) {
    // 1. Set the currentInventoryItem$ to the newly selected item.
    this._afDb.object(`inventoryItems/${item}`);
    
  }




}
