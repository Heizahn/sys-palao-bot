import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';

export const Dashboard = () => {
  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Stat
          px={{ base: 2, md: 4 }}
          py="5"
          shadow="xl"
          border="1px solid"
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded="lg"
        >
          <StatLabel fontWeight="medium">Mensajes Totales</StatLabel>
          <StatNumber fontSize="2xl">0</StatNumber>
          <StatHelpText>Desde el inicio</StatHelpText>
        </Stat>

        <Stat
          px={{ base: 2, md: 4 }}
          py="5"
          shadow="xl"
          border="1px solid"
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded="lg"
        >
          <StatLabel fontWeight="medium">Usuarios Activos</StatLabel>
          <StatNumber fontSize="2xl">0</StatNumber>
          <StatHelpText>Últimas 24 horas</StatHelpText>
        </Stat>

        <Stat
          px={{ base: 2, md: 4 }}
          py="5"
          shadow="xl"
          border="1px solid"
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded="lg"
        >
          <StatLabel fontWeight="medium">Tasa de Respuesta</StatLabel>
          <StatNumber fontSize="2xl">0%</StatNumber>
          <StatHelpText>Últimas 24 horas</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};
