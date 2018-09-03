import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  @Input() tabs: Array<any>;
  @Input() selectedTab: string;
  @Input() user: any;
  @Input() project: any;
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
      componentProps: items, 
      cssClass: 'tab-popover',
    });
    popover.present();
    popover.onDidDismiss()
      .then(data => {
        console.log(data);
        // if (data) {
        //   if (activeRoute === '/dashboard') {
        //     this.selectedTab = data.replace(' ', '_');
        //     this.onReload.emit();
        //   } else {
        //     let route: string;
        //     if (data === 'DETAILS')
        //       route = '/details';
        //     if (data === 'FINAL DELIVERY')
        //       route = '/final-delivery';
        //     if (route)
        //       this.router.navigate(
        //         [route, { id: this.project.id }]
        //       );
        //   }
        // }
      });
  }

  selectTab(link) {
    const activeRoute = this.router.url;
    console.log('selected tab link:', link, activeRoute);
    if (activeRoute === 'dashboard') {
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
