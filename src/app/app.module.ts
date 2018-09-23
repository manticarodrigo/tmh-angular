import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

import { httpInterceptorProviders } from './services/interceptors';

import { FacebookService } from 'ngx-facebook';

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    DropdownComponent,
  ],
  entryComponents: [
    SidemenuComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FacebookService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
