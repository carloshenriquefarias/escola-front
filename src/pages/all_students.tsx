import {
  Flex, SimpleGrid, useColorModeValue, Text, Box, HStack, InputGroup, Input, Button, Stack, Spinner, VStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select as ChakraSelect,
  ModalFooter,
  Divider,
  Heading,
} from '@chakra-ui/react';
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
import { FaBuysellads, FaRegFaceSadCry } from "react-icons/fa6";
import { HiLockOpen } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi";
import { AiFillLike, AiOutlineReload } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaSearch, FaUserTie } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { MdPayment } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from '../components/Toast';
import "react-toastify/ReactToastify.min.css";
import MultiSelectComponent from '../components/MultSelect';

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

interface StudentOption {
  value: string;
  label: string;
}

export default function AllStudents() {

  // const { user } = useAuth();
  // const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  // const isWideVersion = useBreakpointValue({ base: false, lg: true});

  // Settings and config

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const textColorSecondary = "gray.400";
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Stored data
  
  const [allStudents, setAllStudents] = useState<Aluno[]>([]);
  const [allDataToDashboard, setAllDataToDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
 
  // Filters and search

  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<Aluno[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sexo, setSexo] = useState<string>('');
  const [etnia, setEtnia] = useState<string>(''); 
  const [packageFamily, setPackageFamily] = useState<string>('');
  const [schoolBus, setSchoolBus] = useState<string>('');
  const [deficiency, setDeficiency] = useState<string>('');
  const [classStudent, setClassStudent] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [route, setRoute] = useState<string>('');
  const [combinedOptions, setCombinedOptions] = useState<StudentOption[]>([]);
  const studentsToDisplay = isSearching ? searchResults : allStudents;

  // Dashboard data

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

  // 1 - Fetch Data

  const fetchAllStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/alunos');
      const allStudents = response.data.alunos;
      setAllStudents(allStudents);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    }
  };

  const fetchDataToDashboard = async () => {
    setLoading(true);
    try {
      const response = await api.get('/alunos/dashboard');
      const dataDashboard = response.data.dashboard;
      setAllDataToDashboard(dataDashboard);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    }
  };

  // 2 - Searchs

  const handleSearchStudent = async () => {
    setLoading(true);
    setIsSearching(true);

    try {
      const response = await api.post('/alunos/buscar', {
        query: inputValue
      });

      const allResults = response.data.data;
      setSearchResults(allResults);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      toastApiResponse(error, 'Não foi possível listar os alunos desta turma! Por favor, tente novamente!');
    }
  };

  const handleMultiSelectChange = (newOptions: StudentOption[]) => {
    setCombinedOptions(newOptions);
    // setSexo(newOptions.find(option => option.label.startsWith('Sexo:'))?.value || '');
    setSexo(newOptions.find(option => option.value === sexo)?.value || '');
    setEtnia(newOptions.find(option => option.value === etnia)?.value || '');
    setPackageFamily(newOptions.find(option => option.value === packageFamily)?.value || '');
    setSchoolBus(newOptions.find(option => option.value === schoolBus)?.value || '');
    setDeficiency(newOptions.find(option => option.value === deficiency)?.value || '');
    setClassStudent(newOptions.find(option => option.value === classStudent)?.value || '');
    setPeriod(newOptions.find(option => option.value === period)?.value || '');
    setRoute(newOptions.find(option => option.value === route)?.value || '');
  };

  const handleAdvancedSearch = async () => {

    const formattedSexo = sexo === ''
      ? ''
      : sexo === 'Masculino'
      ? 'M'
      : 'F';

    const dataToSend = {
      sexo: formattedSexo,
      etnia: etnia,
      turno: period,
      turma: classStudent,
      // bolsa_familia: packageFamily === 'true'? 1 : 0,
      // status_transporte: schoolBus === 'true'? 1 : 0,
      // deficiencia: deficiency === 'true'? 1 : 0,
      rota: route
    };

    console.log('Os dados enviados para a busca avançada são:', dataToSend);

    setLoading(true);

    try {
      const response = await api.post('/alunos/search', dataToSend);
      const allResults = response.data;
      console.log('Os resultados foram:', allResults);
      setLoading(false);
      return
      setSearchResults(allResults);
      onClose();

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      toastApiResponse(error, 'Não foi possível listar os alunos desta turma! Por favor, tente novamente!');
    }
  };

  const resetSearch = () => {
    setIsSearching(false);
    setInputValue("");
    setSearchResults([]);
    setCombinedOptions([]);
  };

  const openProfile = () => {
    onOpen();
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // 3 - Navigate to pages

  const handleStudentDetails = (student_ID: number) => {
    navigate(`/student_details/${student_ID}`);
  };

  // 4 - Use effects and callbacks

  useEffect(() => {
    const newOptions: StudentOption[] = [];
    if (sexo) newOptions.push({ value: sexo, label: sexo });
    if (etnia) newOptions.push({ value: etnia, label: etnia });
    if (packageFamily) newOptions.push({ value: packageFamily, label: packageFamily });
    if (schoolBus) newOptions.push({ value: schoolBus, label: schoolBus });
    if (deficiency) newOptions.push({ value: deficiency, label: deficiency });
    if (classStudent) newOptions.push({ value: classStudent, label: classStudent });
    if (period) newOptions.push({ value: period, label: period });
    if (route) newOptions.push({ value: route, label: route });
    setCombinedOptions(newOptions);
  }, [sexo, etnia, packageFamily, schoolBus, deficiency, classStudent, period, route]);

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

          <VStack my={5} gap={2} width={'100%'} px={3}>
            <InputGroup size="md" width={'50%'}>
              <Input
                type="text"
                placeholder="Digite o nome do aluno..."
                borderRadius="full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </InputGroup>

            <HStack justifyContent={'center'} alignItems={'center'} width={'50%'} mt={3} gap={5}>

              <Button
                h="3rem"
                size="lg"
                bg="blue.300"
                _hover={{ bg: "cyan.500" }}
                borderRadius="full"
                leftIcon={<FaSearch />}
                onClick={handleSearchStudent}
                color={'white'}
                fontSize={'sm'}
              >
                Pesquisar
              </Button>

              <Button
                h="3rem"
                size="lg"
                bg="blue.500"
                _hover={{ bg: "cyan.800" }}
                borderRadius="full"
                leftIcon={<FaFilter />}
                onClick={() => openProfile()}
                color={'white'}
                fontSize={'sm'}
              >
                Filtro avançado
              </Button>

              <Button
                h="3rem"
                size="lg"
                bg="gray.300"
                _hover={{ bg: "red.500" }}
                borderRadius="full"
                leftIcon={<AiOutlineReload />}
                onClick={resetSearch}
                color={'white'}
                fontSize={'sm'}
              >
                Resetar filtro
              </Button>
            </HStack>
          </VStack>

          {loading ? (
            <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Stack>
          ) : (
            <Flex direction="column" mt={4}>
              {isSearching && studentsToDisplay.length === 0 ? (
                <Flex direction="column" align="center">
                  <Box fontSize="48px" color="gray.500">
                    <FaRegFaceSadCry />
                  </Box>

                  <Text my={5}>Desculpe, mas esse aluno não foi encontrado! Tente outra vez...</Text>

                  <Button mb={2} colorScheme="blue" onClick={resetSearch}>
                    Mostrar todos os alunos
                  </Button>
                </Flex>
              ) : (
                <>
                  {isSearching &&
                    <Text fontWeight="semibold" fontSize={'lg'} my={5} pl={4} color={'blue.300'}>
                      Alunos encontrados: {studentsToDisplay.length}
                    </Text>
                  }

                  <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                    spacing={4}
                    px={2}
                    w="100%"
                    mt={5}
                  >
                    {studentsToDisplay.map((student, index) => (
                      <CardStudents
                        key={student.id || index}
                        nomeAluno={student.nome_aluno}
                        turma={student.turma}
                        turno={student.turno}
                        rota={student.rota}
                        sexo={student.sexo}
                        // sexo={student.sexo === 'F' ? "Feminino" : "Masculino"} // Corrigido o valor de gender (estava como student)
                        cpfAluno={student.cpf_aluno}
                        telefoneResponsavel={student.telefone_responsavel}
                        dataNascimento={student.data_nascimento}
                        onClick={() => handleStudentDetails(student.id)}
                      />
                    ))}
                  </SimpleGrid>
                </>
              )}
            </Flex>
          )}
        </Card>

        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Filtro avançado</ModalHeader>
            <Heading fontSize={'sm'} px={6} fontWeight={'semibold'} color={'gray.600'} mt={-2}>
              Escolha as caracteristicas do aluno que voce deseja
            </Heading>
            <ModalCloseButton />

            <ModalBody>

              <VStack width={'100%'} alignItems={'flex-start'}>
                <HStack justifyContent={!isSearching ? "flex-end" : "space-between"} width="100%" px={0}>
                  {isSearching &&
                    <Text mb={0} fontWeight="bold" fontSize={'xl'} textAlign={'left'}>
                      {searchResults.length} {searchResults.length === 1 ? "Total de alunos encontados" : "Encontrados"}
                    </Text>
                  }
                </HStack>

                <Box width={'100%'} my={3}>
                  <Text mb={2} fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Suas opções selecionadas são:
                  </Text>

                  <MultiSelectComponent 
                    selectedOptions={combinedOptions} 
                    onChange={handleMultiSelectChange}
                  />
                </Box>
              </VStack>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="100%">

                <ChakraSelect placeholder="Selecione o sexo" onChange={(e) => setSexo(e.target.value)} value={sexo}>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </ChakraSelect>

                <ChakraSelect placeholder="Selecione a etnia" onChange={(e) => setEtnia(e.target.value)} value={etnia}>
                  <option value="Branco">Branco</option>
                  <option value="Pardo">Pardo</option>
                  <option value="Preto">Preto</option>
                  <option value="Amarelo">Amarelo</option>
                  <option value="Indígena">Indígena</option>
                </ChakraSelect>

                <ChakraSelect placeholder="Usa o bolsa familia" onChange={(e) => setPackageFamily(e.target.value)} value={packageFamily}>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </ChakraSelect>

                <ChakraSelect placeholder="Usa transporte escolar" onChange={(e) => setSchoolBus(e.target.value)} value={schoolBus}>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </ChakraSelect>

                <ChakraSelect placeholder="Possui deficiencia" onChange={(e) => setDeficiency(e.target.value)} value={deficiency}>
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </ChakraSelect>

                <ChakraSelect placeholder="Selecione a turma" onChange={(e) => setClassStudent(e.target.value)} value={classStudent}>
                  <option value="1A">1A</option>
                  <option value="1B">1B</option>
                  <option value="1C">1C</option>
                  <option value="1D">1D</option>
                </ChakraSelect>

                <ChakraSelect placeholder="Selecione o turno" onChange={(e) => setPeriod(e.target.value)} value={period}>
                  <option value="Matutino">Matutino</option>
                  <option value="Vespertino">Vespertino</option>
                  <option value="Noturno">Noturno</option>
                </ChakraSelect>

                <ChakraSelect placeholder="Selecione a rota" onChange={(e) => setRoute(e.target.value)} value={route}>
                  <option value="1">Rota 01</option>
                  <option value="2">Rota 02</option>
                  <option value="3">Rota 03</option>
                  <option value="4">Rota 04</option>
                  <option value="10">Rota 10</option>
                </ChakraSelect>
              </SimpleGrid>
            </ModalBody>

            <Box width={'100%'} px={7} mt={5}>
              <Divider/>
            </Box>

            <ModalFooter width={'100%'} justifyContent={'center'} alignItems={'center'} gap={5}>
              <Button variant="outline" onClick={onClose} fontSize={'sm'} leftIcon={<FaArrowRotateLeft />}>
                Cancelar
              </Button>
              <Button variant="solid" colorScheme="blue" fontSize={'sm'} onClick={handleAdvancedSearch} leftIcon={<FaFilter />}>
                Aplicar filtros
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <ToastContainer />
        <Footer />
      </Header>
    </Flex>
  )
}