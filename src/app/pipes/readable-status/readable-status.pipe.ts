import { Pipe, PipeTransform } from '@angular/core';

const statusMap = {
  DETAILS: 'Details',
  DESIGN: 'Design',
  CONCEPTS: 'Concepts',
  FLOOR_PLAN: 'Floor Plan',
  REQUEST_ALTERNATIVES: 'Request Alternatives',
  ALTERNATIVES_READY: 'Alternatives Ready',
  FINAL_DELIVERY: 'Final Delivery',
  SHOPPING_CART: 'Shopping Cart',
  ESTIMATE_SHIPPING_AND_TAX: 'Estimate Shipping & Tax',
  CHECKOUT: 'Checkout',
  ARCHIVED: 'Archived',
}

@Pipe({
  name: 'readableStatus'
})
export class ReadableStatusPipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    return statusMap[value];
  }

}
