import { api } from './api';
import { Cupo } from '../types/studens';

export const getCupos = async (): Promise<Array<Cupo>> => {
  const { data } = await api.get('/students');

  return data;
};
