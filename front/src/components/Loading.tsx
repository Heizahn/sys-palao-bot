import {
  Flex,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const Loading = () => {
  const spinnerColor = useColorModeValue('blue.500', 'blue.200');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex minH="100vh" w="100%" justify="center" align="center" bg={bgColor}>
      <VStack spacing={6}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color={spinnerColor}
          size="xl"
        />
        <Text fontSize="lg" fontWeight="medium" color={textColor}>
          Cargando...
        </Text>
        <Text fontSize="sm" color="gray.500">
          Por favor, espere un momento
        </Text>
      </VStack>
    </Flex>
  );
};

export default Loading;
