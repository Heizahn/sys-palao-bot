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
  //   FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Ajusta la ruta según tu estructura

interface SidebarProps extends BoxProps {
  onClose?: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  to: string;
  name: string;
}

const NavItem = ({ icon, children, name, to, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();

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
        bg={pathname.includes(name) ? 'cyan.400' : ''}
        color={pathname.includes(name) ? 'white' : ''}
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
          <NavItem icon={FiHome} to="/dashboard" name="dashboard">
            Dashboard
          </NavItem>
          <NavItem icon={FiMessageSquare} to="/messages" name="messages">
            Mensajes
          </NavItem>
          <NavItem icon={FiUsers} to="/students" name="students">
            Estudiantes
          </NavItem>
          {/* <NavItem icon={FiSettings} to="/settings" name="settings">
            Configuración
          </NavItem> */}
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
