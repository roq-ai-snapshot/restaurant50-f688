const mapping: Record<string, string> = {
  'menu-items': 'menu_item',
  orders: 'order',
  'order-items': 'order_item',
  restaurants: 'restaurant',
  'restaurant-tables': 'restaurant_table',
  'table-statuses': 'table_status',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
