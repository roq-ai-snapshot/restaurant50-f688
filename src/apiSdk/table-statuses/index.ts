import axios from 'axios';
import queryString from 'query-string';
import { TableStatusInterface, TableStatusGetQueryInterface } from 'interfaces/table-status';
import { GetQueryInterface } from '../../interfaces';

export const getTableStatuses = async (query?: TableStatusGetQueryInterface) => {
  const response = await axios.get(`/api/table-statuses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTableStatus = async (tableStatus: TableStatusInterface) => {
  const response = await axios.post('/api/table-statuses', tableStatus);
  return response.data;
};

export const updateTableStatusById = async (id: string, tableStatus: TableStatusInterface) => {
  const response = await axios.put(`/api/table-statuses/${id}`, tableStatus);
  return response.data;
};

export const getTableStatusById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/table-statuses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTableStatusById = async (id: string) => {
  const response = await axios.delete(`/api/table-statuses/${id}`);
  return response.data;
};
