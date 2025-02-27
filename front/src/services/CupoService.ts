import { api } from './api';
import { Cupo, CupoRegister } from '../types/students';

export const getCupos = async (): Promise<Array<Cupo>> => {
  const { data } = await api.get('/students');

  return data;
};

export const getCuposRegisters = async (): Promise<Array<CupoRegister>> => {
  const { data } = await api.get('/students/registers');

  return data;
};

export const registerCupo = async (cupoId: string): Promise<CupoRegister> => {
  const { data } = await api.post(`/students/register`, { cupo_id: cupoId });

  return data;
};
