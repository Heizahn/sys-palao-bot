import {
  Box,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { CuposTable } from '../components/CuposTable';

export const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Box w="100%">
      <Box mb={4} w="100%">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Buscar por nombre de alumno o representante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>

      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        rounded="lg"
        shadow="base"
        w={'100%'}
      >
        <CuposTable />
      </Box>
    </Box>
  );
};
