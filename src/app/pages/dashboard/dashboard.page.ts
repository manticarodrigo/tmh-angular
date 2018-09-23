import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { User } from '../../models/user.model';
import { Project, ProjectStatus } from '../../models/project.model';

import { UserService } from '../../services/user/user.service';
import { ProjectService } from '../../services/project/project.service';

enum Tabs {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED',
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: User;
  isStaff: boolean = false;
  projects: Array<Project>;
  selectedTab: Tabs = Tabs.IN_PROGRESS;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private userService: UserService,
    private projectService: ProjectService,
  ) { }

  ngOnInit() {
    this.userService.getAuth()
      .subscribe(auth => {
        if (auth) {
          this.user = auth.user;
          if (this.user.is_staff) {
            this.isStaff = true;
          }
          this.fetchProjects();
        }
      });
  }

  async homePressed() {
    const alert = await this.alertCtrl.create({
      header: 'NEW PROJECT',
      message: 'Press start to begin a new project.',
      buttons: [
        {
          text: 'CANCEL',
          role: 'cancel',
          handler: data => {
            console.log('Cancel pressed');
          }
        },
        {
          text: 'START',
          handler: data => {
            this.router.navigate(['onboarding'])
          }
        }
      ]
    });
    await alert.present();
  }

  fetchProjects() {
    if (!this.isStaff) {
      this.fetchClientProjects()
        .then((data: Array<Project>) => {
          console.log('dashboard received client projects', data);
          this.projects = data;
        });
    }
    if (this.isStaff) {
      this.fetchDesignerProjects()
        .then((data: Array<Project>) => {
          console.log('dashboard received designer projects', data);
          this.projects = data;
        });
    }
  }

  fetchClientProjects(): Promise<Array<Project>> {
    return new Promise((resolve, reject) => {
      this.projectService.getProjects()
        .subscribe(data => {
          const projects = [];
          for (const key in data) {
            const project = data[key];
            if (
              this.selectedTab === Tabs.IN_PROGRESS &&
              project.status !== ProjectStatus.ARCHIVED
            ) {
              projects.push(project);
            } else if (
              this.selectedTab === Tabs.COMPLETED &&
              project.status === ProjectStatus.ARCHIVED
            ) {
              projects.push(project);
            }
          }
          resolve(projects);
        });
    });
  }

  fetchDesignerProjects(): Promise<Array<Project>> {
    return this.projectService.getByStatus(this.selectedTab).toPromise();
  }
  
  startProject() {
    console.log('start project pressed');
    this.router.navigate(['onboarding']);
  }

  selectedProject(project) {
    let page: any;
    switch (project.status) {
      case ProjectStatus.DETAILS:
        page = 'details'
        break;
      case ProjectStatus.DESIGN:
      case ProjectStatus.CONCEPTS:
      case ProjectStatus.FLOOR_PLAN:
      case ProjectStatus.REQUEST_ALTERNATIVES:
      case ProjectStatus.ALTERNATIVES_READY:
        page = 'design'
        break;
      case ProjectStatus.FINAL_DELIVERY:
      case ProjectStatus.SHOPPING_CART:
      case ProjectStatus.ESTIMATE_SHIPPING_AND_TAX:
      case ProjectStatus.CHECKOUT:
      case ProjectStatus.ARCHIVED:
        page = 'final-delivery'
        break;
      default:
        page = 'details'
    }
    this.router.navigate([page], {
      queryParams: project.id
    });
  }
  
}
