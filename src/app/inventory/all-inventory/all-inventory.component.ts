import { Component } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { InventoryService } from '../inventory.service';


@Component({
  selector: 'app-all-inventory',
  templateUrl: './all-inventory.component.html',
  styleUrls: ['./all-inventory.component.css']
})
export class AllInventoryComponent {

  inventory$: FirebaseListObservable<any>;

  constructor(
    private _afDb: AngularFireDatabase,
    private _inventoryService: InventoryService
  ) {
    this.inventory$ = this._afDb.list('inventoryItems');
   }

  // When an item is selected we do two things.
    // 1. emit the itemPushId
    // 2. mark the selected item as 'active'
  onSelectItem(itemPushId: any) {
    // 1.
    this._inventoryService.newItemSelected(itemPushId);
    // this.itemSelected.emit(itemPushId);

    // 2.
    // TODO
  }

}
