import { Pipe, PipeTransform } from '@angular/core';

const roomMap = {
  BEDROOM: 'Bedroom',
  LIVING_ROOM: 'Living Room',
  MULTIPURPOSE_ROOM: 'Multipurpose Room',
  STUDIO: 'Studio',
  DINING_ROOM: 'Dining Room',
  HOME_OFFICE: 'Office'
};

@Pipe({
  name: 'readableRoom'
})
export class ReadableRoomPipe implements PipeTransform {
  
  transform(value: string, ...args) {
    return roomMap[value];
  }

}
