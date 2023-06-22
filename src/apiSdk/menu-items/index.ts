import axios from 'axios';
import queryString from 'query-string';
import { MenuItemInterface, MenuItemGetQueryInterface } from 'interfaces/menu-item';
import { GetQueryInterface } from '../../interfaces';

export const getMenuItems = async (query?: MenuItemGetQueryInterface) => {
  const response = await axios.get(`/api/menu-items${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMenuItem = async (menuItem: MenuItemInterface) => {
  const response = await axios.post('/api/menu-items', menuItem);
  return response.data;
};

export const updateMenuItemById = async (id: string, menuItem: MenuItemInterface) => {
  const response = await axios.put(`/api/menu-items/${id}`, menuItem);
  return response.data;
};

export const getMenuItemById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/menu-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMenuItemById = async (id: string) => {
  const response = await axios.delete(`/api/menu-items/${id}`);
  return response.data;
};
