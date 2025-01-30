// import React, { useState } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { Box, Button, Flex, FormControl, FormLabel, Input, VStack, Heading, Text, InputGroup,
//   InputRightElement, useColorModeValue, Image, HStack, FormErrorMessage, useToast, SimpleGrid,
// } from '@chakra-ui/react';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import { api } from '../services/api';

// interface IFormInputs {
//   name: string;
//   email: string;
//   password: string;
//   confirm_password: string;
//   photo?: FileList;
// }

// export default function RegisterUser() {
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

//   // const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
//   //   setIsLoading(true);

//   //   try {
//   //     const formData = new FormData();
//   //     formData.append('name', data.name);
//   //     formData.append('email', data.email);
//   //     formData.append('password', data.password);

//   //     if (data.photo && data.photo[0]) {
//   //       formData.append('photo', data.photo[0]);
//   //     }

//   //     const response = await fetch('YOUR_API_ENDPOINT', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });

//   //     if (response.ok) {
//   //       toast({
//   //         title: "Cadastro realizado",
//   //         description: "Sua conta foi criada com sucesso.",
//   //         status: "success",
//   //         position: "top",
//   //         duration: 5000,
//   //         isClosable: true,
//   //       });

//   //       await new Promise((resolve) => setTimeout(resolve, 2000));
//   //       navigate('/login');
//   //     } else {
//   //       throw new Error('Falha no cadastro');
//   //     }
//   //   } catch (error) {
//   //     console.error('Registration Error:', error);
//   //     toast({
//   //       title: "Erro no cadastro",
//   //       description: "Ocorreu um erro ao criar sua conta. Por favor, tente novamente.",
//   //       status: "error",
//   //       position: "top",
//   //       duration: 5000,
//   //       isClosable: true,
//   //     });
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
//     setIsLoading(true);

//     try {
//       const payload = {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//       };

//       const response = await api.post('/users', payload);

//       if (response.data.status === true) {
//         toast({
//           title: "Bem vindo ao CONTRANS!",
//           description: "Sua conta foi criada com sucesso!.",
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
//               <FormControl mt={4} isInvalid={!!errors.password}>
//                 <FormLabel>Senha</FormLabel>
//                 <InputGroup>
//                   <Input
//                     rounded="md"
//                     type={showPassword ? 'text' : 'password'}
//                     {...register('password', {
//                       required: 'Este campo é obrigatório',
//                       minLength: {
//                         value: 6,
//                         message: 'A senha deve ter pelo menos 6 caracteres',
//                       },
//                     })}
//                   />
//                   <InputRightElement width="3rem">
//                     <Button
//                       h="1.5rem"
//                       size="sm"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <FaEye /> : <FaEyeSlash />}
//                     </Button>
//                   </InputRightElement>
//                 </InputGroup>

//                 <FormErrorMessage>
//                   {errors.password && errors.password.message}
//                 </FormErrorMessage>
//               </FormControl>

//               <FormControl mt={4} isInvalid={!!errors.confirm_password}>
//                 <FormLabel>Confirmar Senha</FormLabel>
//                 <InputGroup>
//                   <Input
//                     rounded="md"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     {...register('confirm_password', {
//                       required: 'Este campo é obrigatório',
//                       validate: (val: string) => {
//                         if (watch('password') != val) {
//                           return "As senhas não conferem";
//                         }
//                       },
//                     })}
//                   />

//                   <InputRightElement width="3rem">
//                     <Button
//                       h="1.5rem"
//                       size="sm"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
//                     </Button>
//                   </InputRightElement>
//                 </InputGroup>

//                 <FormErrorMessage>
//                   {errors.confirm_password && errors.confirm_password.message}
//                 </FormErrorMessage>
//               </FormControl>
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

// ------------------------------------------------

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box, Button, Flex, FormControl, FormLabel, Input, VStack, Heading, InputGroup,
  InputRightElement, useColorModeValue, Image, HStack, FormErrorMessage, useToast, SimpleGrid,
  Link,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface IFormInputs {
  email: string;
  password: string;
  confirm_password: string;
  code?: string;
}

interface IFormInputs {
  email: string;
  pin: string; // Campo pin como string
}

export default function RegisterUser() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>();

  const toast = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState<string>(''); // Estado para o código do PinInput
  const [checkValidation, setCheckValidation] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);

    try {
      const payload = {
        email: data.email,
        // name: data.name,
        // password: data.password,
      };

      const response = await api.post('/forgot-password-code', payload);

      if (response.data.status === true) {
        toast({
          title: "Check seu email!",
          description: "Um código foi enviado para o seu email!",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });

        await new Promise((resolve) => setTimeout(resolve, 500));
        setCheckValidation(true);

      } else {
        throw new Error('Falha ao enviar o código!');
      }

    } catch (error) {
      console.error('Registration Error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao tentar enviar o código. Por favor, tente novamente.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitCode: SubmitHandler<IFormInputs> = async (data) => {

    if (!checkValidation) return;

    if (!data.pin || data.pin.length !== 6) {
      toast({
        title: 'Erro de validação',
        description: 'Por favor, insira o código PIN no seu email com 6 dígitos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        email: data.email,
        code: data.pin,
      };

      setCheckValidation(false);
      setChangePassword(true);
      console.log('checkValidation', checkValidation);
      console.log('changePassword', changePassword);
      return

      const response = await api.post('/reset-password-validate-code', payload);

      if (response.data.status === true) {
        toast({
          title: "Verificação bem-sucedida!",
          description: "O código para recuperar a senha é valido!",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCheckValidation(false);
        setChangePassword(true);

      } else {
        throw new Error('Falha ao enviar o código!');
      }

    } catch (error) {
      console.error('Registration Error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao tentar enviar o código. Por favor, tente novamente.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitPassword: SubmitHandler<IFormInputs> = async (data) => {

    if (!checkValidation) return;

    if (!data.pin || data.pin.length !== 6) {
      toast({
        title: 'Erro de validação',
        description: 'Por favor, insira o código PIN no seu email com 6 dígitos.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsLoading(true);

    // Processar o formulário se todos os campos forem válidos
    console.log(data);
    return


    try {
      const payload = {
        email: data.email,
        code: data.pin,
        password: data.password,
      };

      const response = await api.post('/reset-password-validate-code', payload);

      if (response.data.status === true) {
        toast({
          title: "Verificação bem-sucedida!",
          description: "O código para recuperar a senha é valido!",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });

        await new Promise((resolve) => setTimeout(resolve, 500));
        setChangePassword(true);

      } else {
        throw new Error('Falha ao enviar o código!');
      }

    } catch (error) {
      console.error('Registration Error:', error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao tentar enviar o código. Por favor, tente novamente.",
        status: "error",
        position: "top",
        duration: 5000,
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

          {/* Tela de recuperar a senha - PARTE 01*/}

          {(checkValidation || !changePassword) &&
            <>
              <Heading size="md" alignItems={'flex-start'} color={'blue.300'} mt={2}>Recupere sua senha</Heading>

              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Insira seu email</FormLabel>
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

                <Button
                  mt={6}
                  colorScheme="blue"
                  type="submit"
                  width="full"
                  rounded="md"
                  isLoading={isLoading}
                >
                  Enviar email
                </Button>

              </form>
            </>
          }

          {/* Tela de enviar o codigo do email - PARTE 02*/}

          {checkValidation && (
            <>
              <Heading size="md" alignItems={'flex-start'} color={'blue.300'} mt={2}>
                Insira o código do seu email
              </Heading>

              <form onSubmit={handleSubmit(onSubmitCode)} style={{ width: '100%' }}>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Insira seu email</FormLabel>
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

                <FormControl isInvalid={!!errors.pin} id="pin" isRequired mt={4}>
                  <FormLabel>Código</FormLabel>
                  <HStack justify="flex-start">
                    <PinInput
                      type="number"
                      value={pin}
                      onChange={(value) => {
                        setPin(value);
                        setValue('pin', value); // Atualiza o valor no React Hook Form
                      }}
                      size="lg"
                    >
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                      <PinInputField />
                    </PinInput>
                  </HStack>
                  <FormErrorMessage>
                    {errors.pin && errors.pin.message}
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
                  Validar código de acesso
                </Button>

              </form>
            </>
          )}

          {/* Tela de recuperar a senha - PARTE 03*/}

          {changePassword &&
            <>
              <Heading size="md" alignItems={'flex-start'} color={'blue.300'} mt={2}>Vamos atualizar sua senha</Heading>

              <form onSubmit={handleSubmit(onSubmitPassword)} style={{ width: '100%' }}>

                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Insira seu email</FormLabel>
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

                {checkValidation && (
                  <FormControl isInvalid={!!errors.pin} id="pin" isRequired mt={4}>
                    <FormLabel>Código</FormLabel>
                    <HStack justify="flex-start">
                      <PinInput
                        type="number"
                        value={pin}
                        onChange={(value) => {
                          setPin(value);
                          setValue('pin', value);
                        }}
                        size="lg"
                      >
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                        <PinInputField />
                      </PinInput>
                    </HStack>
                    <FormErrorMessage>
                      {errors.pin && errors.pin.message}
                    </FormErrorMessage>
                  </FormControl>
                )}

                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 2 }}
                  spacing={3}
                  w="100%"
                  maxWidth={1480}
                >
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

                  <FormControl mt={4} isInvalid={!!errors.confirm_password}>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <InputGroup>
                      <Input
                        rounded="md"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirm_password', {
                          required: 'Este campo é obrigatório',
                          validate: (val: string) => {
                            if (watch('password') != val) {
                              return "As senhas não conferem";
                            }
                          },
                        })}
                      />

                      <InputRightElement width="3rem">
                        <Button
                          h="1.5rem"
                          size="sm"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <FormErrorMessage>
                      {errors.confirm_password && errors.confirm_password.message}
                    </FormErrorMessage>
                  </FormControl>
                </SimpleGrid>

                <Button
                  mt={6}
                  colorScheme="blue"
                  type="submit"
                  width="full"
                  rounded="md"
                  isLoading={isLoading}
                >
                  Enviar email
                </Button>

              </form>
            </>
          }

          <Link color="gray.700" href="/login" fontSize="sm">
            Voltar para tela de login
          </Link>

          {/* <Button
            mt={0}
            variant="outline"
            width="full"
            rounded="md"
            onClick={() => navigate('/login')}
          >
            Voltar para tela de login
          </Button> */}

          {/* <Text fontSize="xs" color="gray.600">
            Ao se cadastrar, você concorda com a Declaração de Privacidade e os Termos de Uso do Contrans.
          </Text> */}
        </VStack>
      </Box>
    </Flex>
  );
}