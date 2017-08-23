import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public activeTab;

  constructor(
    private renderer2: Renderer2
  ) {

   }

  ngOnInit() {
  
  }

  openHome() {
    if (this.activeTab === 'home') {
      return;
    } else {
      
    }
  }

  openSports() {
    if (this.activeTab === 'sports') {
      return;
    } else {
      
    }
  } 

  openTabs() {

  }

  openItems() {

  }



}
