import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCupos,
  getCuposRegisters,
  registerCupo,
} from '../services/CupoService';

export const useCupos = () => {
  return useQuery({
    queryKey: ['cupos'],
    queryFn: getCupos,
  });
};

export const useCuposRegisters = () => {
  return useQuery({
    queryKey: ['cupos-registers'],
    queryFn: getCuposRegisters,
  });
};

export const useRegisterCupo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cupoId: string) => registerCupo(cupoId),
    onSuccess: () => {
      // Invalidar y refrescar las consultas después de registrar un cupo
      queryClient.invalidateQueries({ queryKey: ['cupos'] });
      queryClient.invalidateQueries({ queryKey: ['cupos-registers'] });
    },
  });
};
