import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export const Messages = () => {
  return (
    <Box>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        rounded="lg"
        shadow="base"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Usuario</Th>
              <Th>Mensaje</Th>
              <Th>Estado</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Text>+1234567890</Text>
              </Td>
              <Td>
                <Text isTruncated maxW="300px">
                  Ejemplo de mensaje
                </Text>
              </Td>
              <Td>
                <Badge colorScheme="green">Enviado</Badge>
              </Td>
              <Td>{new Date().toLocaleString()}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
