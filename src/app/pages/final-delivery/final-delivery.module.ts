import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FinalDeliveryPage } from './final-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: FinalDeliveryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FinalDeliveryPage]
})
export class FinalDeliveryPageModule {}
