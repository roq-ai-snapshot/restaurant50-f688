import axios from 'axios';
import queryString from 'query-string';
import { RestaurantTableInterface, RestaurantTableGetQueryInterface } from 'interfaces/restaurant-table';
import { GetQueryInterface } from '../../interfaces';

export const getRestaurantTables = async (query?: RestaurantTableGetQueryInterface) => {
  const response = await axios.get(`/api/restaurant-tables${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRestaurantTable = async (restaurantTable: RestaurantTableInterface) => {
  const response = await axios.post('/api/restaurant-tables', restaurantTable);
  return response.data;
};

export const updateRestaurantTableById = async (id: string, restaurantTable: RestaurantTableInterface) => {
  const response = await axios.put(`/api/restaurant-tables/${id}`, restaurantTable);
  return response.data;
};

export const getRestaurantTableById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/restaurant-tables/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRestaurantTableById = async (id: string) => {
  const response = await axios.delete(`/api/restaurant-tables/${id}`);
  return response.data;
};
