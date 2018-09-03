import { NgModule } from '@angular/core';

import { ReadableRoomPipe } from './readable-room/readable-room.pipe';
import { PriceTotalPipe } from './price-total/price-total.pipe';
import { DaysLeftPipe } from './days-left/days-left.pipe';

@NgModule({
  imports: [],
  declarations: [
    ReadableRoomPipe,
    PriceTotalPipe,
    DaysLeftPipe,
  ],
  exports: [
    ReadableRoomPipe,
    PriceTotalPipe,
    DaysLeftPipe,
  ]
})
export class PipesModule { }
