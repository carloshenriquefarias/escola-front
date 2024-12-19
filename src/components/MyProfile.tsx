import {
  Text, useColorModeValue, Box, Input, SimpleGrid, Divider, FormControl, FormLabel,
  HStack, Button, VStack, Icon, Center, Stack, useBreakpointValue,
  Switch, Accordion, AccordionItem, AccordionButton, AccordionPanel,
  AccordionIcon, Image
} from "@chakra-ui/react";

import Card from "./Card";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { FcOk } from "react-icons/fc";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { toastApiResponse } from "./Toast";
import { HiLockOpen } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi";
import Loading from "./Loading";
// import ModalPayment from "./ModalPayment";

interface CustomFile extends File {
  preview: string;
}

interface User {
  id?: string;
  name?: string;
  email?: string;
  phone_number?: string;
  photo_filename?: string;
  created_at?: string;
  is_admin?: string;
  admin?: null | string;
  isBroker?: number;
  Broker_name?: string;
  Broker_phone?: string;
  Broker_address?: string;
  Broker_email?: string;
}

export default function MyProfile() {

  // const [isModalOpen, setIsModalOpen] = useState(false); // NAO DELETAR SERA IMPORTANTE NA HORA DO STRIPE

  const { user, setUserData } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const userIdCurrent = user && user.id ? user.id.toString() : '';
  const navigate = useNavigate();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const [isEditableInfo, setIsEditableInfo] = useState(false);
  const [isEditableBroker, setIsEditableBroker] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setUserDataCurrent] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    id: '', name: '', email: '', phone_number: '', currentPassword: '', photo_filename: '', newPassword: '', confirmPassword: '', typeUser: '',
    isBroker: 0, brokerCompanyName: '', brokerEmail: '', brokerPhone: '', brokerAddress: ''
  });

  // NAO DELETAR POIS SERA IMPORTANTE NA HORA DO STRIPE

  // const allFieldsFilled = 
  // formData.brokerCompanyName !== '' && 
  // formData.brokerEmail !== '' && 
  // formData.brokerPhone !== '' && 
  // formData.brokerAddress !== '';

  const data = {
    id: user?.id.toString() ?? '',
    name: formData?.name ?? '',
    email: formData?.email ?? '',
    phone_number: formData?.phone_number ?? '',
    currentPassword: user?.password ?? '',
    newPassword: formData?.newPassword ?? '',
    confirmPassword: formData?.confirmPassword ?? '',
    photo_filename: formData?.photo_filename ?? '',
    typeUser: formData?.typeUser ?? '',
    isBroker: formData?.isBroker ?? '',
    brokerCompanyName: formData?.brokerCompanyName ?? '',
    brokerEmail: formData?.brokerEmail ?? '',
    brokerPhone: formData?.brokerPhone ?? '',
    brokerAddress: formData?.brokerAddress ?? '',
  };

  const fillFormWithData = () => {
    setFormData({
      id: data.id,
      name: data.name,
      email: data.email,
      phone_number: data.phone_number ?? '',
      currentPassword: data.currentPassword,
      newPassword: data?.newPassword ?? '',
      confirmPassword: data?.confirmPassword ?? '',
      photo_filename: data?.photo_filename, //qualquer coisa so troca o photo_filename por photo
      typeUser: data?.typeUser ?? '',
      isBroker: data?.isBroker ?? '',
      brokerCompanyName: data?.brokerCompanyName ?? '',
      brokerEmail: data?.brokerEmail ?? '',
      brokerPhone: data?.brokerPhone ?? '',
      brokerAddress: data?.brokerAddress ?? '',
    });
  };

  const fetchUserLogged = async () => {
    setIsLoadingData(true);

    // if (!userIdCurrent) {
    //   setIsLoading(false);
    //   return;
    // }

    try {
      const response = await api.get(`/user/me.php?id=${userIdCurrent}`);
      const userLogged = response.data;

      setFormData((prevData) => {
        if (userLogged.isBroker === 1) {
          // Se `isBroker` for 1, preencha os dados de corretor
          return {
            ...prevData,
            name: userLogged.name || '',
            email: userLogged.email || '',
            phone_number: userLogged.phone_number || '',
            photo_filename: userLogged.photo_filename || '',
            isBroker: userLogged.isBroker || '',
            brokerCompanyName: userLogged.Broker_name || '',
            brokerEmail: userLogged.Broker_email || '',
            brokerPhone: userLogged.Broker_phone || '',
            brokerAddress: userLogged.Broker_address || '',
          };

        } else if (userLogged.is_admin === 0) {
          // Se `isBroker` for 0 e `is_admin` for 0, esvazie os dados de corretor
          return {
            ...prevData,
            name: userLogged.name || '',
            email: userLogged.email || '',
            phone_number: userLogged.phone_number || '',
            photo_filename: userLogged.photo_filename || '',
            isBroker: 0,
            brokerCompanyName: '',
            brokerEmail: '',
            brokerPhone: '',
            brokerAddress: '',
          };

        } else {
          // Caso nenhuma condição seja atendida, retorne os dados sem alterações
          return prevData;
        }
      });

      setTimeout(() => {
        setIsLoadingData(false);
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');

    } finally {
      setIsLoading(false);
    }
  };

  const toggleBrokerInput = (event: any) => {
    setFormData((prevData) => ({
      ...prevData,
      isBroker: event.target.checked ? 1 : 0,
    }));
  };

  // Função para alternar entre modos (editável/salvar)
  const handleClickChangeInfo = useCallback(() => {
    if (isEditableInfo) {
      setIsEditableInfo(false); 
    } else {
      enableEditing();
    }
  }, [isEditableInfo]);

  // Ativar modo de edição user
  const enableEditing = useCallback(() => {
    setIsEditableInfo(true);
  }, []);

  // Função para alternar entre modos (editável/salvar)
  const handleClickChangeBroker = useCallback(() => {
    if (isEditableBroker) {
      setIsEditableBroker(false); 
    } else {
      enableEditingBroker();
    }
  }, [isEditableBroker]);

  // Ativar modo de edição broker
  const enableEditingBroker = useCallback(() => {
    setIsEditableBroker(true);
  }, []);

  // NAO DELETAR POIS SERA IMPORTANTE NA HORA DO STRIPE

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  //Dropzone
  const [files, setFiles] = useState<CustomFile[]>([]);
  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png", ".jpg"],
      "text/html": [".html", ".htm"],
    },
    onDrop: (acceptedFiles) => {
      const updatedFiles: CustomFile[] = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(updatedFiles);
    },
  });

  const Preview = files.map((file) => (
    <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
      <Box position="relative">
        {file.type.startsWith("image/") ? (
          <img src={file.preview} alt={file.name} width="100%" height="100%" />
        ) : (
          <iframe src={file.preview} title={file.name} width="100%" height="300px" />
        )}
      </Box>
    </Box>
  ));

  // const reloadPage = () => {
  //   location.reload();
  // }

  const handleUpdateProfile = async () => {
    try {

      // if (!isEditableInfo || !isEditableBroker) {
      //   return;
      // }

      setIsLoading(true);

      if (formData.newPassword === formData.currentPassword && formData.newPassword !== '') {
        toastApiResponse(null, 'The new password and the current password are the same! Please enter a different new password.');
        setIsLoading(false);
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toastApiResponse(null, 'The new password does not match the confirmation password. Please verify your passwords.', 'warning');
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("id", formData.id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone_number", formData.phone_number);

      if (formData.newPassword !== '') {
        formDataToSend.append("password", formData.newPassword);
      }

      if (formData.isBroker == 0) {
        formDataToSend.append("isBroker", formData.isBroker.toString());
        formDataToSend.append("Broker_name", '');
        formDataToSend.append("broker_phone", '');
        formDataToSend.append("Broker_address", '');
        formDataToSend.append("Broker_email", '');
      }

      if (formData.isBroker == 1) {
        formDataToSend.append("isBroker", formData.isBroker.toString());
        formDataToSend.append("Broker_name", formData?.brokerCompanyName || '');
        formDataToSend.append("Broker_phone", formData?.brokerPhone || '');
        formDataToSend.append("Broker_address", formData?.brokerAddress || '');
        formDataToSend.append("Broker_email", formData?.brokerEmail || '');
      }

      if (files.length > 0) {
        const imageFile = new File([files[0]], 'photo.jpg', { type: files[0].type });
        formDataToSend.append('photo', imageFile);
      }

      // if (files.length > 0 || formData.photo_filename) {        
      //   const imageFile = new File([files[0]], 'photo.jpg', { type: (files as any).type  });
      //   formDataToSend.append('photo', imageFile);        
      // }

      const response = await api.post('/user/update_by_id.php', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        setUserData();
        toastApiResponse(response, response.data.message);

      } else {
        throw new Error('Fail to update profile');
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsEditableInfo(false); // Voltar para o modo não editável após salvar
      setIsEditableBroker(false); // Voltar para o modo não editável após salvar
      setIsLoading(false);
      // reloadPage();
      // navigate(`/dashboard`);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
      
    } finally {
      setIsLoading(false);
    }
  }

  const fetchDataUser = async () => {
    if (!userIdCurrent) {
      navigate('/dashboard');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/user/list_all.php');
      const allUsers = response.data;
      const userData = allUsers.find((u: User) => u.id === userIdCurrent);
      if (userData) {
        setUserDataCurrent(userData);
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Error:', error);
      alert('It is not possible to list this user! Please try again!');
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fillFormWithData();
    fetchDataUser(); // If not exist user loggeed redirect to home page
  }, [userIdCurrent]);

  useEffect(() => {
    fetchUserLogged();
  }, []);

  return (
    <>
      {isLoadingData ?
        <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={700}>
          <VStack>          
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='2xl'
              mt='5px'
              mb='5px'
            >
              Please wait...
            </Text>
            <Text
              color={textColorPrimary}
              fontWeight='bold'
              fontSize='2xl'
              mt='5px'
              mb='5px'
            >
              We are loading your information
            </Text>
            <Loading/>
          </VStack>
        </Card>
        :
        <>
          {user ? (
            <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={700}>
              <Text
                color={textColorPrimary}
                fontWeight='bold'
                fontSize='2xl'
                mt='5px'
                mb='5px'
              >
                Edit Profile
              </Text>

              <Text color={textColorSecondary} fontSize='md' me='26px' mb='15px'>
                Change your name, email, password and other informations on your account
              </Text>

              {/* Card de informações do usuario */}
              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={5} borderRadius={10}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                  <HStack justifyContent={'flex-start'} alignItems={'center'} w={'100%'}>
                    <Text
                      color={textColorPrimary}
                      fontWeight='bold'
                      fontSize='lg'
                    >
                      Your Information
                    </Text>

                    {isEditableInfo ?
                      <Icon as={HiLockOpen} color={'blue.300'} h='2rem' w='2rem' />
                      :
                      <Icon as={HiLockClosed} color={'blue.300'} h='2rem' w='2rem' />
                    }
                  </HStack>

                  {/* Save basic information  */}
                  <Box gap={2} justifyContent="space-between">
                    <Button
                      onClick={() => handleClickChangeInfo()}
                      bg={isEditableInfo ? 'green.700' : 'blue.400'}
                      color="white"
                      // isLoading={isLoading}
                      _hover={{ bg: isEditableInfo ? 'green.500' : 'blue.500' }}
                      w="100%"
                      h="4vh"
                      gap={3}
                    >
                      {isEditableInfo ?
                        <Icon as={HiLockOpen} color={'white'} h='1rem' w='1rem' />
                        :
                        <Icon as={HiLockClosed} color={'white'} h='1rem' w='1rem' />
                      }

                      <HStack>
                        <Text fontSize={['sm', 'md']}>
                          {isEditableInfo ? 'Edit Info' : 'Edit Info'}
                        </Text>
                      </HStack>
                    </Button>
                  </Box>
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={0} bg='white' my={5}>
                  <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={2} >
                      {files.length === 0 ? (
                        <Image
                          src={`https://techsoluctionscold.com.br/api-boats/uploads/${formData?.photo_filename}`}                      
                          alt=""
                          w="20%"
                          maxH={150}
                          objectFit="scale-down"
                          borderRadius={3}
                        /> 
                        // <Avatar src={`https://techsoluctionscold.com.br/api-boats/uploads/${formData?.photo_filename}`} />
                      ) : (
                        <VStack spacing={0}>
                          <Center w='80%'>
                            <Box
                              {...getRootProps({ className: "dropzone" })}
                              w="110px"
                              h="110px"
                              borderRadius="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              cursor={'pointer'}
                            >
                              <input {...getInputProps()} />
                              {Preview}
                            </Box>
                          </Center>
                        </VStack>
                      )}

                      <Stack justifyContent={'flex-start'} alignItems={'flex-start'}>
                        <Text
                          color={textColorPrimary}
                          fontWeight='bold'
                          fontSize='lg'
                          textAlign={'left'}
                        >
                          {formData?.name}
                        </Text>

                        <Text
                          color={textColorPrimary}
                          fontWeight='thin'
                          fontSize='sm'
                          textAlign={'left'}
                        >
                          {formData?.email}
                        </Text>
                      </Stack>
                    </HStack>

                    <VStack>
                      <Button
                        bg={!isEditableInfo ? 'gray.300' : 'blue.400'}
                        color={'white'}
                        onClick={open}
                        size={['xs', 'sm', 'md']}
                        gap={2}
                        isDisabled={!isEditableInfo}
                      >
                        Change photo
                      </Button>

                      <Button
                        bg={'yellow.200'}
                        color={'gray.900'}
                        onClick={handleUpdateProfile}
                        isLoading={isLoading}
                        size={['xs', 'sm', 'md']}
                        gap={2}
                        isDisabled={!isEditableInfo}
                        mt={3}
                      >
                        Save changes
                      </Button>
                    </VStack>
                  </HStack>

                  <Text
                    color={textColorPrimary}
                    fontWeight='bold'
                    fontSize='md'
                  >
                    Avatar or company logo
                  </Text>
                </SimpleGrid>

                <Divider />

                <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5}>
                  <VStack mt={3}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type='text'
                        name='name'
                        variant={isEditableInfo ? 'outline' : 'filled'}
                        placeholder='Username'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        isReadOnly={!isEditableInfo}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Login Email</FormLabel>
                      <Input
                        type='text'
                        name='email'
                        variant={isEditableInfo ? 'outline' : 'filled'}
                        placeholder='User email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        isReadOnly={!isEditableInfo}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Phone number</FormLabel>
                      <Input
                        type='text'
                        name='phone_number'
                        variant={isEditableInfo ? 'outline' : 'filled'}
                        placeholder='User phone'
                        value={formData.phone_number}
                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        isReadOnly={!isEditableInfo}
                      />
                    </FormControl>
                  </VStack>
                </SimpleGrid>
              </Card>

              {/* Card de informações do broker */}
              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={5} borderRadius={10}>
                <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'} >
                  <HStack justifyContent={'flex-start'} alignItems={'center'} w={'100%'}>
                    <Text
                      color={textColorPrimary}
                      fontWeight='bold'
                      fontSize='lg'
                    >
                      Broker Information
                    </Text>

                    {isEditableBroker ?
                      <Icon as={HiLockOpen} color={'blue.300'} h='2rem' w='2rem' />
                      :
                      <Icon as={HiLockClosed} color={'blue.300'} h='2rem' w='2rem' />
                    }
                  </HStack>

                  <Box gap={2} justifyContent="space-between" mt={2}>
                    <Button
                      onClick={() => handleClickChangeBroker()}
                      bg={isEditableBroker ? 'green.700' : 'blue.400'}
                      color="white"
                      // isLoading={isLoading}
                      _hover={{ bg: isEditableBroker ? 'green.500' : 'blue.500' }}
                      w="100%"
                      h="4.1vh"
                      gap={3}
                    >
                      {isEditableBroker ?
                        <Icon as={HiLockOpen} color={'white'} h='1rem' w='1rem' />
                        :
                        <Icon as={HiLockClosed} color={'white'} h='1rem' w='1rem' />
                      }
                      
                      <HStack>
                        <Text fontSize={['sm', 'md']}>
                          {isEditableBroker ? 'Edit Info' : 'Edit Info'}
                        </Text>
                      </HStack>
                    </Button>
                  </Box>
                </HStack>

                <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'} mt={2}>
                  <FormControl display="flex" alignItems="center" mt={3}>
                    <FormLabel htmlFor="broker-switch" mb="0">
                      Are you a broker?
                    </FormLabel>
                    <Switch id="broker-switch" onChange={toggleBrokerInput} isChecked={formData.isBroker == 1} disabled={!isEditableBroker}/>
                  </FormControl>

                  <Button
                    bg={'yellow.200'}
                    color={'gray.900'}
                    onClick={handleUpdateProfile}
                    isLoading={isLoading}
                    size={['xs', 'sm', 'md']}
                    gap={2}
                    isDisabled={!isEditableBroker}
                    mt={3}
                    width={'25%'}
                  >
                    Save changes
                  </Button>
                </HStack>

                {formData.isBroker == 1 && (
                  <>
                    <FormControl mt={4}>
                      <FormLabel>Company name</FormLabel>
                      <Input
                        type="text"
                        name="brokerName"
                        variant={isEditableBroker ? 'outline' : 'filled'}
                        placeholder='Broker Name'
                        value={formData.brokerCompanyName}
                        onChange={(e) => setFormData({ ...formData, brokerCompanyName: e.target.value })}
                        isReadOnly={!isEditableBroker}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Contact email</FormLabel>
                      <Input
                        type='text'
                        name='email'
                        variant={isEditableBroker ? 'outline' : 'filled'}
                        placeholder='Email'
                        value={formData.brokerEmail}
                        onChange={(e) => setFormData({ ...formData, brokerEmail: e.target.value })}
                        isReadOnly={!isEditableBroker}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Phone number</FormLabel>
                      <Input
                        type='text'
                        name='brokerPhone'
                        variant={isEditableBroker ? 'outline' : 'filled'}
                        placeholder='Phone number'
                        value={formData.brokerPhone}
                        onChange={(e) => setFormData({ ...formData, brokerPhone: e.target.value })}
                        isReadOnly={!isEditableBroker}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Company address</FormLabel>
                      <Input
                        type='text'
                        name='address'
                        variant={isEditableBroker ? 'outline' : 'filled'}
                        placeholder='Broker address'
                        value={formData.brokerAddress}
                        onChange={(e) => setFormData({ ...formData, brokerAddress: e.target.value })}
                        isReadOnly={!isEditableBroker}
                      />
                    </FormControl>

                    {/* NÃO DELETAR! ISSO VAI SER IMPORTANTE NA HORA DO STRIPE E DO PAGAMENTO */}

                    <>
                      {/* {allFieldsFilled && (
                        <Button bg="green.200" my={3} onClick={openModal} isLoading={isLoading}>
                          {isWideVersion ? 'Checkout payment' : 'Payment'}
                        </Button>
                      )}

                      {isModalOpen && (
                        <ModalPayment
                          isOpen={isModalOpen}
                          onClose={closeModal}
                          // onClick={() => openModal()}
                          // isLoading={isLoading}
                          title={'Boats checkout payment'}
                        />
                      )} */}
                    </>
                  </>
                )}

              </Card>

              {/* Card de alterar a senha */}
              <Card bg={bg} boxShadow={cardShadow} mb='20px' px={3} py={5} borderRadius={10}>
                <Accordion allowMultiple w={'100%'} mt={5} >
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                          <FormLabel fontSize={'xl'} fontWeight={'bold'}>Change password</FormLabel>
                        </HStack>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={5}>
                        <VStack mt={3}>
                          <FormControl>
                            <FormLabel>New password</FormLabel>
                            <Input
                              type='password'
                              name='newPassword'
                              variant='outline'
                              placeholder='Insert your new password'
                              value={formData.newPassword}
                              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            />
                          </FormControl>

                          <FormControl>
                            <FormLabel>Confirm password</FormLabel>
                            <Input
                              type='password'
                              name='confirmPassword'
                              variant='outline'
                              placeholder='Confirm your new password'
                              value={formData.confirmPassword}
                              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                          </FormControl>
                        </VStack>

                        <HStack mt={3} justifyContent={'space-between'} alignItems={'center'}>
                          <Stack justifyContent={'space-between'} alignItems={'flex-start'}>
                            <Text
                              color={textColorPrimary}
                              fontWeight='bold'
                              fontSize='lg'
                              textAlign={'left'}
                            >
                              Password requirements and suggestions:
                            </Text>

                            <Text
                              color={textColorPrimary}
                              fontWeight='thin'
                              fontSize='sm'
                              textAlign={'left'}
                            >
                              Please follow the instructions to create a new strong password
                            </Text>

                            <VStack px={1} pt={2} spacing={2} alignItems="flex-start">

                              <HStack spacing={3}>
                                <Icon as={FcOk} h={4} w={4} color="green.500" />
                                <Text fontSize="sm" color="gray.500">
                                  One special characters
                                </Text>
                              </HStack>

                              <HStack spacing={3}>
                                <Icon as={FcOk} h={4} w={4} color="green.500" />
                                <Text fontSize="sm" color="gray.500">
                                  Min 6 characters
                                </Text>
                              </HStack>

                              <HStack spacing={3}>
                                <Icon as={FcOk} h={4} w={4} color="green.500" />
                                <Text fontSize="sm" color="gray.500">
                                  One number (2 are recommended)
                                </Text>
                              </HStack>

                              <HStack spacing={3}>
                                <Icon as={FcOk} h={4} w={4} color="green.500" />
                                <Text fontSize="sm" color="gray.500">
                                  Change it often
                                </Text>
                              </HStack>

                              <Button bg='yellow.200' mb={5} onClick={handleUpdateProfile} isLoading={isLoading} mt={5} width={'100%'} fontSize={'md'}>
                                {isWideVersion ? 'Save Changes' : 'Update'}
                              </Button>

                            </VStack>
                          </Stack>
                        </HStack>
                      </SimpleGrid>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                
              </Card>

              <ToastContainer />
            </Card>
          ) : (
            navigate('/dashboard')
          )}
        </>
      }
    </>
  );
}
