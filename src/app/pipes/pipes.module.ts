import { NgModule } from '@angular/core';

import { ReadableRoomPipe } from './readable-room/readable-room.pipe';
import { ReadableStatusPipe } from './readable-status/readable-status.pipe';
import { PriceTotalPipe } from './price-total/price-total.pipe';
import { DaysLeftPipe } from './days-left/days-left.pipe';

@NgModule({
  imports: [],
  declarations: [
    ReadableRoomPipe,
    ReadableStatusPipe,
    PriceTotalPipe,
    DaysLeftPipe,
  ],
  exports: [
    ReadableRoomPipe,
    ReadableStatusPipe,
    PriceTotalPipe,
    DaysLeftPipe,
  ]
})
export class PipesModule { }
