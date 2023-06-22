import axios from 'axios';
import queryString from 'query-string';
import { OrderItemInterface, OrderItemGetQueryInterface } from 'interfaces/order-item';
import { GetQueryInterface } from '../../interfaces';

export const getOrderItems = async (query?: OrderItemGetQueryInterface) => {
  const response = await axios.get(`/api/order-items${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOrderItem = async (orderItem: OrderItemInterface) => {
  const response = await axios.post('/api/order-items', orderItem);
  return response.data;
};

export const updateOrderItemById = async (id: string, orderItem: OrderItemInterface) => {
  const response = await axios.put(`/api/order-items/${id}`, orderItem);
  return response.data;
};

export const getOrderItemById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/order-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOrderItemById = async (id: string) => {
  const response = await axios.delete(`/api/order-items/${id}`);
  return response.data;
};
