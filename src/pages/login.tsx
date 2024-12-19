
import { Box, Button, FormLabel, Heading, Link, Switch, useColorModeValue,
  Flex, Stack, Text, Image, VStack, FormControl, InputGroup, HStack,
  SimpleGrid, Input, Icon
} from "@chakra-ui/react";

import { useEffect, useState } from 'react';

import landscape from "../assets/landscape.jpg";
import logosite from "../assets/logosite.png";

import DefaultAuth from "../components/DefaultAuth";
import ForgotPassword from "../components/ForgotPassword";
import InputLogin from "../components/InputLogin";
import Header from "../components/Header";
import NewAccount from "../components/NewAccount";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toastApiResponse } from "../components/Toast";
import { FcOk } from "react-icons/fc";
import { api } from "../services/api";

type FormDataProps = {
  email: string;
  password: string;
}

export default function Login() {

  const { signIn } = useAuth();

  const navigate = useNavigate();
  const textColor = useColorModeValue("navy.700", "gray.100");
  const textColorSecondary = "gray.400";

  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isResetPasswordScreen, setIsResetPasswordScreen] = useState(false);
  const [formData, setFormData] = useState({
    id: '', name: '', email: '', currentPassword: '', photo: '', newPassword: '', confirmPassword: '', typeUser: '',
  });

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const OriginalState = () => {
    setShowRegisterForm(!showRegisterForm)
    setShowForgotPassword(false);
  };

  const signInFormSchema = yup.object().shape({
    email: yup.string().required('Insert your email').email('Invalid E-mail'),
    password: yup.string().required('Password is required').min(6, 'minimum 6 characters'),
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true)      
      const res = await signIn(email, password);
      
      if (res?.success) {
        toastApiResponse(null, 'Login successful!');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate(`/dashboard`);
      } else {
        toast.error('Invalid credentials. Please try again!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });   
      }

      setIsLoading(false);

    } catch (error: any) {
      toast.error('An error occurred. Please try again!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });   

      setIsLoading(false);
    }
  }

  const getHashValues = () => {
    const hash = window.location.hash;
    const values = hash.split('&');
    
    const token = values[1] || '';
    const userId = values[2] || '';

    return { token, userId };
  };

  async function handleResetPassword(token: string, userId: string) {
    if (window.location.hash.includes('#reset-password')) {

      try {    
        const formData = new FormData();
        formData.append("token", token);
        formData.append("user_id", userId);
    
        const response = await api.post('/reset-password/reset.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          setShowRegisterForm(false);
          setIsResetPasswordScreen(true);
          setShowForgotPassword(false);    
        } 
  
      } catch (e : any) {
        toast.error(e?.message || 'Have occurred an error to connect to the server, please try again later', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });  
      }       
    }
  }

  async function handleConfirmPassword() {
    try {
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

      const { userId, token } = getHashValues();

      const formDataToSend = new FormData();
      formDataToSend.append("user_id", userId);
      formDataToSend.append("token", token);
      formDataToSend.append("password", formData.newPassword);

      const response = await api.post('/user/reset-password-by-id.php', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        
        setShowRegisterForm(false);
        setIsResetPasswordScreen(false);      
        setIsLoading(false);
        toastApiResponse(null, response.data.message);        

      } else {
        toast.error('Have occurred an error to connect to the server, please try again later', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });  
      }     

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { token, userId } = getHashValues();
    handleResetPassword(token, userId);
  }, []);

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />
      <DefaultAuth illustrationBackground={landscape} image={landscape}>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w='100%'
          mx={{ base: "auto", lg: "0px" }}
          h='100%'
          alignItems='center'
          justifyContent='center'
          mb={{ base: "20px", md: "40px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "20px", md: "1vh" }}
          flexDirection='column'
          // overflow={'auto'}
        >
          <VStack mx='auto' justifyContent='center' alignItems='center'>
            <Heading color={textColor} fontSize='36px' mb='5px'>
              Boats On The Market
            </Heading>
            <Text mb='10px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
              Register and  Start Listing Today
            </Text>

            {!showRegisterForm && (
              <Box
                w="150px"
                h="150px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={2}
              >
                <Image src={logosite} />
              </Box>
            )}
          </VStack>

          {isResetPasswordScreen && (
            <Flex
              zIndex='2'
              direction='column'
              w={{ base: "100%", md: "420px" }}
              maxW='100%'
              background='transparent'
              borderRadius='15px'
              mx={{ base: "auto", lg: "unset" }}
              me='auto'
              mb={{ base: "20px", md: "auto" }}
            >           
              <>
                <Text
                  color={'gray.200'}
                  fontWeight='bold'
                  fontSize='lg'
                >
                  Change password
                </Text>

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

                  <HStack mt={0} justifyContent={'space-between'} alignItems={'center'}>
                    <Stack justifyContent={'space-between'} alignItems={'flex-start'}>
                      <Text
                        color={'gray.200'}
                        fontWeight='bold'
                        fontSize='lg'
                        textAlign={'left'}
                      >
                        Password requirements and suggestions:
                      </Text>

                      <Text
                        color={'gray.200'}
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
                      </VStack>

                      <Button 
                        bg='yellow.200' mb={5} size={'2xl'} w={'100%'} height={'3rem'}
                        onClick={() => handleConfirmPassword()} 
                        isLoading={isLoading} 
                        mt={3}>
                        {/* {isWideVersion ? 'Update your password' : 'Update'} */}
                        Update password
                      </Button>
                    </Stack>
                    
                  </HStack>
                </SimpleGrid>
              </>          
            </Flex>
          )}

          {isResetPasswordScreen === false && (
            <Flex
              zIndex='2'
              direction='column'
              w={{ base: "100%", md: "420px" }}
              maxW='100%'
              background='transparent'
              borderRadius='15px'
              mx={{ base: "auto", lg: "unset" }}
              me='auto'
              mb={{ base: "20px", md: "auto" }}
            >
              {!showRegisterForm ? (
                <>
                  {!showForgotPassword && (
                    <VStack px={'auto'} spacing={3} mb={3} mt={5}>
                      <Stack w={'100%'} mb={3}>
                        <FormControl>
                          <InputLogin
                            placeholder='Email'
                            name='email'
                            type={'email'}
                            error={errors.email}
                            register={register}
                            options={{
                              required: 'Is required to show up an email.',
                            }}
                          />
                        </FormControl>
                      </Stack>

                      <Stack w={'100%'} mb={3}>
                        <InputGroup size={['md']}>
                          <InputLogin
                            placeholder='Password'
                            name='password'
                            error={errors?.password}
                            register={register}
                            isPassword
                            options={{
                              required: 'Is required to show up a password.'
                            }}
                          />
                        </InputGroup>
                      </Stack>

                      <Button
                        bg={'yellow.500'}
                        w={'full'}
                        height={'3rem'}
                        mb={1}
                        onClick={handleSubmit(handleSignIn)}
                        isLoading={isLoading}
                      >
                        Sign In
                      </Button>
                    </VStack>
                  )}

                  {!showForgotPassword ? (
                    <>
                      <HStack alignItems="center" justifyContent="space-between" px={'auto'}>
                        <FormControl display='flex' alignItems='left' gap={1}>
                          <Switch size={'sm'} id='email-alerts' />
                          <FormLabel htmlFor='email-alerts' mb='0' fontSize={'sm'}>
                            Remember Me
                          </FormLabel>
                        </FormControl>

                        <Box w='40%'>
                          <Link
                            href="#"
                            onClick={handleForgotPassword}
                          >
                            <Text color="blue.500" fontSize="sm" mb={3} fontFamily="body" mt={3}>
                              Forgot Password
                            </Text>
                          </Link>
                        </Box>
                      </HStack>

                      <VStack p={'auto'} spacing={3} mt={10}>
                        <Text fontSize="14" color="gray.700" textAlign='center'>
                          Don't Have An Account Yet, Sign Up Here
                        </Text>

                        <Button
                          bg={'blue.200'}
                          w={'full'}
                          height={'3rem'}
                          mb={1}
                          color={'white'}
                          onClick={() => setShowRegisterForm(!showRegisterForm)}
                        >
                          Register Your Account
                        </Button>
                      </VStack>
                    </>

                  ) : (
                    <ForgotPassword onClick={() => setShowRegisterForm(!showRegisterForm)} />
                  )}
                </>

              ) : (
                <NewAccount onClick={OriginalState} />
              )
              }
            </Flex>
          )}
        </Flex>
        <ToastContainer />
      </DefaultAuth>
    </Flex>
  );
}

