// import {
//   Button, FormControl, FormLabel, Heading, Modal, ModalBody, ModalCloseButton, ModalContent,
//   ModalFooter, ModalHeader, ModalOverlay, Stack, VStack, Textarea 
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import React, { useState } from "react";

// import "react-toastify/ReactToastify.min.css";
// import { api } from "../services/api";

// import * as yup from 'yup'
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import InputLogin from "./InputLogin";

// interface ModalContactSellerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   email_owner_boat?: string;
// }

// type FormDataProps = {
//   fullName: string;
//   email: string;
//   phone_number: string;
//   message: string;
//   email_owner_boat?: string;
// }

// export default function ModalContactSeller({ isOpen, onClose, title, email_owner_boat }: ModalContactSellerProps) {

//   const initialRef = React.useRef(null)
//   const finalRef = React.useRef(null)
//   const navigate = useNavigate();
//   const boatOwnerEmail = email_owner_boat
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [value, setValue] = React.useState('')

//   const handleInputChange = (e:any) => {
//     const inputValue = e.target.value
//     setValue(inputValue)
//   }

//   async function handleGoHome() {
//     setIsLoading(true)
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     navigate('/listBoat');
//     setIsLoading(false)
//   }

//   const ModalEmailFormSchema = yup.object().shape({
//     fullName: yup.string().required('Insert your name'),
//     email: yup.string().required('Insert your email').email('Invalid E-mail'),
//     phone_number: yup.string().required('Insert your phone number'),
//     message: yup.string().required('Insert your message'),
//   });

//   const { register, handleSubmit, formState } = useForm<FormDataProps>({
//     resolver: yupResolver(ModalEmailFormSchema)
//   });

//   const { errors } = formState

//   async function handleSendEmail({ fullName, email, message, phone_number}: FormDataProps) {

//     // console.log('chegou bem aqui as 09:43')
//     // return
//     // setIsLoading(true);

//     const data = {
//       full_name: fullName,
//       email: email,
//       phone: phone_number,
//       message: message,
//       email_own_boat: boatOwnerEmail
//     };

//     console.log('data 09:46', data);
//     return

//     try {
//       const response = await api.post('/send_email/send_email_own_boat.php', {
//         full_name: fullName,
//         email: email,
//         phone: phone_number,
//         message: message,
//         email_own_boat: boatOwnerEmail
//       });

//       // console.log('chegou aqui ');

//       if (response?.data) {
//         toast.success('Seu email foi enviado com sucesso! Aguarde a resposta do vendedor!', {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored"
//         });
//       } else {
//         throw new Error();
//       }

//       // console.log('acabou ');

//       onClose();
//       setIsLoading(false);
//       handleGoHome();

//     } catch (error) {
//       setIsLoading(true);

//       toast.error('It is not possible to send this message. Please try later!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   }

//   return (
//     <Modal
//       initialFocusRef={initialRef}
//       finalFocusRef={finalRef}
//       isOpen={isOpen}
//       onClose={onClose}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         {/* <ModalHeader color="gray.700">{title}</ModalHeader> */}
//         <ModalHeader color="gray.700">Message Seller</ModalHeader>
//         {/* <Heading color="blue.400" fontSize={'sm'} px={6}>
//           Make a connection with the owner of this boat e deal with him all details!
//         </Heading> */}
//         <ModalCloseButton color="gray.700" />

//         <ModalBody pb={6}>
//           <VStack px={'auto'} spacing={3}>
//             <Stack w={'100%'}>
//               <FormControl>
//                 <FormLabel color="gray.700">Full Name</FormLabel>
//                 <InputLogin
//                   name='fullName'
//                   type={'text'}
//                   error={errors.fullName}
//                   register={register}
//                   options={{
//                     required: 'Insert your name.',
//                   }}
//                 />
//               </FormControl>
//             </Stack>

//             <Stack w={'100%'}>
//               <FormControl>
//                 <FormLabel color="gray.700">Your Email</FormLabel>
//                 <InputLogin
//                   name='email'
//                   type={'email'}
//                   error={errors.email}
//                   register={register}
//                   options={{
//                     required: 'Insert your email.',
//                   }}
//                 />
//               </FormControl>
//             </Stack>

//             <Stack w={'100%'}>
//               <FormControl>
//                 <FormLabel color="gray.700">Phone Number</FormLabel>
//                 <InputLogin
//                   name='phone_number'
//                   type={'text'}
//                   // height={"14rem"}
//                   error={errors.phone_number}
//                   register={register}
//                   options={{
//                     required: 'Insert your phone number.',
//                   }}
//                 />
//               </FormControl>
//             </Stack>

//             <Stack w={'100%'}>
//               <FormControl>
//                 <FormLabel color="gray.700">Your Message</FormLabel>
//                 {/* <InputLogin
//                   name='message'
//                   type={'text'}
//                   height={"14rem"}
//                   error={errors.message}
//                   register={register}
//                   options={{
//                     required: 'Insert your message.',
//                   }}
//                 /> */}

//                 <Textarea
//                   value={value}
//                   onChange={handleInputChange}
//                   placeholder='Here is a sample placeholder'
//                   size='md'
//                   minHeight='10rem'
//                   maxHeight='48rem'
//                   width='100%'
//                   resize='vertical'
//                 />
               
//               </FormControl>
//             </Stack>
//           </VStack>
//         </ModalBody>

//         <ModalFooter gap={3}>
//           <Button onClick={onClose} bg="red.300" color={'white'}>Return</Button>
//           <Button
//             bg='blue.300'
//             color={'white'}
//             type='submit'
//             mr={3}
//             isLoading={isLoading}
//             onClick={handleSubmit(handleSendEmail)}
//           >
//             Send Email
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//       <ToastContainer />
//     </Modal>
//   )
// }






// import {
//   Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent,
//   ModalFooter, ModalHeader, ModalOverlay, Stack, VStack, Textarea 
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import React, { useState } from "react";

// import "react-toastify/ReactToastify.min.css";
// import { api } from "../services/api";

// import * as yup from 'yup'
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import InputLogin from "./InputLogin";

// interface ModalContactSellerProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   email_owner_boat?: string;
//   boat_id: string;
// }

// type FormDataProps = {
//   fullName: string;
//   email: string;
//   phone_number: string;
//   message: string;
//   email_owner_boat?: string;
//   boatID: string;
// }

// export default function ModalContactSeller({ isOpen, onClose, email_owner_boat, boat_id }: ModalContactSellerProps) {

//   const initialRef = React.useRef(null)
//   const finalRef = React.useRef(null)
//   const navigate = useNavigate();
//   const boatOwnerEmail = email_owner_boat
//   const boatID = boat_id
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [value, setValue] = React.useState('')

//   const handleInputChange = (e:any) => {
//     const inputValue = e.target.value
//     setValue(inputValue)
//   }

//   async function handleGoHome() {
//     setIsLoading(true)
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     navigate('/listBoat');
//     setIsLoading(false)
//   }

//   const ModalEmailFormSchema = yup.object().shape({
//     fullName: yup.string().required('Insert your name'),
//     email: yup.string().required('Insert your email').email('Invalid E-mail'),
//     // phone_number: yup.string().required('Insert your phone number'),
//     message: yup.string().required('Insert your message'),
//   });

//   const { register, handleSubmit, formState } = useForm<FormDataProps>({
//     resolver: yupResolver(ModalEmailFormSchema)
//   });

//   const { errors } = formState

//   async function handleSendEmail({ fullName, email, message, phone_number, boatID}: FormDataProps) {

//     try {
//       const response = await api.post('/send_email/send_email_own_boat.php', {
//         full_name: fullName,
//         email: email,
//         phone: phone_number,
//         message: message,
//         email_own_boat: boatOwnerEmail,
//         boat_id: boatID
//       });

//       if (response?.data) {
//         toast.success('Seu email foi enviado com sucesso! Aguarde a resposta do vendedor!', {
//           position: "top-center",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored"
//         });
//       } else {
//         throw new Error();
//       }

//       onClose();
//       setIsLoading(false);
//       handleGoHome();

//     } catch (error) {
//       setIsLoading(true);

//       toast.error('It is not possible to send this message. Please try later!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   }

//   return (
//     <Modal
//       initialFocusRef={initialRef}
//       finalFocusRef={finalRef}
//       isOpen={isOpen}
//       onClose={onClose}
//     >
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader color="gray.700">Message Seller</ModalHeader>
//         <ModalCloseButton color="gray.700" />

//         <ModalBody pb={6}>
//           <VStack px={'auto'} spacing={3}>
//             <Stack w={'100%'}>
//               <FormControl>
//                 <FormLabel color="gray.700">Full Name</FormLabel>
//                 <InputLogin
//                   name='fullName'
//                   type={'text'}
//                   error={errors.fullName}
//                   register={register}
//                   options={{
//                     required: 'Insert your name.',
//                   }}
//                 />
//               </FormControl>
//             </Stack>

//             <Stack w={'100%'}>
//               <FormControl>
//                 <FormLabel color="gray.700">Your Email</FormLabel>
//                 <InputLogin
//                   name='email'
//                   type={'email'}
//                   error={errors.email}
//                   register={register}
//                   options={{
//                     required: 'Insert your email.',
//                   }}
//                 />
//               </FormControl>
//             </Stack>

//             <Stack w={'100%'}>
//               <FormControl>
//                 <FormLabel color="gray.700">Phone Number</FormLabel>
//                 <InputLogin
//                   name='phone_number'
//                   type={'text'}
//                   error={errors.phone_number}
//                   register={register}
//                   options={{
//                     required: 'Insert your phone number.',
//                   }}
//                 />
//               </FormControl>
//             </Stack>

//             <Stack w={'100%'}>
//               <FormControl>
//                 <FormLabel color="gray.700">Your Message</FormLabel>
//                   <Textarea
//                     value={value}
//                     onChange={handleInputChange}
//                     placeholder='Here is a sample placeholder'
//                     size='md'
//                     minHeight='10rem'
//                     maxHeight='48rem'
//                     width='100%'
//                     resize='vertical'
//                   />               
//               </FormControl>
//             </Stack>
//           </VStack>
//         </ModalBody>

//         <ModalFooter gap={3}>
//           <Button onClick={onClose} bg="red.300" color={'white'}>Return</Button>
//           <Button
//             bg='blue.300'
//             color={'white'}
//             type='submit'
//             mr={3}
//             isLoading={isLoading}
//             onClick={handleSubmit(handleSendEmail)}
//           >
//             Send Email
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//       <ToastContainer />
//     </Modal>
//   )
// }






import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import {
  Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, 
  ModalHeader, ModalOverlay, VStack, Textarea, FormErrorMessage, Input
} from "@chakra-ui/react";
import { api } from "../services/api";
import { toastApiResponse } from "./Toast";

interface ModalContactSellerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  email_owner_boat: string;
}

type FormDataProps = {
  fullName: string;
  email: string;
  phone_number?: string;
  message: string;
}

const ModalEmailFormSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  phone_number: yup.string().optional(),
  message: yup.string().required('Message is required'),
});

export default function ModalContactSeller({ isOpen, onClose, email_owner_boat }: ModalContactSellerProps) {
  
  const { id: boatId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm<FormDataProps>({
    resolver: yupResolver(ModalEmailFormSchema)
  });

  async function handleGoHome() {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    navigate('/listBoat');
  }

  async function handleSendEmail(data: FormDataProps) {
    setIsLoading(true);
    
    try {
      const response = await api.post('/send_email/send_email_own_boat.php', {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone_number || '',
        message: data.message,
        email_own_boat: email_owner_boat,
        boat_id: boatId
      });

      if (response?.data) {
        toastApiResponse(null, 'Your email was sent successfully! Wait for the seller response!');
      } else {
        throw new Error();
      }
      
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
      handleGoHome();

    } catch (error) {
      toast.error('It is not possible to send this message. Please try later!', {
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.700">Message Seller</ModalHeader>
        {/* <ModalBody>
          {email_owner_boat ? (
            <FormLabel color="gray.700">Você está enviando um email para {email_owner_boat}</FormLabel>
          ) : (
            <FormLabel color="red.500">O email do vendedor não está disponível no momento.</FormLabel>
          )}
        </ModalBody> */}
        <ModalCloseButton color="gray.700" />

        <ModalBody pb={6}>
          <VStack px={'auto'} spacing={3}>
            <FormControl isInvalid={!!errors.fullName}>
              <FormLabel color="gray.700">Full Name</FormLabel>
              <Input
                {...register('fullName')}
                // placeholder="Enter your full name"
              />
              <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel color="gray.700">Your Email</FormLabel>
              <Input
                {...register('email')}
                type="email"
                // placeholder="Enter your email"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.phone_number}>
              <FormLabel color="gray.700">Phone Number (Optional)</FormLabel>
              <Input
                {...register('phone_number')}
                // placeholder="Enter your phone number"
              />
              <FormErrorMessage>{errors.phone_number?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.message}>
              <FormLabel color="gray.700">Your Message</FormLabel>
              <Textarea
                {...register('message')}
                // placeholder='Enter your message here'
                size='md'
                minHeight='10rem'
                maxHeight='48rem'
                width='100%'
                resize='vertical'
              />
              <FormErrorMessage>{errors.message?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button onClick={onClose} bg="red.300" color={'white'}>Return</Button>
          <Button
            bg='blue.300'
            color={'white'}
            type='submit'
            mr={3}
            isLoading={isLoading}
            onClick={handleSubmit(handleSendEmail)}
          >
            Send Email
          </Button>
        </ModalFooter>
      </ModalContent>
      <ToastContainer />
    </Modal>
  )
}