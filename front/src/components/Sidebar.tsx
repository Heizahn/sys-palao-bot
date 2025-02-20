import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  BoxProps,
  FlexProps,
  CloseButton,
  Button,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  FiHome,
  FiMessageSquare,
  FiUsers,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Ajusta la ruta según tu estructura

interface SidebarProps extends BoxProps {
  onClose?: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  to: string;
}

const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  return (
    <Link as={RouterLink} to={to} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const { logout } = useAuth(); // Asumiendo que tienes un hook useAuth

  const handleLogout = () => {
    logout();
    // Aquí puedes agregar redirección si es necesario
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="full" direction="column" justifyContent="space-between">
        <Box>
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <Box fontSize="2xl" fontWeight="bold">
              Bot Admin
            </Box>
            <CloseButton
              display={{ base: 'flex', md: 'none' }}
              onClick={onClose}
            />
          </Flex>
          <NavItem icon={FiHome} to="/">
            Dashboard
          </NavItem>
          <NavItem icon={FiMessageSquare} to="/messages">
            Mensajes
          </NavItem>
          <NavItem icon={FiUsers} to="/students">
            Estudiantes
          </NavItem>
          <NavItem icon={FiSettings} to="/settings">
            Configuración
          </NavItem>
        </Box>

        {/* Botón de Logout */}
        <Box p={4}>
          <Button
            w="full"
            variant="outline"
            colorScheme="red"
            leftIcon={<Icon as={FiLogOut} />}
            onClick={handleLogout}
            _hover={{
              bg: 'red.500',
              color: 'white',
            }}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
