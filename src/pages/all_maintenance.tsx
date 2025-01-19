import { Flex, SimpleGrid, useColorModeValue, Text, Box, HStack, TableContainer, Table, 
  Thead, Tr, Th, Tbody, Td, Button, VStack, Badge, Icon 
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuMiniStatistics from '../components/MenuMiniStatistics';
// import CardClass from '../components/card-class';

import { HiLockOpen } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi";
import { WiSunrise } from "react-icons/wi";
import { BsFillSunFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { toastApiResponse } from '../components/Toast';

// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

interface Galeria {
  id: number;
  url: string;
}

interface Onibus {
  id?: number;
  placa_onibus?: string;
}

interface Manutencao {
  id: number;
  onibus?: Onibus;
  data: string;
  nome_motorista: string;
  rota: string;
  km_atual: string;
  problema: string[]; // Certifique-se de que está tipado como array de strings
  data_da_manutencao: string;
  status_manutencao: number;
  foto_principal_url: string | null;
  galeria: Galeria[];
}

interface ManutencoesResponse {
  manutencoes: Manutencao[];
}

export default function AllMaintenance() {

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorSecondary = "gray.400";

  const [allMaintenance, setAllMaintenance] = useState<Manutencao[]>([]);

  const statisticsData = [
    { bg: 'blue', icon: GiTeacher, name: 'Total de trumas', value: '10' },
    { bg: '', icon: WiSunrise, name: 'Turmas da manhã', value: '10' },
    { bg: '', icon: BsFillSunFill, name: 'Turmas da tarde', value: '10' },
    { bg: 'blue', icon: HiLockOpen, name: 'Alunos', value: '10' },
    { bg: 'blue', icon: HiLockOpen, name: 'Deficientes', value: '10' },
    { bg: 'blue', icon: HiLockClosed, name: 'Femininos', value: '10' },
  ];

  const fetchAllMaintenance = async () => {
    try {
      const response = await api.get('/manutencoes');
      const allMaintenanceRegistered = Array.isArray(response.data.manutencoes) ? response.data.manutencoes : [];
      setAllMaintenance(allMaintenanceRegistered);

    } catch (error) {
      console.error('Error:', error);
      setAllMaintenance([]);
      toastApiResponse(error, 'Não foi possível listar as manutenções! Por favor, tente novamente!');
    }
  };

  const handleRegisterMaintenance = () => {
    navigate(`/register_maintenance`);
  };

  const handleMaintenanceDetails = (maintenance_ID: number) => {
    navigate(`/maintenance_details/${maintenance_ID}`);
  };

  useEffect(() => {
    fetchAllMaintenance();
  }, []);

  const ManutencaoTable = ({ manutencoes }: ManutencoesResponse) => {
    return (
      <VStack spacing={4} align="start" w="100%">
        {/* <Heading size="md">Tabela de Manutenções</Heading> */}
        <TableContainer w="100%">
          <Table variant="striped" colorScheme="facebook">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Placa</Th>
                <Th>Motorista</Th>
                <Th>Rota</Th>
                <Th>KM Atual</Th>
                <Th>Problemas</Th>
                <Th>Data</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {manutencoes.map((manutencao) => (
                <Tr key={manutencao.id}>
                  <Td>{manutencao.id}</Td>
                  <Td>{manutencao.onibus?.placa_onibus}</Td>
                  <Td>{manutencao.nome_motorista}</Td>
                  <Td>{manutencao.rota}</Td>
                  <Td>{manutencao.km_atual}</Td>
                  <Td>
                    <VStack align="start">
                      {Array.isArray(manutencao.problema) ? (
                        manutencao.problema.map((problema, index) => (
                          <Badge key={index} colorScheme="red">
                            {problema}
                          </Badge>
                        ))
                      ) : (
                        <Badge colorScheme="red">{manutencao.problema}</Badge> // Caso seja uma string
                      )}
                    </VStack>
                  </Td>
                  <Td>{manutencao.data_da_manutencao}</Td>
                  <Td>
                    {manutencao.status_manutencao === 0 ? (
                      <Badge colorScheme="yellow">Pendente</Badge>
                    ) : (
                      <Badge colorScheme="green">Concluído</Badge>
                    )}
                  </Td>
                  <Td>
                    <HStack>
                      <Button 
                        size="sm" 
                        variant="solid" 
                        bg="gray.700" 
                        fontWeight="semibold" 
                        color={'white'} 
                        onClick={() => handleMaintenanceDetails(manutencao.id)}
                      >
                        Detalhes
                      </Button>
                      <Button size="sm" variant="solid" bg="blue.400" fontWeight="semibold" color={'white'}>
                        Editar
                      </Button>
                      <Button size="sm" variant="solid" colorScheme="red" fontWeight="semibold">
                        Excluir
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    );
  };

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
                    Manutenções e consertos
                  </Text>

                  <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                    Todas as informações sobre manutenções e consertos dos onibus da escola
                  </Text>
                </Box>

                <Button bg='gray.100' w='auto' h={'80px'} onClick={handleRegisterMaintenance}>
                  <VStack pt={0}>
                    <Icon as={FaPlus} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Nova manutenção</Text>
                  </VStack>
                </Button>
              </HStack>
            </SimpleGrid>
        </motion.div>

        <Card boxShadow={cardShadow} my='10px' p={5} w="100%" borderRadius={10} bg={bg}>
          <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
            Estatisticas e dados sobre as manutenções
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
            Encontre a manutenção que voce deseja
          </Text>

          <ManutencaoTable manutencoes={allMaintenance} />
        </Card>

        <ToastContainer />
        <Footer />
      </Header>
    </Flex>
  )
}

