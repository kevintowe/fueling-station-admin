import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { InventoryService } from '../inventory.service';


@Component({
  selector: 'app-all-inventory',
  templateUrl: './all-inventory.component.html',
  styleUrls: ['./all-inventory.component.css']
})
export class AllInventoryComponent implements OnInit {

  inventory$: FirebaseListObservable<any>;

  // @Output() itemSelected: EventEmitter<string> = new EventEmitter();

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder,
    private _inventoryService: InventoryService
  ) {
    this.inventory$ = this._afDb.list('inventoryItems');
   }

  ngOnInit() {
  }

  // When an item is selected we do two things.
    // 1. emit the itemPushId
    // 2. mark the selected item as 'active'
  onSelectItem(itemPushId: any) {
    // 1.
    this._inventoryService.inventoryItemSelected(itemPushId);
    // this.itemSelected.emit(itemPushId);

    // 2.
    // TODO
  }

}
