import { useQuery } from '@tanstack/react-query';
import { getCupos } from '../services/CupoService';

export const useCupos = () => {
  return useQuery({
    queryKey: ['cupos'],
    queryFn: getCupos,
  });
};
