import { Component } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private _afAuth: AngularFireAuth
  ) {
    const authListener = this._afAuth.authState.subscribe( user => {
      if (user) {
        // navigate to the home screen.
      } else {
        // navigate to the landing page.
      }
    })
  }
}
