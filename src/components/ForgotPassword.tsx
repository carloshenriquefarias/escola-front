import { FormControl, VStack, Text, SimpleGrid, Button } from "@chakra-ui/react";
import { useState } from "react";
import { toastApiResponse } from "./Toast";

import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputLogin from "./InputLogin";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  onClick: () => void;
}

type FormDataProps = {
  email: string;
}

export default function ForgotPassword({ onClick }: Props) {

  const navigate = useNavigate();
  const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);

  const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail is required').email('Invalid E-mail'),
  });

  const { register, handleSubmit, formState } = useForm<FormDataProps>({
    resolver: yupResolver(signInFormSchema)
  });

  const { errors } = formState

  async function handleResetPassword({ email }: FormDataProps) {
    try {
      setIsLoadingResetPassword(true);     
      const response = await api.post('/send_email/send_email_reset.php', { email: email},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );      
      
      if (response?.data.success) {
        toastApiResponse(null, 'Check your email now to reset your password!');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate(`/login`);
      }  

    } catch (error: any) {
      console.error('Error:', error);     
      toast.error('Have been occurred an error! Please try again!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }); 

    } finally {
      setIsLoadingResetPassword(false);
    }
  }

  return (
    <SimpleGrid>
      <VStack px={'auto'} spacing={3} mt={10} mb={5}>
        <FormControl>
          <InputLogin
            placeholder='Email'
            name='email'
            type={'email'}
            error={errors.email}
            register={register}
            options={{
              required: 'Email is required.',
            }}
          />
        </FormControl>

        <Button
          bg={'yellow.500'}
          w={'full'}
          height={'3rem'}
          mb={1}
          onClick={handleSubmit(handleResetPassword)}
          isLoading={isLoadingResetPassword}
        >
          Reset password
        </Button>
      </VStack>

      <VStack spacing={3} w={'100%'} mt={5} px={'auto'}>
        <Text fontSize="14" color="gray.700" textAlign='center'>Don´t you have access?</Text>
        <Button
          bg={'blue.200'}
          w={'full'}
          height={'3rem'}
          mb={1}
          color={'white'}
          onClick={onClick}
        >
          Register an account
        </Button>
      </VStack>
    </SimpleGrid>
  )
}