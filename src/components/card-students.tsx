'use client'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react'
import { IoIosPricetags } from 'react-icons/io'

interface Aluno {
  id: number;
  nomeAluno: string;
  dataNascimento: string;
  cpfAluno: string;
  sexo: 'M' | 'F';
  nomePai: string;
  nomeMae: string;
  telefoneResponsavel: string;
  etnia: string;
  status: 'Ativo' | 'Inativo';
  bolsaFamilia: 0 | 1;
  statusTransporte: '0' | '1';
  numeroMatriculaRede: string;
  numeroInep: string;
  deficiencia: '0' | '1';
  etapaEnsino: string;
  turma: string;
  endereco: string;
  tipoVinculo: string;
  siglaConcessionariaEnergia: string;
  unidadeConsumidora: string;
  turno: 'Matutino' | 'Vespertino' | 'Noturno';
  rota: string;
  createdAt: string;
  updatedAt: string;
}


export default function CardStudents({
  nomeAluno, 
  dataNascimento, 
  cpfAluno, 
  sexo, 
  telefoneResponsavel, 
  turma, 
  turno, 
  rota 
}: Partial<Aluno>) {
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'xl'}
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />

        <Heading fontSize={'xl'} fontWeight={'semibold'} fontFamily={'body'} color={'blue.300'}>
          {nomeAluno}
        </Heading>

        <Text fontSize={'sm'} color={'gray.500'} mb={0} mt={1}>
          {nomeAluno}
        </Text>

        <Text fontSize={'sm'} color={'gray.500'} mb={4} mt={0}>
          {turma} | {turno} | Anne Sofia
        </Text>

        <VStack justifyContent='space-between' alignItems='center' w='100%'>
          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["sm", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                Transporte escolar: Sim
              </Text>
            </HStack>
          </HStack>

          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["sm", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                Rota: {rota}
              </Text>
            </HStack>
          </HStack>

          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["sm", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                Sexo: {sexo}
              </Text>
            </HStack>
          </HStack>

          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["sm", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                CPF: {cpfAluno}
              </Text>
            </HStack>
          </HStack>

          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["sm", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                Telefone: {telefoneResponsavel}
              </Text>
            </HStack>
          </HStack>

          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["xs", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                Data Nascimento: {dataNascimento}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <Stack mt={8} direction={'row'} spacing={4}>
          {/* <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}
          >
            Editar
          </Button> */}

          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Ver aluno
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}