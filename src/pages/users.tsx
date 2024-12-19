import {
  Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, VStack, Box, HStack,
  Stack, Avatar, Spinner, Input, InputGroup,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuMiniStatistics from '../components/MenuMiniStatistics';
// import { useParams } from 'react-router-dom';

// import PaginationContainer from '../components/Pagination';
// import UsersList from '../components/UsersList';
// import { BsDot } from 'react-icons/bs';

import { ImUserTie } from "react-icons/im";
import { MdCalendarMonth } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { FaArrowDownAZ } from "react-icons/fa6";
import { FaArrowDownZA } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaUserSecret } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa6";
import { FaFileArrowDown } from "react-icons/fa6";
import { FaFileArrowUp } from "react-icons/fa6";
// import { MdOutlineEmail } from "react-icons/md";

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { toastApiResponse } from '../components/Toast';
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import ModalDelete from '../components/ModalDelete';
import { FaSearch } from 'react-icons/fa';
import React from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  photo_filename: string;
  created_at: string;
  is_admin: string;
  admin: null | string;
  isBroker?: string;
  Broker_name?: string;
  Broker_phone?: string;
  Broker_address?: string;
  Broker_email?: string;
}

export default function Admin() {

  const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [allCurrentUsers, setAllCurrentUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const recordsPerPage = 100;

  const [dateCounts, setDateCounts] = useState({
    todayCount: 0,
    lastWeekCount: 0,
    lastMonthCount: 0
  });

  const statisticsData = [
    { bg: 'blue', icon: ImUserTie, name: 'Total', value: allUsers.length },
    { bg: 'blue', icon: IoMdSunny, name: 'Today', value: dateCounts.todayCount },
    { bg: '', icon: MdCalendarMonth, name: 'This week', value: dateCounts.lastWeekCount },
    { bg: '', icon: MdCalendarMonth, name: 'This month', value: dateCounts.lastMonthCount },  
    { bg: '', icon: MdCalendarMonth, name: 'This year', value: dateCounts.lastMonthCount },    
    { bg: '', icon: FaCircleUser, name: 'Customers', value: dateCounts.lastWeekCount },
    { bg: '', icon: FaUserShield, name: 'Brokers', value: dateCounts.lastMonthCount },
    { bg: 'blue', icon: FaUserSecret, name: 'Admin', value: allUsers.length },
    { bg: 'blue', icon: FaArrowDownAZ, name: '(A to Z)', value: allUsers.length },
    { bg: 'blue', icon: FaArrowDownZA, name: '(Z to A)', value: dateCounts.todayCount },
    { bg: 'blue', icon: FaFileArrowDown, name: 'New to Old', value: dateCounts.todayCount },
    { bg: '', icon: FaFileArrowUp, name: 'Old to New', value: dateCounts.lastWeekCount },
  ];

  // const quickFilters = [
  //   { label: 'Users (A to Z)', value: 'today' },
  //   { label: 'Users (Z to A)', value: 'lastWeek' },
  //   { label: 'Clients', value: 'lastMonth' },
  //   { label: 'Brokers', value: 'today' },
  //   { label: 'Admin', value: 'lastWeek' },
  //   { label: 'New to Old', value: 'lastMonth' },
  //   { label: 'Old to New', value: 'lastMonth' },
  // ];

  const calculateDateCounts = (allUsers: User[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastWeek = new Date(now.setDate(today.getDate() - 7));
    const lastMonth = new Date(now.setDate(today.getDate() - 30));

    let todayCount = 0;
    let lastWeekCount = 0;
    let lastMonthCount = 0;

    allUsers.map(user => {
      const userDate = new Date(user.created_at);
      if (userDate >= today) {
        todayCount++;
      }
      if (userDate >= lastWeek) {
        lastWeekCount++;
      }
      if (userDate >= lastMonth) {
        lastMonthCount++;
      }
    });

    return { todayCount, lastWeekCount, lastMonthCount };
  };

  const handlePortalAdmin = () => {
    navigate('/admin');
  };

  const openModal = (userId: any) => {
    setUserIdToDelete(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null);
  };

  const handleDeleteUserByID = (id: any) => {
    console.log(`Deleting user with ID: ${id}`);
    toastApiResponse(null, 'User deleted successfully!');
    closeModal();
    //So falta agora implentar o try e catch com a requisicao
  };

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await api.post('/user/list_all.php');
      const allUsersResponse = response.data;

      const sortedUsers = allUsersResponse.sort((a: any, b: any) => {
        const idA = parseInt(a.id);
        const idB = parseInt(b.id);
        return idB - idA;
      });

      setAllUsers(sortedUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load news details');
    }
  };

  const handleBoatsByUserId = (userID: string) => {
    localStorage.setItem('userID', userID);  // Armazena o userID no localStorage
    navigate(`/listBoatByUser/${userID}`);
  };

  const handleDashboardByUserId = (id: string, email: string, name:string) => {
    // Armazena o ID e o email como um objeto JSON
    const userInfo = { id, email, name};
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate('/dashboardClientsAndBrokers'); // Redireciona para a Tela 2
  };

  const handleProfiledByUserId = (id: string) => {
    // Armazena o ID e o email como um objeto JSON
    const userInfo = {id};
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    navigate('/editProfileClientsAndBrokers'); // Redireciona para a Tela 2
  };

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Isso garante que a rolagem seja suave.
    });
  }

  function updateCurrentBoats(pageNumber: any) {
    const startIndex = (pageNumber - 1) * recordsPerPage;
    const newCurrentBoats = allUsers.slice(startIndex, startIndex + recordsPerPage);
    setAllCurrentUsers(newCurrentBoats);
    setCurrentPage(pageNumber);
    scrollToTop();
  }

  const PaginationControls: React.FC<{
    currentPage: number,
    totalPages: number,
    setCurrentPage: (page: number) => void,
    updateCurrentPayments: (page: number) => void
  }> = ({ currentPage, totalPages, setCurrentPage, updateCurrentPayments }) => {

    const numPageButtons = 5;
    const halfPageRange = Math.floor(numPageButtons / 2);

    let startPage = Math.max(1, currentPage - halfPageRange);
    let endPage = Math.min(totalPages, startPage + numPageButtons - 1);

    if (endPage - startPage + 1 < numPageButtons) {
      startPage = Math.max(1, endPage - numPageButtons + 1);
    }

    const pages = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

    return (
      <Flex justifyContent="center" alignItems="center" p={4} gap={2}>
        <Button onClick={() => {
          setCurrentPage(1);
          updateCurrentPayments(1);
        }} disabled={currentPage === 1}>&laquo;</Button>

        {pages.map(page => (
          <Button
            key={page}
            colorScheme={page === currentPage ? "blue" : "gray"}
            onClick={() => {
              setCurrentPage(page);
              updateCurrentPayments(page);
            }}
          >
            {page}
          </Button>
        ))}

        <Button onClick={() => {
          setCurrentPage(totalPages);
          updateCurrentPayments(totalPages);
        }} disabled={currentPage === totalPages}>&raquo;
        </Button>
      </Flex>
    );
  };

  const handleSearch = () => {
    // setIsSearching(true); // Indica que estamos buscando
    // const results = allCurrentUsers.filter(
    //   (user) =>
    //     user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    //     user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
    //     user.phone_number.includes(inputValue)
    // );
    // setSearchResults(results);

    setLoading(true); // Ativa o loading
    setTimeout(() => {
      const results = allCurrentUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
          user.phone_number.includes(inputValue)
      );
      setSearchResults(results);
      setLoading(false); // Desativa o loading
      setIsSearching(true);
    }, 1000); // Simula um atraso de 1 segundo para testes
  };

  // Filtra os usuários cadastrados hoje
  const filterUsersRegisteredToday = () => {
    setIsSearching(true); // Ativa o modo de pesquisa
    const today = new Date().toISOString().split("T")[0];
    const results = allCurrentUsers.filter((user) => user.created_at.startsWith(today));
    setSearchResults(results);

    // setLoading(true); // Ativa o loading
    // setTimeout(() => {
    //   const today = new Date().toISOString().split("T")[0];
    //   const results = allCurrentUsers.filter((user) => user.created_at.startsWith(today));
    //   setSearchResults(results);
    //   setLoading(false); // Desativa o loading
    //   setIsSearching(true);
    // }, 2000); // Simula um atraso de 1 segundo para testes
  };

  // Função para filtrar usuários cadastrados nesta semana
  const filterUsersRegisteredThisWeek = () => {
    setIsSearching(true);
  
    // Data atual e limite de 7 dias atrás
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Fim do dia atual
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0); // Início do dia limite
  
    const results = allCurrentUsers.filter((user) => {
      const userDate = new Date(user.created_at.replace(" ", "T")); // Formata a data
      return userDate >= sevenDaysAgo && userDate <= today;
    });

    setSearchResults(results);
  };

  const filterUsersRegisteredThisMonth = () => {
    setIsSearching(true);
  
    // Obter o mês e o ano atuais
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Primeiro dia do mês
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Último dia do mês
    endOfMonth.setHours(23, 59, 59, 999); // Final do último dia do mês
  
    const results = allCurrentUsers.filter((user) => {
      const userDate = new Date(user.created_at.replace(" ", "T")); // Formata a data
      return userDate >= startOfMonth && userDate <= endOfMonth;
    });
  
    setSearchResults(results);
  };
  

  // Filtra os usuários cadastrados este ano
  const filterUsersRegisteredThisYear = () => {
    setIsSearching(true);
    const currentYear = new Date().getFullYear(); // Obtém o ano atual
    const results = allCurrentUsers.filter((user) =>
      user.created_at.startsWith(currentYear.toString())
    );
    setSearchResults(results);
  };

  // Filtrar usuários clientes (is_admin === "0")
  const filterCustomers = () => {
    setIsSearching(true);
    const results = allCurrentUsers.filter((user) => user.is_admin === "0");
    setSearchResults(results);

    // setLoading(true); // Ativa o loading
    // setTimeout(() => {
    //   const results = allCurrentUsers.filter((user) => user.is_admin === "0");
    //   setSearchResults(results);
    //   setLoading(false); // Desativa o loading
    //   setIsSearching(true);
    // }, 2000); // Simula um atraso de 1 segundo para testes
  };

  // Filtrar usuários admin (is_admin === "1")
  const filterAdmin = () => {
    setIsSearching(true);
    const results = allCurrentUsers.filter((user) => user.is_admin === "1");
    setSearchResults(results);
  };

  // Filtrar usuários admin (is_admin === "1")
  const filterBroker = () => {
    setIsSearching(true);
    const results = allCurrentUsers.filter((user) => user.isBroker === "1");
    setSearchResults(results);
  };

  // Ordenar em ordem alfabética crescente
  const sortAscending = () => {
    setIsSearching(true);
    const sortedResults = [...allCurrentUsers].sort((a, b) => a.name.localeCompare(b.name));
    setSearchResults(sortedResults);
  };

  // Ordenar em ordem alfabética decrescente
  const sortDescending = () => {
    setIsSearching(true);
    const sortedResults = [...allCurrentUsers].sort((a, b) => b.name.localeCompare(a.name));
    setSearchResults(sortedResults);
  };

  // Ordenar por data de cadastro mais recente para o mais antigo
  const sortByNewest = () => {
    setIsSearching(true);
    const sortedResults = [...allCurrentUsers].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setSearchResults(sortedResults);
  };

  // Ordenar por data de cadastro mais antigo para o mais recente
  const sortByOldest = () => {
    setIsSearching(true);
    const sortedResults = [...allCurrentUsers].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
    setSearchResults(sortedResults);
  };

  const resetSearch = () => {
    setIsSearching(false);
    setInputValue("");
    setSearchResults([]);
  };

  const usersToDisplay = isSearching && searchResults.length > 0 ? searchResults : allCurrentUsers;

  const openProfile = (user: any) => {
    setSelectedUser(user);
    onOpen();
  };

  useEffect(() => {
    const newTotalPages = Math.ceil(allUsers.length / recordsPerPage);
    setTotalPages(newTotalPages);
    updateCurrentBoats(1);
  }, [allUsers]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const counts = calculateDateCounts(allUsers);
    setDateCounts(counts);
  }, [allUsers]);

  return (
    <>
      {user?.is_admin == '1' ? (
        <Flex direction="column" height="100%" bg="white">
          <Header />

          {/* <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 1 }}
          > */}
          <SimpleGrid
            columns={{ base: 1, md: 1, lg: 1 }}
            spacing={3}
            w="100%"
            maxWidth={1480}
            mx='auto'
            mt={5}
            px={3}
          >
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Box justifyContent={'flex-start'} alignItems={'center'}>
                <Text
                  color={textColorPrimary}
                  fontWeight="bold"
                  fontSize="2xl"
                  mt="5px"
                  textAlign="left"
                >
                  All about the users
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                  This place you can see all data about the users
                </Text>
              </Box>

              <HStack>
                <Button bg='gray.50' w='auto' h={'80px'} onClick={handlePortalAdmin}>
                  <VStack pt={0}>
                    <Icon as={ImUserTie} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Portal admin</Text>
                  </VStack>
                </Button>

                {/* <Button bg='yellow.200' w='auto' h={'80px'} onClick={resetSearch}>
                  <VStack pt={0}>
                    <Icon as={ImUserTie} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>All users</Text>
                  </VStack>
                </Button> */}
              </HStack>
            </HStack>

            <Divider />
          </SimpleGrid>
          {/* </motion.div> */}

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              All statistics users
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 4, "2xl": 8 }}
              gap='20px'
              spacing={10}
              my='20px'
              w="100%"
              maxWidth={1480}
              mx='auto'
            >
              {statisticsData.map((data, index) => (
                <MenuMiniStatistics key={index} {...data} />
              ))}
            </SimpleGrid>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 150 }}
            transition={{ duration: 0.8 }}
            style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <Card bg={'bg'} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
              <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
                List users
              </Text>

              <Flex gap={2} my={5} justifyContent={'center'}>
                <Button colorScheme="blue" onClick={resetSearch}>
                  Todos
                </Button>
                <Button colorScheme="blue" onClick={filterUsersRegisteredToday}>
                  Hoje
                </Button>
                <Button colorScheme="blue" onClick={filterUsersRegisteredThisWeek}>
                  Esta Semana
                </Button>
                <Button colorScheme="blue" onClick={filterUsersRegisteredThisMonth}>
                  Este Mês
                </Button>
                <Button colorScheme="blue" onClick={filterUsersRegisteredThisYear}>
                  Este Ano
                </Button>
                <Button colorScheme="blue" onClick={filterCustomers}>
                  Customers
                </Button>
                <Button colorScheme="blue" onClick={filterAdmin}>
                  Admin
                </Button>
                <Button colorScheme="blue" onClick={filterBroker}>
                  Broker
                </Button>
                <Button colorScheme="blue" onClick={sortAscending}>
                  Ordem Crescente
                </Button>
                <Button colorScheme="blue" onClick={sortDescending}>
                  Ordem Decrescente
                </Button>
                <Button colorScheme="blue" onClick={sortByNewest}>
                  Mais Recente
                </Button>
                <Button colorScheme="blue" onClick={sortByOldest}>
                  Mais Antigo
                </Button>                
              </Flex>

              {isSearching && (
                <Text mb={4} fontWeight="bold" fontSize={'xl'}>
                  {searchResults.length} {searchResults.length === 1 ? "Profile Found" : "Profiles Found"}
                </Text>
              )}

              <Flex my={5} mx={10} gap={5}>
                <InputGroup size="lg">
                  <Input
                    // pr="4.5rem"
                    type="text"
                    placeholder="Search..."
                    borderRadius="full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </InputGroup>

                <Button
                  h="3rem"
                  size="lg"
                  bg="blue.500"
                  _hover={{ bg: "blue.200" }}
                  borderRadius="full"
                  leftIcon={<FaSearch />}
                  onClick={handleSearch}
                  color={'white'}
                  fontSize={'md'}
                >
                  Search
                </Button>
              </Flex>

              {loading ?
                <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
                </Stack>
                :
                <Flex direction="column" mt={4}>
                  {isSearching && searchResults.length === 0 ? (
                    <Flex direction="column" align="center">
                      <Box fontSize="48px" color="gray.500">
                        <FaRegFaceSadCry />
                      </Box>

                      <Text my={5}>Sorry! This user can not be found! Try again...</Text>

                      <Button mb={2} colorScheme="blue" onClick={resetSearch}>
                        Display All Users
                      </Button>
                    </Flex>
                  ) : (
                    usersToDisplay.map((user, index) => (
                      <React.Fragment key={index}>
                        <Flex
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          _hover={{ bg: useColorModeValue("white", "white") }}
                        >
                          <Flex
                            align="center"
                            justify="space-between"
                            direction={{ base: "column", md: "row" }}
                            width="100%"
                            p={4}
                          >
                            {/* Informações do Usuário */}
                            <Flex align="center">
                              <Avatar size="md" name={user.name} src={user.photo_filename} />
                              <Flex direction="column" ml={4}>
                                <Text
                                  color={useColorModeValue("blue.300", "white")}
                                  fontSize={{ base: "sm", sm: "md", md: "lg" }}
                                  fontWeight={"semibold"}
                                  dangerouslySetInnerHTML={{ __html: user.name }}
                                />
                                <Text color={useColorModeValue("gray.400", "gray.200")} fontSize={{ base: "sm", sm: "md" }}>
                                  Registered at: {user.created_at}
                                </Text>
                                {user.phone_number !== "" && (
                                  <Text color={useColorModeValue("gray.400", "gray.200")} fontSize={{ base: "sm", sm: "md" }}>
                                    Phone number: {user.phone_number}
                                  </Text>
                                )}
                                <Text color={useColorModeValue("gray.400", "gray.200")} fontSize={{ base: "sm", sm: "md" }}>
                                  Status user: {user.is_admin === "0" ? "Customer" : "Administrator"}
                                </Text>
                                <Text color={useColorModeValue("gray.400", "gray.200")} fontSize={{ base: "sm", sm: "md" }}>
                                  {user.email}
                                </Text>
                              </Flex>
                            </Flex>

                            {/* Botões */}
                            <SimpleGrid
                              columns={{ base: 2, md: 3, lg: 3, xl:5 }}
                              spacing={4} 
                              mt={{ base: 4, md: 0 }}
                            >
                              <Button 
                                bg={"gray.100"} 
                                color={"gray.900"} 
                                gap={2}  
                                onClick={() => openProfile(user)}
                              >
                                <Icon as={ImUserTie} color={"gray.900"} h="1rem" w="1rem" />                                
                                Info
                              </Button>

                              <Button 
                                bg={"blue.500"} 
                                color={"white"} 
                                gap={2} 
                                onClick={() => handleProfiledByUserId(user.id)}
                              >                              
                                <Icon as={ImUserTie} color={"white"} h="1rem" w="1rem" />
                                Perfil
                              </Button>

                              <Button bg={"lightblue"} color={"gray.900"} gap={2} onClick={() => handleBoatsByUserId(user.id)}>
                                <Icon as={MdOutlineDashboardCustomize} color={"gray.900"} h="1rem" w="1rem" />
                                  Inventory
                              </Button>

                              <Button 
                                bg={"yellow.200"} 
                                color={"gray.900"} 
                                gap={2} 
                                onClick={() => handleDashboardByUserId(user.id, user.email, user.name)}
                              >
                                <Icon as={MdOutlineDashboardCustomize} color={"gray.900"} h="1rem" w="1rem" />
                                Dashboard
                              </Button>

                              <Button bg={"red.700"} color={"white"} gap={2} onClick={() => openModal(user.id)}>
                                <Icon as={FaRegTrashCan} color={"white"} h="1rem" w="1rem" />
                                Delete
                              </Button>
                            </SimpleGrid>
                          </Flex>
                        </Flex>
                        <Divider m={0} />
                      </React.Fragment>
                    ))
                  )}
                </Flex>
              }

              {/* Modal para exibir o perfil */}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>User Information</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    {selectedUser && (
                      <Flex direction="column" gap={2}>
                        <Avatar size="xl" name={selectedUser.name} src={selectedUser.photo_filename} />
                        <Text><strong>Name:</strong> {selectedUser.name}</Text>
                        <Text><strong>Email:</strong> {selectedUser.email}</Text>
                        <Text><strong>Phone Number:</strong> {selectedUser.phone_number}</Text>
                        <Text><strong>Registered at:</strong> {selectedUser.created_at}</Text>
                        <Text><strong>Status:</strong> {selectedUser.is_admin === "0" ? "Client" : "Administrador"}</Text>
                        {selectedUser.isBroker === "1" && (
                          <>
                            <Text><strong>Broker name:</strong> {selectedUser.Broker_name}</Text>
                            <Text><strong>Broker phone:</strong> {selectedUser.Broker_phone}</Text>
                            <Text><strong>Broker Address:</strong> {selectedUser.Broker_address}</Text>
                            <Text><strong>Broker Email:</strong> {selectedUser.Broker_email}</Text>
                          </>
                        )}
                      </Flex>
                    )}
                  </ModalBody>
                </ModalContent>
              </Modal>

              {isModalOpen && (
                <ModalDelete
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onClick={() => handleDeleteUserByID(userIdToDelete)}
                  // onClick={handleDeleteUserByID} 
                  // onClick={() => handleDeleteUserByID(user.id)}
                  // isLoading={isLoading}
                  title={'Once you delete this user, there is no going back. Please be certain.'}
                />
              )}

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                updateCurrentPayments={updateCurrentBoats}
              />
            </Card>
          </motion.div>

          <ToastContainer />
          <Footer />
        </Flex>
      ) : (
        navigate('/')
      )}
    </>
  )
}