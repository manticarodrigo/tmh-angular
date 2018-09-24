import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DropdownComponent } from '../dropdown/dropdown.component';

import { User } from '../../models/user.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  @Input() tabs: Array<any>;
  @Input() selectedTab: string;
  @Input() user: User;
  @Input() project: Project;
  @Output() onReload = new EventEmitter();

  tabsMap = {
    IN_PROGRESS: 'IN PROGRESS',
    COMPLETED: 'COMPLETED',
    DETAILS: '1. DETAILS',
    DESIGN: '2. DESIGN',
    FINAL_DELIVERY: '3. FINAL DELIVERY'
  }
  
  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
  ) {}

  ngOnInit() {}

  homePressed() {
    console.log('logo pressed');
    this.router.navigateByUrl('/dashboard');
  }

  async selectDropdown() {
    const activeRoute = this.router.url;
    console.log('toggling tab dropdown', activeRoute);
    const items = this.tabs.map(item => item.replace('_', ' '));
    const popover = await this.popoverCtrl.create({
      component: DropdownComponent,
      componentProps: { 0: items },
      cssClass: 'tab-popover',
    });
    popover.present();
    popover.onDidDismiss()
      .then(event => {
        console.log(event);
        if (event) {
          if (activeRoute === '/dashboard') {
            this.selectedTab = event.data ? event.data.replace(' ', '_') : this.selectedTab;
            this.onReload.emit();
          } else {
            let route: string;
            if (event.data === 'DETAILS')
              route = '/details';
            if (event.data === 'FINAL DELIVERY')
              route = '/final-delivery';
            if (route)
              this.router.navigate(
                [route, { id: this.project.id }]
              );
          }
        }
      });
  }

  selectTab(link) {
    const activeRoute = this.router.url;
    console.log('selected tab link:', link, activeRoute);
    if (activeRoute === '/dashboard') {
      this.selectedTab = link;
      this.onReload.emit();
    } else {
      let route: string;
      if (link === 'DETAILS')
        route = 'details';
      if (link === 'FINAL_DELIVERY')
        route = 'final-delivery';
      if (route)
        this.router.navigate(
          [route, { id: this.project.id }]
        );
    }
  }

}
