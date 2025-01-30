
// import { Box, Button, FormLabel, Heading, Link, Switch, useColorModeValue,
//   Flex, Stack, Text, Image, VStack, FormControl, InputGroup, HStack,
//   SimpleGrid, Input, Icon
// } from "@chakra-ui/react";

// import { useEffect, useState } from 'react';

// import landscape from "../assets/landscape.jpg";
// import logosite from "../assets/logosite.png";

// import DefaultAuth from "../components/DefaultAuth";
// import ForgotPassword from "../components/ForgotPassword";
// import InputLogin from "../components/InputLogin";
// import Header from "../components/Header";
// import NewAccount from "../components/NewAccount";

// import * as yup from 'yup'
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup"

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { useAuth } from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";
// import { toastApiResponse } from "../components/Toast";
// import { FcOk } from "react-icons/fc";
// import { api } from "../services/api";

// type FormDataProps = {
//   email: string;
//   password: string;
// }

// export default function Login() {

//   const { signIn } = useAuth();

//   const navigate = useNavigate();
//   const textColor = useColorModeValue("navy.700", "gray.100");
//   const textColorSecondary = "gray.400";

//   const [isLoading, setIsLoading] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [showRegisterForm, setShowRegisterForm] = useState(false);
//   const [isResetPasswordScreen, setIsResetPasswordScreen] = useState(false);
//   const [formData, setFormData] = useState({
//     id: '', name: '', email: '', currentPassword: '', photo: '', newPassword: '', confirmPassword: '', typeUser: '',
//   });

//   const handleForgotPassword = () => {
//     setShowForgotPassword(true);
//   };

//   const OriginalState = () => {
//     setShowRegisterForm(!showRegisterForm)
//     setShowForgotPassword(false);
//   };

//   const signInFormSchema = yup.object().shape({
//     email: yup.string().required('Insert your email').email('Invalid E-mail'),
//     password: yup.string().required('Password is required').min(6, 'minimum 6 characters'),
//   });

//   const { register, handleSubmit, formState } = useForm<FormDataProps>({
//     resolver: yupResolver(signInFormSchema)
//   });

//   const { errors } = formState

//   async function handleSignIn({ email, password }: FormDataProps) {
//     try {
//       setIsLoading(true)      
//       const res = await signIn(email, password);

//       if (res?.success) {
//         toastApiResponse(null, 'Login successful!');
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         navigate(`/dashboard`);
//       } else {
//         toast.error('Invalid credentials. Please try again!', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });   
//       }

//       setIsLoading(false);

//     } catch (error: any) {
//       toast.error('An error occurred. Please try again!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });   

//       setIsLoading(false);
//     }
//   }

//   const getHashValues = () => {
//     const hash = window.location.hash;
//     const values = hash.split('&');

//     const token = values[1] || '';
//     const userId = values[2] || '';

//     return { token, userId };
//   };

//   async function handleResetPassword(token: string, userId: string) {
//     if (window.location.hash.includes('#reset-password')) {

//       try {    
//         const formData = new FormData();
//         formData.append("token", token);
//         formData.append("user_id", userId);

//         const response = await api.post('/reset-password/reset.php', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         if (response.data.success) {
//           setShowRegisterForm(false);
//           setIsResetPasswordScreen(true);
//           setShowForgotPassword(false);    
//         } 

//       } catch (e : any) {
//         toast.error(e?.message || 'Have occurred an error to connect to the server, please try again later', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });  
//       }       
//     }
//   }

//   async function handleConfirmPassword() {
//     try {
//       setIsLoading(true);

//       if (formData.newPassword === formData.currentPassword && formData.newPassword !== '') {
//         toastApiResponse(null, 'The new password and the current password are the same! Please enter a different new password.');
//         setIsLoading(false);
//         return;
//       }

//       if (formData.newPassword !== formData.confirmPassword) {
//         toastApiResponse(null, 'The new password does not match the confirmation password. Please verify your passwords.', 'warning');
//         setIsLoading(false);
//         return;
//       }

//       const { userId, token } = getHashValues();

//       const formDataToSend = new FormData();
//       formDataToSend.append("user_id", userId);
//       formDataToSend.append("token", token);
//       formDataToSend.append("password", formData.newPassword);

//       const response = await api.post('/user/reset-password-by-id.php', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {

//         setShowRegisterForm(false);
//         setIsResetPasswordScreen(false);      
//         setIsLoading(false);
//         toastApiResponse(null, response.data.message);        

//       } else {
//         toast.error('Have occurred an error to connect to the server, please try again later', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });  
//       }     

//     } catch (error) {
//       console.error('Error:', error);
//       toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const { token, userId } = getHashValues();
//     handleResetPassword(token, userId);
//   }, []);

//   return (
//     <Flex direction="column" height="100%" bg="white">
//       <Header />
//       <DefaultAuth illustrationBackground={landscape} image={landscape}>
//         <Flex
//           maxW={{ base: "100%", md: "max-content" }}
//           w='100%'
//           mx={{ base: "auto", lg: "0px" }}
//           h='100%'
//           alignItems='center'
//           justifyContent='center'
//           mb={{ base: "20px", md: "40px" }}
//           px={{ base: "25px", md: "0px" }}
//           mt={{ base: "20px", md: "1vh" }}
//           flexDirection='column'
//           // overflow={'auto'}
//         >
//           <VStack mx='auto' justifyContent='center' alignItems='center'>
//             <Heading color={textColor} fontSize='36px' mb='5px'>
//               Boats On The Market
//             </Heading>
//             <Text mb='10px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
//               Register and  Start Listing Today
//             </Text>

//             {!showRegisterForm && (
//               <Box
//                 w="150px"
//                 h="150px"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 mt={2}
//               >
//                 <Image src={logosite} />
//               </Box>
//             )}
//           </VStack>

//           {isResetPasswordScreen && (
//             <Flex
//               zIndex='2'
//               direction='column'
//               w={{ base: "100%", md: "420px" }}
//               maxW='100%'
//               background='transparent'
//               borderRadius='15px'
//               mx={{ base: "auto", lg: "unset" }}
//               me='auto'
//               mb={{ base: "20px", md: "auto" }}
//             >           
//               <>
//                 <Text
//                   color={'gray.200'}
//                   fontWeight='bold'
//                   fontSize='lg'
//                 >
//                   Change password
//                 </Text>

//                 <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={5}>
//                   <VStack mt={3}>
//                     <FormControl>
//                       <FormLabel>New password</FormLabel>
//                       <Input
//                         type='password'
//                         name='newPassword'
//                         variant='outline'
//                         placeholder='Insert your new password'
//                         value={formData.newPassword}
//                         onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                       />
//                     </FormControl>

//                     <FormControl>
//                       <FormLabel>Confirm password</FormLabel>
//                       <Input
//                         type='password'
//                         name='confirmPassword'
//                         variant='outline'
//                         placeholder='Confirm your new password'
//                         value={formData.confirmPassword}
//                         onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                       />
//                     </FormControl>
//                   </VStack>

//                   <HStack mt={0} justifyContent={'space-between'} alignItems={'center'}>
//                     <Stack justifyContent={'space-between'} alignItems={'flex-start'}>
//                       <Text
//                         color={'gray.200'}
//                         fontWeight='bold'
//                         fontSize='lg'
//                         textAlign={'left'}
//                       >
//                         Password requirements and suggestions:
//                       </Text>

//                       <Text
//                         color={'gray.200'}
//                         fontWeight='thin'
//                         fontSize='sm'
//                         textAlign={'left'}
//                       >
//                         Please follow the instructions to create a new strong password
//                       </Text>

//                       <VStack px={1} pt={2} spacing={2} alignItems="flex-start">

//                         <HStack spacing={3}>
//                           <Icon as={FcOk} h={4} w={4} color="green.500" />
//                           <Text fontSize="sm" color="gray.500">
//                             One special characters
//                           </Text>
//                         </HStack>

//                         <HStack spacing={3}>
//                           <Icon as={FcOk} h={4} w={4} color="green.500" />
//                           <Text fontSize="sm" color="gray.500">
//                             Min 6 characters
//                           </Text>
//                         </HStack>

//                         <HStack spacing={3}>
//                           <Icon as={FcOk} h={4} w={4} color="green.500" />
//                           <Text fontSize="sm" color="gray.500">
//                             One number (2 are recommended)
//                           </Text>
//                         </HStack>

//                         <HStack spacing={3}>
//                           <Icon as={FcOk} h={4} w={4} color="green.500" />
//                           <Text fontSize="sm" color="gray.500">
//                             Change it often
//                           </Text>
//                         </HStack>
//                       </VStack>

//                       <Button 
//                         bg='yellow.200' mb={5} size={'2xl'} w={'100%'} height={'3rem'}
//                         onClick={() => handleConfirmPassword()} 
//                         isLoading={isLoading} 
//                         mt={3}>
//                         {/* {isWideVersion ? 'Update your password' : 'Update'} */}
//                         Update password
//                       </Button>
//                     </Stack>

//                   </HStack>
//                 </SimpleGrid>
//               </>          
//             </Flex>
//           )}

//           {isResetPasswordScreen === false && (
//             <Flex
//               zIndex='2'
//               direction='column'
//               w={{ base: "100%", md: "420px" }}
//               maxW='100%'
//               background='transparent'
//               borderRadius='15px'
//               mx={{ base: "auto", lg: "unset" }}
//               me='auto'
//               mb={{ base: "20px", md: "auto" }}
//             >
//               {!showRegisterForm ? (
//                 <>
//                   {!showForgotPassword && (
//                     <VStack px={'auto'} spacing={3} mb={3} mt={5}>
//                       <Stack w={'100%'} mb={3}>
//                         <FormControl>
//                           <InputLogin
//                             placeholder='Email'
//                             name='email'
//                             type={'email'}
//                             error={errors.email}
//                             register={register}
//                             options={{
//                               required: 'Is required to show up an email.',
//                             }}
//                           />
//                         </FormControl>
//                       </Stack>

//                       <Stack w={'100%'} mb={3}>
//                         <InputGroup size={['md']}>
//                           <InputLogin
//                             placeholder='Password'
//                             name='password'
//                             error={errors?.password}
//                             register={register}
//                             isPassword
//                             options={{
//                               required: 'Is required to show up a password.'
//                             }}
//                           />
//                         </InputGroup>
//                       </Stack>

//                       <Button
//                         bg={'yellow.500'}
//                         w={'full'}
//                         height={'3rem'}
//                         mb={1}
//                         onClick={handleSubmit(handleSignIn)}
//                         isLoading={isLoading}
//                       >
//                         Sign In
//                       </Button>
//                     </VStack>
//                   )}

//                   {!showForgotPassword ? (
//                     <>
//                       <HStack alignItems="center" justifyContent="space-between" px={'auto'}>
//                         <FormControl display='flex' alignItems='left' gap={1}>
//                           <Switch size={'sm'} id='email-alerts' />
//                           <FormLabel htmlFor='email-alerts' mb='0' fontSize={'sm'}>
//                             Remember Me
//                           </FormLabel>
//                         </FormControl>

//                         <Box w='40%'>
//                           <Link
//                             href="#"
//                             onClick={handleForgotPassword}
//                           >
//                             <Text color="blue.500" fontSize="sm" mb={3} fontFamily="body" mt={3}>
//                               Forgot Password
//                             </Text>
//                           </Link>
//                         </Box>
//                       </HStack>

//                       <VStack p={'auto'} spacing={3} mt={10}>
//                         <Text fontSize="14" color="gray.700" textAlign='center'>
//                           Don't Have An Account Yet, Sign Up Here
//                         </Text>

//                         <Button
//                           bg={'blue.200'}
//                           w={'full'}
//                           height={'3rem'}
//                           mb={1}
//                           color={'white'}
//                           onClick={() => setShowRegisterForm(!showRegisterForm)}
//                         >
//                           Register Your Account
//                         </Button>
//                       </VStack>
//                     </>

//                   ) : (
//                     <ForgotPassword onClick={() => setShowRegisterForm(!showRegisterForm)} />
//                   )}
//                 </>

//               ) : (
//                 <NewAccount onClick={OriginalState} />
//               )
//               }
//             </Flex>
//           )}
//         </Flex>
//         <ToastContainer />
//       </DefaultAuth>
//     </Flex>
//   );
// }




import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Link,
  Image,
  HStack,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const toast = useToast();
  const navigate = useNavigate(); // Para navegação entre páginas

  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth(); // Acessando o contexto autenticado pelo hook useAuth

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);

    try {
      // Chama a função de login do AuthContext
      await login(data.email, data.password);

      toast({
        title: "Login bem-sucedido",
        description: "Você foi autenticado com sucesso.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate(`/`);

    } catch (error) {
      console.error('Login Error:', error);

      toast({
        title: "Credenciais inválidas",
        description: "Login ou senha incorreta! Por favor, tente novamente.",
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="flex-start"
      bgImage="url('https://images.unsplash.com/photo-1714925847901-f3921db7f7e2?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={8}
        maxWidth="32rem"
        width="100%"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        ml={{ base: 4, md: 16 }}
      >
        <VStack spacing={4} align="flex-start" w="full">
          <HStack justifyContent={'center'}>
            <Image src="https://plus.unsplash.com/premium_photo-1674571895797-3ca2aaf89eed?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" boxSize="100px" />
            <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
              <Heading size="xl" alignItems={'flex-start'} color={'blue.300'}>Contrans</Heading>
              <Heading size="sm" lineHeight={1.4} color={'blue.300'}>Controle de dados e informações do transporte escolar</Heading>
            </VStack>
          </HStack>

          <Text fontSize="md" color="gray.600">
            Faça login para acessar sua conta
          </Text>

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email </FormLabel>
              <Input
                rounded="md"
                type="email"
                {...register('email', {
                  required: 'Este campo é obrigatório',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'E-mail inválido',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.password}>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  rounded="md"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Este campo é obrigatório',
                    minLength: {
                      value: 6,
                      message: 'A senha deve ter pelo menos 6 caracteres',
                    },
                  })}
                />
                <InputRightElement width="3rem">
                  <Button
                    h="1.5rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={6}
              colorScheme="blue"
              type="submit"
              width="full"
              rounded="md"
              isLoading={isLoading}
            >
              Entrar
            </Button>
          </form>

          <Link color="gray.700" href="register_user" fontSize="sm">
            Esqueceu a senha?
          </Link>

          <Button
            mt={4}
            bg={'blue.300'}
            width="full"
            rounded="md"
            color={'white'}
            onClick={() => navigate('/register_user')}
          >
            Cadastrar-se
          </Button>

          <Text fontSize="xs" color="gray.600">
            Ao fazer login, concordo com a Declaração de Privacidade e os Termos de Uso do Contrans.
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}





// ---------------------------------------------------------------
// DAQUI PRA BAIXO



// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Heading,
//   Text,
//   InputGroup,
//   InputRightElement,
//   useColorModeValue,
//   Image,
//   HStack,
//   FormErrorMessage,
//   useToast,
//   SimpleGrid,
// } from '@chakra-ui/react';
// import { HiLockOpen, HiLockClosed } from 'react-icons/hi2';
// import { useNavigate } from 'react-router-dom';

// interface IFormInputs {
//   name: string;
//   email: string;
//   password: string;
//   confirm_password: string;
//   photo?: FileList;
// }

// export default function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<IFormInputs>();
  
//   const toast = useToast();
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('email', data.email);
//       formData.append('password', data.password);
      
//       if (data.photo && data.photo[0]) {
//         formData.append('photo', data.photo[0]);
//       }

//       const response = await fetch('YOUR_API_ENDPOINT', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         toast({
//           title: "Cadastro realizado",
//           description: "Sua conta foi criada com sucesso.",
//           status: "success",
//           position: "top",
//           duration: 5000,
//           isClosable: true,
//         });

//         await new Promise((resolve) => setTimeout(resolve, 2000));
//         navigate('/login');
//       } else {
//         throw new Error('Falha no cadastro');
//       }
//     } catch (error) {
//       console.error('Registration Error:', error);
//       toast({
//         title: "Erro no cadastro",
//         description: "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
//         status: "error",
//         position: "top",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Flex
//       minHeight="100vh"
//       width="full"
//       align="center"
//       justifyContent="flex-start"
//       bgImage="url('https://images.unsplash.com/photo-1714925847901-f3921db7f7e2?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
//       bgSize="cover"
//       bgPosition="center"
//     >
//       <Box
//         bg={useColorModeValue('white', 'gray.800')}
//         p={8}
//         maxWidth="32rem"
//         width="100%"
//         borderWidth={1}
//         borderRadius={8}
//         boxShadow="lg"
//         ml={{ base: 4, md: 16 }}
//       >
//         <VStack spacing={4} align="flex-start" w="full">
//           <HStack justifyContent={'center'}>
//             <Image src="https://plus.unsplash.com/premium_photo-1674571895797-3ca2aaf89eed?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Logo" boxSize="100px" />
//             <VStack justifyContent={'flex-start'} alignItems={'flex-start'}>
//               <Heading size="xl" alignItems={'flex-start'} color={'blue.300'}>Contrans</Heading>
//               <Heading size="sm" lineHeight={1.4} color={'blue.300'}>Controle de dados e informações do transporte escolar</Heading>
//             </VStack>
//           </HStack>

//           {/* <Text fontSize="md" color="gray.600">
//             Crie sua conta
//           </Text> */}

//           <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

//             <FormControl mt={4}>
//               <FormLabel>Foto (Opcional)</FormLabel>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 {...register('photo')}
//                 onChange={handleImageChange}
//                 p={1}
//               />
//               {previewImage && (
//                 <Box mt={2}>
//                   <Image src={previewImage} alt="Preview" maxH="100px" />
//                 </Box>
//               )}
//             </FormControl>

//             <FormControl isInvalid={!!errors.name}>
//               <FormLabel>Nome</FormLabel>
//               <Input
//                 rounded="md"
//                 {...register('name', {
//                   required: 'Este campo é obrigatório',
//                   minLength: {
//                     value: 3,
//                     message: 'O nome deve ter pelo menos 3 caracteres',
//                   },
//                 })}
//               />
//               <FormErrorMessage>
//                 {errors.name && errors.name.message}
//               </FormErrorMessage>
//             </FormControl>

//             <FormControl mt={4} isInvalid={!!errors.email}>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 rounded="md"
//                 type="email"
//                 {...register('email', {
//                   required: 'Este campo é obrigatório',
//                   pattern: {
//                     value: /\S+@\S+\.\S+/,
//                     message: 'E-mail inválido',
//                   },
//                 })}
//               />
//               <FormErrorMessage>
//                 {errors.email && errors.email.message}
//               </FormErrorMessage>
//             </FormControl>

//             <SimpleGrid 
//               columns={{ base: 1, md: 2, lg: 2 }} 
//               spacing={3}
//               w="100%"
//               maxWidth={1480}
//             >

//             <FormControl mt={4} isInvalid={!!errors.password}>
//               <FormLabel>Senha</FormLabel>
//               <InputGroup>
//                 <Input
//                   rounded="md"
//                   type={showPassword ? 'text' : 'password'}
//                   {...register('password', {
//                     required: 'Este campo é obrigatório',
//                     minLength: {
//                       value: 6,
//                       message: 'A senha deve ter pelo menos 6 caracteres',
//                     },
//                   })}
//                 />
//                 <InputRightElement width="3rem">
//                   <Button
//                     h="1.5rem"
//                     size="sm"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <HiLockOpen /> : <HiLockClosed />}
//                   </Button>
//                 </InputRightElement>
//               </InputGroup>
//               <FormErrorMessage>
//                 {errors.password && errors.password.message}
//               </FormErrorMessage>
//             </FormControl>

//             <FormControl mt={4} isInvalid={!!errors.confirm_password}>
//               <FormLabel>Confirmar Senha</FormLabel>
//               <InputGroup>
//                 <Input
//                   rounded="md"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   {...register('confirm_password', {
//                     required: 'Este campo é obrigatório',
//                     validate: (val: string) => {
//                       if (watch('password') != val) {
//                         return "As senhas não conferem";
//                       }
//                     },
//                   })}
//                 />
//                 <InputRightElement width="3rem">
//                   <Button
//                     h="1.5rem"
//                     size="sm"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <HiLockOpen /> : <HiLockClosed />}
//                   </Button>
//                 </InputRightElement>
//               </InputGroup>
//               <FormErrorMessage>
//                 {errors.confirm_password && errors.confirm_password.message}
//               </FormErrorMessage>
//             </FormControl>
//             </SimpleGrid>

//             <Button
//               mt={4}
//               colorScheme="blue"
//               type="submit"
//               width="full"
//               rounded="md"
//               isLoading={isLoading}
//             >
//               Cadastrar
//             </Button>
//           </form>

//           <Button
//             mt={0}
//             variant="outline"
//             width="full"
//             rounded="md"
//             onClick={() => navigate('/login')}
//           >
//             Já tem uma conta? Faça login
//           </Button>

//           <Text fontSize="xs" color="gray.600">
//             Ao se cadastrar, você concorda com a Declaração de Privacidade e os Termos de Uso do Contrans.
//           </Text>
//         </VStack>
//       </Box>
//     </Flex>
//   );
// }

