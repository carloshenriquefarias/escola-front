import {
  Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, Box, HStack,
  Stack, Avatar, Spinner, Input, InputGroup,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';

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

// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { toastApiResponse } from '../components/Toast';
import { FaRegTrashCan } from "react-icons/fa6";
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

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Admin() {

  // const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  // const navigate = useNavigate();
  const textColorSecondary = "gray.400";

  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // const [currentDataUser, setCurrentDataUser] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | undefined | null>(null);

  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const statisticsData = [
    { bg: 'blue', icon: ImUserTie, name: 'Total', value: allUsers.length },
    { bg: 'blue', icon: IoMdSunny, name: 'Today', value: '5' },
    { bg: '', icon: MdCalendarMonth, name: 'This week', value: '7' },
    { bg: '', icon: MdCalendarMonth, name: 'This month', value: '8' },  
    { bg: '', icon: MdCalendarMonth, name: 'This year', value: '11' },   
    { bg: '', icon: MdCalendarMonth, name: 'This year', value: '10' },  
  ];

  // const handlePortalAdmin = () => {
  //   navigate('/admin');
  // };

  const openModal = (userId: any) => {
    setUserIdToDelete(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null);
  };

  const openProfile = (user: any) => {
    setSelectedUser(user);
    onOpen();
  };

  // const handleDeleteUserByID = (id: number) => {
  //   console.log(`Deleting user with ID: ${id}`);
  //   toastApiResponse(null, 'User deleted successfully!');
  //   closeModal();
  //   //So falta agora implentar o try e catch com a requisicao
  // };

  const fetchAllUsers = async () => {
    try {
      const response = await api.get('/users');
      const allUsers = response.data.users;
      setAllUsers(allUsers);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    }
  };

  const handleDeleteUserByID = async (id: number) => {
    try {
      const response = await api.post('/users/delete', {
        id: id
      });

      if (response.data.status === true) {        
        toastApiResponse(null, 'User deleted successfully!');
        closeModal();
      }

      fetchAllUsers();
      
    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    }
  };

  // const handleProfiledByUserId = (id: string) => {
  //   // Armazena o ID e o email como um objeto JSON
  //   const userInfo = {id};
  //   localStorage.setItem('userInfo', JSON.stringify(userInfo));
  //   navigate('/editProfileClientsAndBrokers'); // Redireciona para a Tela 2
  // };

  // function scrollToTop() {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth' // Isso garante que a rolagem seja suave.
  //   });
  // }

  const handleSearch = () => {

    setLoading(true); // Ativa o loading
    setTimeout(() => {
      // const results = allCurrentUsers.filter(
      //   (user) =>
      //     user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      //     user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
      //     user.phone_number.includes(inputValue)
      // );
      // setSearchResults(results);
      setLoading(false); // Desativa o loading
      setIsSearching(true);
    }, 1000); // Simula um atraso de 1 segundo para testes
  }; 

  const resetSearch = () => {
    setIsSearching(false);
    setInputValue("");
    setSearchResults([]);
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: 'Rike',
      email: 'rike@email.com',
      password: '',
      confirmPassword: '',
    },
  });

  const toast = useToast();

  const onSubmit = (data: ProfileFormData) => {
    // Here you would typically send the data to your API
    console.log(data);
    toast({
      title: 'Profile Updated',
      description: "We've updated your profile for you.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const password = watch('password');

  // const usersToDisplay = isSearching && searchResults.length > 0 ? searchResults : allUsers;

  useEffect(() => {
    fetchAllUsers();
    // fetchUserByID();
  }, []);

  return (
    <>
      {/* {user?.is_admin == '1' ? ( */}
        <Flex direction="column" height="100%" bg="white">
          <Header>

          <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 0.7 }}
          >
            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 1 }}
              spacing={3}
              w="100%"
              mx='auto'
              mt={0}
              p={3}
              bg={'gray.50'}
              borderRadius={10}
            >
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Box justifyContent={'flex-start'} alignItems={'center'}>
                  <Text
                    color={'blue.300'}
                    fontWeight="semibold"
                    fontSize="2xl"
                    mt="5px"
                    textAlign="left"
                  >
                    Usuários do sistema
                  </Text>

                  <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                    Todas as informações sobre os usuarios do Contrans
                  </Text>
                </Box>
              </HStack>
            </SimpleGrid>
          </motion.div>

          <Card boxShadow={cardShadow} my='10px' p={5} w="100%" borderRadius={10} bg={bg}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Estatisticas e dados sobre os usuarios
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
              spacing={4}
              w="100%"
              mt={5}
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
            <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} w="100%" mx='auto' borderRadius={10}>
              <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
                Lista de todos os usuarios
              </Text>

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
                    allUsers.map((user, index) => (
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
                              columns={{ base: 1, md: 1 }}
                              spacing={4} 
                              mt={{ base: 4, md: 0 }}
                            >
                              <Button 
                                bg={"blue.300"} 
                                color={"white"} 
                                gap={2} 
                                // onClick={() => handleProfiledByUserId(user.id)}
                                fontSize={'sm'}
                                onClick={() => openProfile(user)}
                              >                              
                                <Icon as={ImUserTie} color={"white"} h="1rem" w="1rem" />
                                Editar Perfil
                              </Button>

                              <Button 
                                bg={"red.700"} 
                                color={"white"} 
                                gap={2} 
                                onClick={() => openModal(user.id)} 
                                fontSize={'sm'}
                                isLoading={loading} 
                              >
                                <Icon as={FaRegTrashCan} color={"white"} h="1rem" w="1rem" />
                                Deletar usuario
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
                  <ModalCloseButton />
                  <ModalBody>
                    {selectedUser && (
                      // <Flex direction="column" gap={2}>
                      //   <Avatar size="xl" name={selectedUser.name} src={selectedUser.photo_filename} />
                      //   <Text><strong>Name:</strong> {selectedUser.name}</Text>
                      //   <Text><strong>Email:</strong> {selectedUser.email}</Text>
                      //   <Text><strong>Phone Number:</strong> {selectedUser.phone_number}</Text>
                      //   <Text><strong>Registered at:</strong> {selectedUser.created_at}</Text>
                      //   <Text><strong>Status:</strong> {selectedUser.is_admin === "0" ? "Client" : "Administrador"}</Text>
                      //   {selectedUser.isBroker === "1" && (
                      //     <>
                      //       <Text><strong>Broker name:</strong> {selectedUser.Broker_name}</Text>
                      //       <Text><strong>Broker phone:</strong> {selectedUser.Broker_phone}</Text>
                      //       <Text><strong>Broker Address:</strong> {selectedUser.Broker_address}</Text>
                      //       <Text><strong>Broker Email:</strong> {selectedUser.Broker_email}</Text>
                      //     </>
                      //   )}
                      // </Flex>

                      <Box maxWidth="500px" margin="auto" my={4}>
                        <Heading mb={6} fontSize={'2xl'}>Edit Profile</Heading>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <VStack spacing={4}>
                            <Controller
                              name="name"
                              control={control}
                              rules={{ required: 'Name is required' }}
                              render={({ field }) => (
                                <FormControl isInvalid={!!errors.name}>
                                  <FormLabel>Name</FormLabel>
                                  <Input {...field} />
                                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                                </FormControl>
                              )}
                            />

                            <Controller
                              name="email"
                              control={control}
                              rules={{
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address',
                                },
                              }}
                              render={({ field }) => (
                                <FormControl isInvalid={!!errors.email}>
                                  <FormLabel>Email</FormLabel>
                                  <Input {...field} type="email" />
                                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                                </FormControl>
                              )}
                            />

                            <Controller
                              name="password"
                              control={control}
                              rules={{
                                minLength: {
                                  value: 6,
                                  message: 'Password must be at least 6 characters',
                                },
                              }}
                              render={({ field }) => (
                                <FormControl isInvalid={!!errors.password}>
                                  <FormLabel>New Password (optional)</FormLabel>
                                  <Input {...field} type="password" />
                                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                                </FormControl>
                              )}
                            />

                            <Controller
                              name="confirmPassword"
                              control={control}
                              rules={{
                                validate: (value) =>
                                  !password || value === password || 'The passwords do not match',
                              }}
                              render={({ field }) => (
                                <FormControl isInvalid={!!errors.confirmPassword}>
                                  <FormLabel>Confirm New Password</FormLabel>
                                  <Input {...field} type="password" />
                                  <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                                </FormControl>
                              )}
                            />

                            <Button
                              mt={4}
                              colorScheme="blue"
                              isLoading={isSubmitting}
                              type="submit"
                              width="full"
                            >
                              Update Profile
                            </Button>
                          </VStack>
                        </form>
                      </Box>
                    )}
                  </ModalBody>
                </ModalContent>
              </Modal>

              {/* Modal para exibir o perfil */}
              {isModalOpen && (
                <ModalDelete
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onClick={() => {
                    if (typeof userIdToDelete === 'number') {
                      handleDeleteUserByID(userIdToDelete);
                    }
                  }}
                  // onClick={() => handleDeleteUserByID(userIdToDelete)}
                  // onClick={handleDeleteUserByID} 
                  // onClick={() => handleDeleteUserByID(user.id)}
                  // isLoading={isLoading}
                  title={'Once you delete this user, there is no going back. Please be certain.'}
                />
              )}

            </Card>
          </motion.div>

          <ToastContainer />
          <Footer />

          </Header>
        </Flex>
      {/* ) : (
        navigate('/')
      )} */}
    </>
  )
}