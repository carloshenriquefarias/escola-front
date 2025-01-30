'use client'

import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  Text,
  SimpleGrid,
  HStack,
  useColorModeValue,
  Center,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

// Interface para os dados do formulário
interface FormData {
  name_class: string;
  teacher: string;
  period: string;
  description: string;
}

const RegisterClass: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const toast = useToast();
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post('/turmas', data);
  
      if (response.data.status === true) {
        toast({
          title: "Formulário enviado",
          description: "Os dados da turma foram cadastrados com sucesso.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
  
        navigate(`/all_class`);
      }

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar a turma",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Header>
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
              Registro de turma
            </Text>

            <Text color={'gray.500'} fontSize="md" me="6px" mb="5px" mt={2}>
              Preencha as informações abaixo sobre o novo turma
            </Text>
          </Box>
        </HStack>
      </SimpleGrid>

      <Box maxWidth="800px" margin="auto" mt={5} justifyContent={'flex-start'} my={10}>
        <VStack spacing={0} align="stretch">

          {/* Informações basicas */}
          <Card
            boxShadow={cardShadow} mb='5px' p={5} w="100%" bg={bg}
            // borderRadius="lg" shadow="md" borderWidth={1} borderColor={'gray.300'}
          >
            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="lg"
              textAlign="left"
            >
              Informações básicas sobre a turma
            </Text>

            <Box
              mx="auto"
              mt={8}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              // as="form" onSubmit={handleSubmit(onSubmit)}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                  {/* Campo Name Class */}
                  <FormControl isInvalid={!!errors.name_class}>
                    <FormLabel>Nome da Turma</FormLabel>
                    <Input
                      placeholder="Ex: 6A"
                      {...register('name_class', { required: 'O nome da turma é obrigatório.' })}
                    />
                    {errors.name_class && (
                      <Text color="red.500" fontSize="sm">
                        {errors.name_class.message}
                      </Text>
                    )}
                  </FormControl>

                  {/* Campo Teacher */}
                  <FormControl isInvalid={!!errors.teacher}>
                    <FormLabel>Professor</FormLabel>
                    <Input
                      placeholder="Ex: Professor João"
                      {...register('teacher', { required: 'O nome do professor é obrigatório.' })}
                    />
                    {errors.teacher && (
                      <Text color="red.500" fontSize="sm">
                        {errors.teacher.message}
                      </Text>
                    )}
                  </FormControl>

                  {/* Campo Period */}
                  <FormControl isInvalid={!!errors.period}>
                    <FormLabel>Período</FormLabel>
                    <Select
                      placeholder="Selecione o período"
                      {...register('period', { required: 'O período é obrigatório.' })}
                    >
                      <option value="Matutino">Matutino</option>
                      <option value="Vespertino">Vespertino</option>
                      {/* <option value="Noturno">Noturno</option> */}
                    </Select>
                    {errors.period && (
                      <Text color="red.500" fontSize="sm">
                        {errors.period.message}
                      </Text>
                    )}
                  </FormControl>

                  {/* Campo Description */}
                  <FormControl isInvalid={!!errors.description}>
                    <FormLabel>Descrição</FormLabel>
                    <Textarea
                      placeholder="Escreva uma breve descrição"
                      {...register('description', { required: 'A descrição é obrigatória.' })}
                    />
                    {errors.description && (
                      <Text color="red.500" fontSize="sm">
                        {errors.description.message}
                      </Text>
                    )}
                  </FormControl>
                  
                  <Center>
                    <Button colorScheme="blue" type="submit" width="full">
                      Salvar Turma
                    </Button>
                  </Center>
                </VStack>
              </form>
            </Box>


          </Card>
        </VStack>
      </Box>
    </Header>
  );
};

export default RegisterClass;
