'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Avatar,
  HStack,
  useToast,
} from '@chakra-ui/react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Loading from '../components/Loading';

interface Student {
  id: number;
  nome_aluno: string;
  data_nascimento: string;
  cpf_aluno: string;
  sexo: 'M' | 'F';
  nome_pai: string;
  nome_mae: string;
  telefone_responsavel: string;
  etnia: string;
  status: string;
  bolsa_familia: number;
  status_transporte: string;
  numero_matricula_rede: string;
  numero_inep: string;
  deficiencia: string;
  etapa_ensino: string;
  turma: string;
  endereco: string;
  tipo_vinculo: string;
  sigla_concessionaria_energia: string;
  unidade_consumidora: string;
  turno: string;
  rota: string;
  created_at: string;
  updated_at: string;
}

export default function StudentDetails() {

  const { id: studentId } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [currentDataUser, setCurrentDataUser] = useState<Student | null>(null);
  const toast = useToast();
  const textColorPrimary = useColorModeValue("blue.300", "white");

  async function fetchStudentDetails() {
    setLoading(true);

    try {
      const response = await api.get(`/alunos/${studentId}`);    
      setCurrentDataUser(response.data.student);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro de Login",
        description: "Não foi possivel carregar os dados do aluno.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      throw error;

    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  return (
    <Header>
      <Container maxW={'auto'}>
        <SimpleGrid
          columns={{ base: 1 }}
          spacing={{ base: 8 }}
          py={{ base: 6,}}
        >
          {loading ?
            <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={1000}>
              <VStack>          
                <Text
                  color={textColorPrimary}
                  fontWeight='bold'
                  fontSize='2xl'
                  mt='5px'
                  mb='5px'
                >
                  Por favor aguarde...
                </Text>
                <Text
                  color={textColorPrimary}
                  fontWeight='semibold'
                  fontSize='2xl'
                  mt='5px'
                  mb='10px'
                >
                  Estamos carregando as informações do aluno...
                </Text>
                <Loading/>
              </VStack>
            </Card>
            :
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>

                <HStack justifyContent={'flex-start'} alignItems={'flex-start'} spacing={4}>
                  <Avatar
                    size={'2xl'}
                    src={
                      'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                    }
                  />

                  <VStack spacing={{ base: 1, sm: 2 }} justifyContent={'flex-start'} alignItems={'flex-start'} mt={2}>
                    <Heading
                      color={useColorModeValue('blue.300', 'blue.200')}
                      fontWeight={600}
                      fontSize={{ base: 'md', sm: '2xl', md: '2xl', lg: '4xl' }}
                    >
                      {currentDataUser?.nome_aluno}
                    </Heading>

                    <Text
                      color={useColorModeValue('blue.300', 'blue.200')}
                      fontWeight={300}
                      fontSize={{ base: 'md', sm: 'xl', md: '2xl' }}
                    >
                      10 anos de idade
                    </Text>

                    <Text
                      color={useColorModeValue('blue.300', 'blue.200')}
                      fontWeight={300}
                      fontSize={{ base: 'md', sm: 'xl', md: '2xl' }}
                    >
                      Atualmente estuda no {currentDataUser?.turma}
                    </Text>
                  </VStack>  
                </HStack>            
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                  <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
                }
              >
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Informações básicas
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                          Nome completo:
                        </Text>{' '}
                        {currentDataUser?.nome_aluno}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                          CPF do Aluno:
                        </Text>{' '}
                        {currentDataUser?.cpf_aluno}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                          Data de nascimento:
                        </Text>{' '}
                        {currentDataUser?.data_nascimento}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                          Rota:
                        </Text>{' '}
                        {currentDataUser?.rota}
                      </ListItem>
                    </List>

                    <List spacing={2}>
                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                          Sexo:
                        </Text>{' '}
                        {currentDataUser?.sexo == 'F' ? 'Feminino' : 'Masculino'}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                          Turma:
                        </Text>{' '}
                        {currentDataUser?.turma}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                          Turno:
                        </Text>{' '}
                        {currentDataUser?.turno}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                          Endereço:
                        </Text>{' '}
                        {currentDataUser?.endereco}
                      </ListItem>
                    </List>
                  </SimpleGrid>
                </Box>

                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Informações familiares
                  </Text>

                  <List spacing={2}>
                    <ListItem color={'blue.300'}>
                      <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                        Nome do Pai:
                      </Text>{' '}
                      {currentDataUser?.nome_pai}
                    </ListItem>
                    <ListItem color={'blue.300'}>
                      <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                        Nome da mãe:
                      </Text>{' '}
                      {currentDataUser?.nome_mae}
                    </ListItem>
                    <ListItem color={'blue.300'}>
                      <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                        Telefone do Responsável:
                      </Text>{' '}
                      {currentDataUser?.telefone_responsavel}
                    </ListItem>
                    <ListItem color={'blue.300'}>
                      <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                        Bolsa Família:
                      </Text>{' '}
                      {currentDataUser?.bolsa_familia == 1 ? 'Sim' : 'Não'}
                    </ListItem>
                  </List>
                </Box>

                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={useColorModeValue('yellow.500', 'yellow.300')}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}
                  >
                    Informações complementares e escolores
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                    <List spacing={2}>
                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Etnia:</Text>{' '}
                        {currentDataUser?.etnia}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Possui alguma deficiência:</Text>{' '}
                        {currentDataUser?.deficiencia == "1" ? 'Sim' : 'Não'}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Status:</Text>{' '}
                        {currentDataUser?.status}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Usa transporte escolar:</Text>{' '}
                        {currentDataUser?.status_transporte == "1" ? 'Sim' : 'Não'}
                      </ListItem>

                      <ListItem color={'blue.300'}>
                        <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Número de Matrícula na Rede:</Text>{' '}
                        {currentDataUser?.numero_matricula_rede} 
                      </ListItem>
                    </List>

                    <List spacing={2}>
                        <ListItem color={'blue.300'}>
                          <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Número INEP:</Text>{' '}
                          {currentDataUser?.numero_inep}  
                        </ListItem>

                        <ListItem color={'blue.300'}>
                          <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Etapa de Ensino:</Text>{' '}
                          {currentDataUser?.etapa_ensino}  
                        </ListItem>

                        <ListItem color={'blue.300'}>
                          <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Tipo de Vínculo:</Text>{' '}
                          {currentDataUser?.tipo_vinculo}
                        </ListItem>

                        <ListItem color={'blue.300'}>
                          <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Sigla da Concessionária de Energia:</Text>{' '}
                          {currentDataUser?.sigla_concessionaria_energia} 
                        </ListItem>

                        <ListItem color={'blue.300'}>
                          <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>Unidade Consumidora:</Text>{' '}
                          {currentDataUser?.unidade_consumidora} 
                        </ListItem>
                    </List>
                  </SimpleGrid>
                </Box>
              </Stack>

              <HStack justifyContent={'center'} alignItems={'center'} spacing={4} width={'50%'} mx={'auto'}>
                <Button
                  rounded={50}
                  w={'50%'}
                  mt={8}
                  size={'md'}
                  py={'7'}
                  bg={useColorModeValue('blue.300', 'gray.50')}
                  color={useColorModeValue('white', 'gray.900')}
                  textTransform={'uppercase'}
                  _hover={{
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Editar informações
                </Button>

                <Button
                  rounded={50}
                  w={'50%'}
                  mt={8}
                  size={'md'}
                  py={'7'}
                  bg={useColorModeValue('red.500', 'red.200')}
                  color={useColorModeValue('white', 'gray.900')}
                  textTransform={'uppercase'}
                  _hover={{
                    transform: 'translateY(2px)',
                    boxShadow: 'lg',
                  }}
                >
                  Deletar aluno
                </Button>
              </HStack>
            </Stack>
          }
        </SimpleGrid>
      </Container>
    </Header>
  )
}