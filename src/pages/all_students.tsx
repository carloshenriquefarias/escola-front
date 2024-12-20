import { Flex, SimpleGrid, useColorModeValue, Text, Box, HStack, InputGroup, Input, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Card from '../components/Card'
import CardStudents from '../components/card-students';
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuMiniStatistics from '../components/MenuMiniStatistics';

import { api } from '../services/api';
import { MdAttachMoney } from "react-icons/md";
import { MdDirectionsBoatFilled } from "react-icons/md";
import { FaBuysellads } from "react-icons/fa6";
import { HiLockOpen } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi";
import { AiFillLike, AiOutlineReload } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaSearch, FaUserTie } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdPayment } from "react-icons/md";

// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from '../components/Toast';
import "react-toastify/ReactToastify.min.css";

interface Aluno {
  id: number;
  nome_aluno: string;
  data_nascimento: string;
  cpf_aluno: string;
  sexo: 'M' | 'F';
  nomePai: string;
  nomeMae: string;
  telefone_responsavel: string;
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

interface DashboardData {
  total_alunos: number;
  total_ativos: number;
  total_bolsa_familia: number;
  total_deficiencia: number;
  total_feminino: number;
  total_masculino: number;
  total_inativos: number;
  total_tarde: number;
}

export default function AllStudents() {

  // const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const textColorSecondary = "gray.400";

  // const navigate = useNavigate();
  // const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  // const isWideVersion = useBreakpointValue({ base: false, lg: true});

  const [allStudents, setAllStudents] = useState<Aluno[]>([]);
  const [allDataToDashboard, setAllDataToDashboard] = useState<DashboardData | null>(null);

  const fetchAllStudents = async () => {
    try {
      const response = await api.get('/alunos');
      const allStudents = response.data.alunos;
      setAllStudents(allStudents);
      console.log('Dados do usuário:', allStudents);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    }
  };

  const fetchDataToDashboard = async () => {
    try {
      const response = await api.get('/alunos/dashboard');
      const dataDashboard = response.data.dashboard;
      setAllDataToDashboard(dataDashboard);
      console.log('Dados do dashboard:', dataDashboard);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    }
  };

  const statisticsData = [
    { bg: 'blue', icon: MdDirectionsBoatFilled, name: 'Total de alunos', value: allDataToDashboard?.total_alunos ?? 0 },
    { bg: '', icon: AiFillLike, name: 'Alunos ativos', value: allDataToDashboard?.total_ativos ?? 0 },
    { bg: '', icon: AiFillDislike, name: 'Bolsa familia', value: allDataToDashboard?.total_bolsa_familia ?? 0 },
    { bg: 'blue', icon: HiLockOpen, name: 'Alunos Deficientes', value: allDataToDashboard?.total_deficiencia ?? 0 },
    { bg: 'blue', icon: HiLockClosed, name: 'Femininos', value: allDataToDashboard?.total_feminino ?? 0 },
    { bg: 'white', icon: MdAttachMoney, name: 'Masculinos', value: allDataToDashboard?.total_masculino ?? 0 },
    { bg: 'blue', icon: FaBuysellads, name: 'Total ads', value: allDataToDashboard?.total_feminino ?? 0 },
    { bg: '', icon: ImNewspaper, name: 'Total news', value: allDataToDashboard?.total_inativos ?? 0 },
    { bg: '', icon: HiClipboardDocumentList, name: 'Total plans', value: allDataToDashboard?.total_tarde ?? 0 },
    { bg: 'blue', icon: MdPayment, name: 'Alunos matutinos', value: '15' },
    { bg: 'blue', icon: FaUserTie, name: 'Alunos verspertino', value: allStudents?.length ?? 0 },
  ];

  useEffect(() => {
    fetchAllStudents();
    fetchDataToDashboard();
  }, []);

  return (
    <Flex direction="column" height="100%" bg="red">
      <Header>
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -150 }}
          transition={{ duration: 0.7 }}
        >
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
                  Bem vindo ao Contrans, Carlos Henrique
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                  Este e o melhor lugar para voce ter informações sobre o transporte escolar
                </Text>
              </Box>
            </HStack>
          </SimpleGrid>
        </motion.div>

        <Card boxShadow={cardShadow} my='10px' p={5} w="100%" borderRadius={10} bg={bg}>
          <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
            Informações sobre os alunos
          </Text>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            spacing={4}
            w="100%"
            mt={5}
          >
            {statisticsData.map((data, index) => (
              <MenuMiniStatistics key={index} {...data} />
            ))}
          </SimpleGrid>
        </Card>

        <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} w="100%" mx='auto' borderRadius={10}>
          <Text color={textColorSecondary} fontSize='md' mb='10px'>
            Encontre o aluno que voce deseja
          </Text>

          <Flex my={5} gap={2} width={'100%'}>
            <InputGroup size="lg">
              <Input
                type="text"
                placeholder="Digite o nome do aluno..."
                borderRadius="full"
              // value={inputValue}
              // onChange={(e) => setInputValue(e.target.value)}
              />
            </InputGroup>

            <Button
              h="3rem"
              size="lg"
              bg="blue.500"
              _hover={{ bg: "blue.200" }}
              borderRadius="full"
              leftIcon={<FaSearch />}
              // onClick={handleSearch}
              color={'white'}
              fontSize={'md'}
            >
              Search
            </Button>

            <Button
              h="3rem"
              size="lg"
              bg="red.500"
              _hover={{ bg: "red.300" }}
              borderRadius="full"
              leftIcon={<AiOutlineReload />}
              // onClick={resetSearch}
              color={'white'}
              fontSize={'md'}
            >
              Reset
            </Button>
          </Flex>

          <SimpleGrid columns={{ base: 2, md: 3, lg: 3, xl: 5 }} spacing={2} px={2} w="100%">
            {allStudents?.map((student, index) => (
              <CardStudents
                key={index} // Chave única para cada item mapeado (melhor usar student.id se existir)
                nomeAluno={student.nome_aluno}
                turma={student.turma}
                turno={student.turno}
                rota={student.rota}
                sexo={student.sexo}
                // sexo={student.sexo === 'F' ? "Feminino" : "Masculino"} // Corrigido o valor de gender (estava como student)
                cpfAluno={student.cpf_aluno} // Corrigido para pegar o CPF correto
                telefoneResponsavel={student.telefone_responsavel} // Corrigido para pegar o phone_number
                dataNascimento={student.data_nascimento} // Corrigido para pegar a data de nascimento
              />
            ))}            
          </SimpleGrid>
        </Card>

        <ToastContainer />
        <Footer />
      </Header>
    </Flex>
  )
}