import { RestaurantInterface } from 'interfaces/restaurant';
import { TableStatusInterface } from 'interfaces/table-status';
import { GetQueryInterface } from 'interfaces';

export interface RestaurantTableInterface {
  id?: string;
  restaurant_id: string;
  table_status_id: string;
  created_at?: any;
  updated_at?: any;

  restaurant?: RestaurantInterface;
  table_status?: TableStatusInterface;
  _count?: {};
}

export interface RestaurantTableGetQueryInterface extends GetQueryInterface {
  id?: string;
  restaurant_id?: string;
  table_status_id?: string;
}
