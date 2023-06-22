import { RestaurantTableInterface } from 'interfaces/restaurant-table';
import { GetQueryInterface } from 'interfaces';

export interface TableStatusInterface {
  id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;
  restaurant_table?: RestaurantTableInterface[];

  _count?: {
    restaurant_table?: number;
  };
}

export interface TableStatusGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
}
