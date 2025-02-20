import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box
      minH="100vh"
      minW="100vw"
      bg={bgColor}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="lg">
        <VStack spacing={8} textAlign="center">
          {/* Número 404 */}
          <Heading as="h1" size="4xl" color={textColor} fontWeight="bold">
            404
          </Heading>

          {/* Mensaje de error */}
          <VStack spacing={4}>
            <Heading as="h2" size="xl" color={textColor}>
              Página no encontrada
            </Heading>
            <Text color="gray.500">
              Lo sentimos, la página que estás buscando no existe o ha sido
              movida.
            </Text>
          </VStack>

          {/* Botones de navegación */}
          <HStack spacing={4} pt={4}>
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="outline"
              onClick={handleGoBack}
            >
              Volver atrás
            </Button>
            <Button
              leftIcon={<FiHome />}
              colorScheme="blue"
              onClick={handleGoHome}
            >
              Ir al inicio
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default NotFound;
