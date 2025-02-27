import { useRef } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRegisterCupo } from '../hooks/useCupos';

type FocusableElement = HTMLElement;

const RegisterCupoButton = ({
  cupoId,
  clientName,
}: {
  cupoId: string;
  clientName: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const RegisterCupo = useRegisterCupo();

  const handleRegister = () => {
    RegisterCupo.mutate(cupoId);
    onClose();
  };

  return (
    <>
      {/* Botón que abre el diálogo de confirmación */}
      <Button
        colorScheme="blue"
        size="sm"
        onClick={onOpen}
        isLoading={RegisterCupo.isPending}
        color="white"
      >
        Registrar
      </Button>

      {/* Diálogo de confirmación */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as React.RefObject<FocusableElement>}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Registrar Cliente
            </AlertDialogHeader>

            <AlertDialogBody>
              ¿Estás seguro que registro a {clientName}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" onClick={handleRegister} ml={3}>
                Registrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RegisterCupoButton;
