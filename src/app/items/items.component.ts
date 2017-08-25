import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  // @Output() itemSelected: EventEmitter<string> = new EventEmitter();

  inventory$ : FirebaseListObservable<any>;

  constructor(
    private _afDb: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder
  ) {
    this.inventory$ = this._afDb.list(`inventoryItems`);
   }

  ngOnInit() { 
  }

  onItemClick(item: any) {

  }

}
