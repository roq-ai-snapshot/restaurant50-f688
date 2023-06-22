import { MenuItemInterface } from 'interfaces/menu-item';
import { OrderInterface } from 'interfaces/order';
import { RestaurantTableInterface } from 'interfaces/restaurant-table';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RestaurantInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  menu_item?: MenuItemInterface[];
  order?: OrderInterface[];
  restaurant_table?: RestaurantTableInterface[];
  user?: UserInterface;
  _count?: {
    menu_item?: number;
    order?: number;
    restaurant_table?: number;
  };
}

export interface RestaurantGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
