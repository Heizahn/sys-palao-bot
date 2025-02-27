import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Spinner,
  Text,
  TableContainer,
} from '@chakra-ui/react';
import { capitalize } from '../utils/stringUtils';
import { useCuposRegisters } from '../hooks/useCupos';

export default function CuposRegistersTable({
  searchTerm,
}: {
  searchTerm: string;
}) {
  const { data: cupos, isLoading, isError } = useCuposRegisters();
  const filteredCupos = cupos?.filter(
    (cupo) =>
      cupo.alumno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cupo.representante.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <Spinner />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={4}>
        <Text color="red.500">Error al cargar los cupos</Text>
      </Box>
    );
  }

  return (
    <TableContainer overflowY="auto" maxH="calc(100vh - 7.48rem)">
      <Table variant="simple">
        <Thead position="sticky" top={0} bg="white" zIndex={1}>
          <Tr>
            <Th>Alumno</Th>
            <Th>Representante</Th>
            <Th>Teléfono</Th>
            <Th>Horario</Th>
            <Th>Fecha de Nacimiento</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredCupos?.map((cupo) => (
            <Tr key={cupo.id}>
              <Td>{cupo.alumno}</Td>
              <Td>{cupo.representante}</Td>
              <Td>{cupo.tlf}</Td>
              <Td>{capitalize(cupo.horario)}</Td>
              <Td>{cupo.fecha_nacimiento}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
