import { Component, OnInit } from '@angular/core';
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
export class EditItemComponent implements OnInit {

  currentInventoryItem$: FirebaseObjectObservable<any>;

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder,
    private _inventoryService: InventoryService
  ) {
    this.currentInventoryItem$ = this._inventoryService.currentInventoryItem$;
   }

  observeCurrentInventoryItem() {
    this.currentInventoryItem$.map( _ => {
      console.log('hey look, it worked.');
    })
  }

  ngOnInit() {
  }

  itemSelected(item: any) {

  }



}
