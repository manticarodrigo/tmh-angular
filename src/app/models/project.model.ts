import { User } from "./user.model";

export class Project {
  readonly id?: string;
  readonly created_date?: string;
  readonly modified_date?: string;
  readonly start_date?: string;
  readonly end_date?: string;
  readonly client?: string | User;
  readonly designer?: string | User;
  readonly room: string;
  status: string;
  readonly shared_with: string;
  readonly budget: string;
  readonly pet_friendly: boolean;
  readonly limited_access: boolean;
  readonly style: string;
  readonly zipcode: number;
  designer_note: string;
  final_note: string;
  revision_count: string;
}

export interface ProjectStatus {
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
  ARCHIVED: 'Archived'
}