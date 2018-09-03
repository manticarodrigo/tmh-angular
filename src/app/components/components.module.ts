import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PipesModule } from '../pipes/pipes.module';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class ComponentsModule { }
