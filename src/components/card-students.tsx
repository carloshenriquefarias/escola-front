'use client'

import { Heading, Avatar, Text, Stack, Button, useColorModeValue,
  HStack, Icon, VStack, Box,
} from '@chakra-ui/react';

import { FaBusAlt } from "react-icons/fa";
import { BsUniversalAccess } from "react-icons/bs";
import { TbMoodBoy } from "react-icons/tb";
import { CgGirl } from "react-icons/cg";
import { ImListNumbered } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { PiCalendarFill } from "react-icons/pi";

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
  professora: string;
  onClick?: () => void;
  createdAt: string;
  updatedAt: string;
}

function InfoItem({ icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <HStack justifyContent='flex-start' alignItems='center' w='100%'>
      <Icon as={icon} color="gray.300" />
      <Text fontSize="sm" fontWeight="semibold" color='gray.300' textAlign='left'>
        {text}
      </Text>
    </HStack>
  )
}

export default function CardStudents({
  nomeAluno,
  dataNascimento,
  cpfAluno,
  sexo,
  telefoneResponsavel,
  turma,
  turno,
  etnia,
  rota,
  onClick,
  professora,
}: Partial<Aluno>) {

  const getFirstAndLastName = (fullName: string | undefined): string => {
    if (!fullName) return 'Nome não disponível';
    const names = fullName.split(' ');
    if (names.length === 1) return names[0];
    return `${names[0]} ${names[names.length - 1]}`;
  };

  const formatDateToBrazilian = (dateString: string | undefined): string => {
    if (!dateString) return 'Data não disponível';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderColor={'gray.100'}
      borderWidth={'1px'}
      transition="all 0.25s"
      transitionTimingFunction="spring(1 100 10 10)"
      _hover={{ transform: "translateY(-4px)", shadow: "xl", boxShadow: "0 0 0 4px cyan" }}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={4}
      width="100%"
    >
      <VStack justifyContent='center' alignItems='center'>
        <Avatar
          size={'xl'}
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
          mb={2}
        />

        <Heading fontSize={'xl'} fontWeight={'semibold'} fontFamily={'body'} color={'blue.300'}>
          {getFirstAndLastName(nomeAluno)}
        </Heading>

        <Text fontSize={'sm'} color={'gray.500'}>
          {nomeAluno}
        </Text>

        <Text fontSize={'sm'} color={'gray.500'} mb={4}>
          {turma} | {turno} | {professora}
        </Text>
      </VStack>

      <VStack justifyContent='space-between' alignItems='center' w='100%' spacing={2}>
        <InfoItem icon={FaBusAlt} text={`Rota: ${rota}`} />
        <InfoItem icon={sexo === 'M' ? TbMoodBoy : CgGirl} text={`Sexo: ${sexo === 'M' ? 'Masculino' : 'Feminino'}`} />
        <InfoItem icon={BsUniversalAccess} text={`Etnia: ${etnia}`} />
        <InfoItem icon={ImListNumbered} text={`CPF: ${cpfAluno}`} />
        <InfoItem icon={FaPhoneAlt} text={`Telefone: ${telefoneResponsavel}`} />
        <InfoItem icon={PiCalendarFill} text={`Data Nascimento: ${formatDateToBrazilian(dataNascimento)}`} />
      </VStack>

      <Stack mt={8} direction={'row'} spacing={4}>
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
          onClick={onClick}
        >
          Ver aluno
        </Button>
      </Stack>
    </Box>
  )
}

