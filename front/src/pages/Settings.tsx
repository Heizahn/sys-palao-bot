import {
  Box,
  Button,
  useColorModeValue,
  Text,
  VStack,
  useToast,
  Code,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { HOST_API } from '../../env';

interface ApiKeyForm {
  botId: string;
  rateLimit: number;
  permissions: string[];
}

export const Settings = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [formData, setFormData] = useState<ApiKeyForm>({
    botId: '',
    rateLimit: 100, // valor por defecto
    permissions: [],
  });

  const handleRequestApiKey = async () => {
    if (!formData.botId) {
      toast({
        title: 'Error',
        description: 'El ID del bot es requerido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(HOST_API + '/api-keys', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setApiKey(response.data.apiKey);
      toast({
        title: 'API Key generada exitosamente',
        description: 'Guarda esta clave en un lugar seguro',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      let errorMessage = 'No se pudo generar la API key';

      if (axios.isAxiosError(error) && error.response?.status === 403) {
        errorMessage = 'No tienes permisos para generar API keys';
      }

      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={8}
        rounded="lg"
        shadow="base"
        mx="auto"
      >
        <VStack spacing={6} align="stretch">
          <Text fontSize="lg" fontWeight="medium">
            Generar nueva API Key
          </Text>

          {apiKey ? (
            <Box>
              <Text mb={2}>Tu API Key:</Text>
              <Code p={3} borderRadius="md" width="full" overflowX="auto">
                {apiKey}
              </Code>
              <Text mt={2} fontSize="sm" color="red.500">
                ¡Guarda esta clave! Solo se mostrará una vez.
              </Text>
            </Box>
          ) : (
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>ID del Bot</FormLabel>
                <Input
                  value={formData.botId}
                  onChange={(e) =>
                    setFormData({ ...formData, botId: e.target.value })
                  }
                  placeholder="Ingresa el ID del bot"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Rate Limit (peticiones por minuto)</FormLabel>
                <NumberInput
                  min={1}
                  value={formData.rateLimit}
                  onChange={(valueString) =>
                    setFormData({ ...formData, rateLimit: Number(valueString) })
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleRequestApiKey}
                isLoading={isLoading}
                loadingText="Generando API Key..."
                width="full"
              >
                Generar API Key
              </Button>
            </VStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
