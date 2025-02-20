import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

export const Settings = () => {
  return (
    <Box>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={8}
        rounded="lg"
        shadow="base"
      >
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Webhook URL</FormLabel>
            <Input placeholder="https://..." />
          </FormControl>

          <FormControl>
            <FormLabel>Token de API</FormLabel>
            <Input type="password" />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Notificaciones de Errores</FormLabel>
            <Switch />
          </FormControl>

          <Button colorScheme="blue" mt={4}>
            Guardar Cambios
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
