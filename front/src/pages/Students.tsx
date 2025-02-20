import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Text,
  HStack,
  Tag,
  IconButton,
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FiEdit2, FiEye, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

export const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    //que ocupe todo el ancho de la pantalla disponible
    <Box>
      <Box mb={4}>
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
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Alumno</Th>
              <Th>Representante</Th>
              <Th>Teléfono</Th>
              <Th>Horario</Th>
              <Th>Fecha Nacimiento</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Text fontWeight="medium">Juan Pérez</Text>
              </Td>
              <Td>
                <Text>María Pérez</Text>
                <Text fontSize="sm" color="gray.600">
                  +58 414-1234567
                </Text>
              </Td>
              <Td>
                <Text>+58 424-1234567</Text>
              </Td>
              <Td>
                <Tag colorScheme="blue">Mañana</Tag>
              </Td>
              <Td>
                <Text>15/03/2015</Text>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Tooltip label="Ver detalles">
                    <IconButton
                      aria-label="Ver detalles"
                      icon={<FiEye />}
                      size="sm"
                      colorScheme="blue"
                      variant="ghost"
                    />
                  </Tooltip>
                  <Tooltip label="Editar">
                    <IconButton
                      aria-label="Editar alumno"
                      icon={<FiEdit2 />}
                      size="sm"
                      colorScheme="green"
                      variant="ghost"
                    />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
