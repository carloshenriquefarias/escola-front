// 'use client'
// import { Text, Button, Center, Divider, Flex, HStack, Icon, Link, VStack, useBreakpointValue 
// } from '@chakra-ui/react';

// import { useAuth } from '../hooks/useAuth';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { DrawerProvider, useDrawerContext } from '../context/DrawerContext';
// import { FaUserCircle } from "react-icons/fa";
// import { Logo } from './Logo';
// // import { motion } from "framer-motion";
// import { Profile } from './Profile';
// import { SideBarMenu } from './Sidebar/SidebarMenu';

// import Menu from './Menu'

// export default function Header() {

//   const { openDrawer } = useDrawerContext();
//   const { user } = useAuth();

//   const navigate = useNavigate();
//   const gradientBackground = 'linear-gradient(135deg, #00102c 0%, #00102c 50%,  #1a4971 60%, #225177 70%, #103153 90%)';
//   const isWideVersion = useBreakpointValue({
//     base: false,
//     sm: false,
//     md: false,
//     lg: false,
//     xl: true,
//   });

//   function isValidUser(user: any) {
//     return user !== null && user.id !== '' && user.name !== '' && user.email !== '';
//   }

//   function handleClickGoHome() {
//     navigate('/');
//   }

//   function handleLogin() {
//     navigate('/login')
//   }

//   useEffect(() => {
//     openDrawer();
//   }, []);

//   return (
//     <Flex
//       bg={gradientBackground}
//       w="100%"
//       h={isWideVersion ? ('11rem') : ('9rem')}
//       align="center"
//       marginX="auto"
//       px="6"
//     >
//       <VStack
//         w="100%"
//         h={isWideVersion ? ('11rem') : ('9rem')}
//       >       
//         {/* <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 150 }}
//           transition={{ duration: 0.8 }}
//           style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
//         > */}
//           <HStack
//             alignItems="center"
//             justifyContent="space-between"
//             w="100%"
//             h="4rem"
//             mt={8}
//             maxWidth={1480}
//           >
//             <HStack alignItems="center" justifyContent="flex-start" w="100%" h="10" maxWidth={1480}>             
//               {isWideVersion ? (
//                 <>
//                 </>
//                 ) : (
//                   <DrawerProvider>
//                     <SideBarMenu />
//                   </DrawerProvider>
//                 )
//               }

//               <Link onClick={handleClickGoHome}>
//                 <Logo />
//               </Link>   
//             </HStack>       
                       
//             {/* {isWideVersion && <SearchBox />} */}

//             {isValidUser(user) ? (<Profile />) : (
//               <Button bg='blue.200' w='auto' h={isWideVersion ? '65px': '55px'} onClick={handleLogin}>
//                 <HStack pt={0}>
//                   <Icon as={FaUserCircle } color={'gray.100'} h='28px' w='28px' />
//                   <Text color={'gray.100'} fontSize={['2xs', 'xs', 'sm', 'md']}>Login</Text>
//                 </HStack>
//               </Button>
//             )}
//           </HStack>          
//         {/* </motion.div> */}

//         <Center
//           alignItems="center"
//           justifyContent="space-between"
//           w="100%"
//           mt={1}
//           h="10px"
//           // pr={10}
//           maxWidth={1480}
//         >
//           <Divider borderColor="gray.400" alignItems="center" justifyContent="center"></Divider>
//         </Center>

//         {isWideVersion && (
//           <HStack alignItems="center" justifyContent="center" h="12px" my={4}>
//             <HStack spacing={6}>
//               <Menu color='gray.100' />
//             </HStack>
//           </HStack>
//         )}
//       </VStack>
//     </Flex>
//   )
// }

// import {
//   Avatar,
//   Box,
//   Collapse,
//   Drawer,
//   DrawerContent,
//   DrawerOverlay,
//   Flex,
//   Icon,
//   IconButton,
//   // Input,
//   // InputGroup,
//   // InputLeftElement,
//   Text,
//   useColorModeValue,
//   useDisclosure,
//   VStack,
// } from "@chakra-ui/react";
// import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
// import { AiFillGift } from "react-icons/ai";
// import { BsGearFill } from "react-icons/bs";
// import { FiMenu } from "react-icons/fi";
// import { HiCode, HiCollection } from "react-icons/hi";
// import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
// // import React from "react";
// // import { Logo } from "@choc-ui/logo";

// export default function Header(){
//   const sidebar = useDisclosure();
//   const integrations = useDisclosure();
//   const color = useColorModeValue("gray.600", "gray.300");

//   const NavItem = (props: any) => {
//     const { icon, children, ...rest } = props;
//     return (
//       <Flex
//         align="center"
//         px="4"
//         pl="4"
//         py="3"
//         cursor="pointer"
//         color="inherit"
//         _dark={{ color: "gray.400" }}
//         _hover={{
//           bg: "gray.100",
//           _dark: { bg: "gray.900" },
//           color: "gray.900",
//         }}
//         role="group"
//         fontWeight="semibold"
//         transition=".15s ease"
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mx="2"
//             boxSize="4"
//             _groupHover={{
//               color: color,
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     );
//   };

//   const SidebarContent = (props: any) => (
//     <Box
//       as="nav"
//       pos="fixed"
//       top="0"
//       left="0"
//       zIndex="sticky"
//       h="full"
//       pb="10"
//       overflowX="hidden"
//       overflowY="auto"
//       bg="white"
//       _dark={{ bg: "gray.800" }}
//       border
//       color="inherit"
//       borderRightWidth="1px"
//       w="60"
//       {...props}
//     >
//       <Flex px="4" py="5" align="center">
//         {/* <Logo /> */}
//         <Text
//           fontSize="2xl"
//           ml="2"
//           color="brand.500"
//           _dark={{ color: "white" }}
//           fontWeight="semibold"
//         >
//           Choc UI
//         </Text>
//       </Flex>
//       <Flex
//         direction="column"
//         as="nav"
//         fontSize="sm"
//         color="blue.500"
//         aria-label="Main Navigation"
//       >
//         <NavItem icon={MdHome}>Home</NavItem>
//         <NavItem icon={FaRss}>Articles</NavItem>
//         <NavItem icon={HiCollection}>Collections</NavItem>
//         <NavItem icon={FaClipboardCheck}>Checklists</NavItem>
//         <NavItem icon={HiCode} onClick={integrations.onToggle}>
//           Integrations
//           <Icon
//             as={MdKeyboardArrowRight}
//             ml="auto"
//             // transform={integrations.isOpen && "rotate(90deg)"}
//           />
//         </NavItem>
//         <Collapse in={integrations.isOpen}>
//           <NavItem pl="12" py="2">
//             Shopify
//           </NavItem>
//           <NavItem pl="12" py="2">
//             Slack
//           </NavItem>
//           <NavItem pl="12" py="2">
//             Zapier
//           </NavItem>
//         </Collapse>
//         <NavItem icon={AiFillGift}>Changelog</NavItem>
//         <NavItem icon={BsGearFill}>Settings</NavItem>
//       </Flex>
//     </Box>
//   );

//   return (
//     <Box as="section" bg="white" _dark={{ bg: "gray.50" }} minH="100vh">
//       <SidebarContent display={{ base: "none", md: "unset" }} />
//       <Drawer
//         isOpen={sidebar.isOpen}
//         onClose={sidebar.onClose}
//         placement="left"
//       >
//         <DrawerOverlay />
//         <DrawerContent>
//           <SidebarContent w="full" borderRight="none" />
//         </DrawerContent>
//       </Drawer>

//       <Box ml={{ base: 0, md: 60 }} transition=".3s ease" bg={'blue'}>
//         <Flex
//           as="header"
//           align="center"
//           justify="space-between"
//           w="full"
//           px="4"
//           bg="white"
//           _dark={{ bg: "gray.800" }}
//           borderBottomWidth="1px"
//           color="inherit"
//           h="6rem"
//         >
//           <IconButton
//             aria-label="Menu"
//             display={{ base: "inline-flex", md: "none" }}
//             onClick={sidebar.onOpen}
//             icon={<FiMenu />}
//             size="sm"
//           />

//           <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
//             <Text
//               fontSize="md"
//               ml="2"
//               color="brand.200"
//               _dark={{ color: "white" }}
//               fontWeight="semibold"
//             >
//               Pages / Dashboard
//             </Text>
            
//             <Text
//               fontSize="2xl"
//               ml="2"
//               color="brand.500"
//               _dark={{ color: "white" }}
//               fontWeight="semibold"
//             >
//               Dashboard
//             </Text>
//           </VStack>

          
          
//           {/* <InputGroup w="96" display={{ base: "none", md: "flex" }}>
//             <InputLeftElement color="gray.500">
//               <FiSearch />
//             </InputLeftElement>
//             <Input placeholder="Search for articles..." />
//           </InputGroup> */}

//           <Flex align="center">
//             <Icon color="gray.500" as={FaBell} cursor="pointer" />
//             <Avatar
//               ml="4"
//               size="md"
//               name="anubra266"
//               src="https://avatars.githubusercontent.com/u/30869823?v=4"
//               cursor="pointer"
//             />
//           </Flex>
//         </Flex>

//         <Box as="main" p="4" bg={'white'}>
//           {/* Add content here, remove div below  */}
//           {/* <Box rounded="md" h="96" /> */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };



'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  // Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useToast,
} from '@chakra-ui/react'

import {
  FiHome,
  FiCompass,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi'
import { PiStudentBold } from "react-icons/pi";
import { FaPlusSquare } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoWomanSharp } from "react-icons/io5";
import { IoMan } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { FaBus } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaHandHoldingWater } from "react-icons/fa";
import { FaTools } from "react-icons/fa";

// import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { Logo } from './Logo';

// interface LinkItemProps {
//   name: string
//   icon: IconType
//   onClick: () => void;
// }

// interface NavItemProps extends FlexProps {
//   icon: IconType
//   children: React.ReactNode
// }

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

// ESSE E O ANTIGO SIDEBAR

// const LinkItems = [
//   { name: 'Home', icon: FiHome, path: '/' },
//   { name: 'Todos alunos', icon: PiStudentBold, path: '/all_students' },
//   { name: 'Cadastrar aluno', icon: FaPlusSquare, path: '/register_student' },
//   { name: 'Editar aluno', icon: FiCompass, path: '/boatEdit' },
//   { name: 'Lista de turmas', icon: FaClipboardList, path: '/all_class' },
//   { name: 'Lista de rotas', icon: FaBus, path: '/all_class' },
//   { name: 'Turmas por ID', icon: TbReportSearch, path: '/cardBoatDetails' },
//   { name: 'Motoristas', icon: IoMan, path: '/settings' },
//   { name: 'Monitoras', icon: IoWomanSharp, path: '/settings' }, 
//   { name: 'Usuários', icon: FaUsers, path: '/all_users' },  
// ];

// const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
//   const navigate = useNavigate();
  
//   return (
//     <Box
//       transition="3s ease"
//       bg={useColorModeValue('blue.500', 'gray.900')}
//       borderRight="1px"
//       borderRightColor={useColorModeValue('gray.200', 'gray.700')}
//       w={{ base: 'full', md: 60 }}
//       pos="fixed"
//       h="full"
//       color={'white'}
//       {...rest}
//     >
//       <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
//         <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
//           Logo
//         </Text>
//         <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
//       </Flex>
//       {LinkItems.map((link) => (
//         <NavItem key={link.name} icon={link.icon} onClick={() => navigate(link.path)}>
//           {link.name}
//         </NavItem>
//       ))}
//     </Box>
//   )
// }

// const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
//   return (
//     <Box
//       as="a"
//       href="#"
//       style={{ textDecoration: 'none' }}
//       _focus={{ boxShadow: 'none' }}>
//       <Flex
//         align="center"
//         p="4"
//         mx="4"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         _hover={{
//           bg: 'blue.400',
//           color: 'white',
//         }}
//         {...rest}>
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="16"
//             _groupHover={{
//               color: 'white',
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     </Box>
//   )
// }




// ESSE E O NOVO SIDEBAR

const LinkItems = [
  { name: 'Home', icon: FiHome, path: '/' },
  {
    name: 'Alunos',
    icon: FiCompass,
    subItems: [
      { name: 'Todos alunos', icon: PiStudentBold, path: '/all_students' },
      { name: 'Cadastrar aluno', icon: FaPlusSquare, path: '/register_student' },
      { name: 'Deletados', icon: FaTrashAlt, path: '/students_deleted' },
    ],
  },
  { name: 'Lista de turmas', icon: FaClipboardList, path: '/all_class' },
  { name: 'Lista de rotas', icon: FaBus, path: '/all_routes' },
  { name: 'Motoristas', icon: IoMan, path: '/drivers' },
  { name: 'Monitoras', icon: IoWomanSharp, path: '/monitors' },
  { name: 'Usuários', icon: FaUsers, path: '/all_users' },
  { name: 'Lavagens', icon: FaHandHoldingWater, path: '/all_washing' },
  { name: 'Manutenção', icon: FaTools, path: '/all_maintenance' },
  {
    name: 'Configurações',
    icon: TbReportSearch,
    subItems: [
      { name: 'Motoristas', icon: IoMan, path: '/drivers' },
      { name: 'Monitoras', icon: IoWomanSharp, path: '/monitors' },
    ],
  },
  
];


const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('blue.500', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      color={'white'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo/>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      
      {LinkItems.map((link) =>
        link.subItems ? (
          <Accordion allowToggle key={link.name} border="none" py={2}>
            <AccordionItem border="none">
              <AccordionButton
                _hover={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'none' }}
                display="flex"
                alignItems="center"
              >
                <Flex align="center" w="100%" textAlign="left">
                  <Box as={link.icon} mr="4" />
                  {link.name}
                </Flex>
                <AccordionIcon />
              </AccordionButton>
              
              <AccordionPanel p="0">
                {link.subItems.map((subLink) => (
                  <Flex
                    key={subLink.name}
                    py="2"
                    px="4"
                    cursor="pointer"
                    alignItems="center"
                    bg="blue.400"
                    _hover={{ bg: 'blue.400' }}
                    onClick={() => navigate(subLink.path)}
                  >
                    <Box as={subLink.icon} mr="4" />
                    <Text>{subLink.name}</Text>
                  </Flex>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : (
          <Flex
            key={link.name}
            py="4"
            px="4"
            cursor="pointer"
            alignItems="center"
            _hover={{ bg: 'blue.600', borderRadius: 'md' }}
            onClick={() => navigate(link.path)}
          >
            <Box as={link.icon} mr="4" />
            <Text>{link.name}</Text>
          </Flex>
        )
      )}
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    toast({
      title: "Login bem-sucedido",
      description: "Você foi deslogado com sucesso! Até breve!",
      status: "success",
      position: "top",
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {}, 2000);
    logout();
    navigate('/login');
  };
  
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      // height="20"
      height="6rem"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      
      <Logo/>

      <VStack justifyContent={'flex-start'} alignItems={'flex-start'} display={{ base: 'none', md: 'flex' }}>
        <Text
          fontSize="md"
          ml="2"
          color="brand.200"
          _dark={{ color: "white" }}
          fontWeight="semibold"
        >
          Pages / Dashboard
        </Text>
        
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{ color: "white" }}
          fontWeight="semibold"
        >
          Dashboard
        </Text>
      </VStack>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.email}
                  </Text>
                </VStack>

                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const Header = ({ children } : any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" bg={'white'}>
        {/* Content */}
        {children}
      </Box>
    </Box>
  )
}

export default Header
