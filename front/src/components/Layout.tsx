import {
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { Sidebar } from './Sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="gray.100" minW={{ base: '100%', md: '100vw' }}>
      <Sidebar display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Botón de menú para móviles */}
      <Flex
        ml={{ base: 0, md: 60 }}
        px="4"
        position="sticky"
        top="0"
        bg="white"
        align="center"
        h="20"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        display={{ base: 'flex', md: 'none' }}
      >
        <IconButton
          aria-label="Abrir menú"
          icon={<FiMenu />}
          onClick={onOpen}
          variant="outline"
        />
      </Flex>

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};
