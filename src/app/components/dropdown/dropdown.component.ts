import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  items: Array<String> = ['yo', 'wassup'];

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.items = [...this.navParams.data[0]];
    console.log(this.navParams, this.items);
  }

  selectItem(item) {
    const popover = this.navParams.data.popover;
    popover.dismiss(item);
  }

}
