import {
  Flex, SimpleGrid, useColorModeValue, Text, Box, HStack, InputGroup, Input, Button, Stack, Spinner, VStack,
  useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  Select as ChakraSelect, ModalFooter, Divider, Heading, RadioGroup, Radio,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../services/api';

import Card from '../components/Card'
import CardStudents from '../components/card-students';
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuMiniStatistics from '../components/MenuMiniStatistics';
import TableStudents from '../components/TableStudents';

import { FaRegFaceSadCry } from "react-icons/fa6";
import { AiFillLike, AiOutlineReload } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { PiStudentBold } from "react-icons/pi";
import { FaWheelchair } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { TbMoodBoy } from "react-icons/tb";
import { IoWomanSharp } from "react-icons/io5";
import { WiSunrise } from "react-icons/wi";
import { BsFillSunFill } from "react-icons/bs";
import { FaExchangeAlt } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { TbSquareArrowLeft } from "react-icons/tb";
import { TbSquareArrowRight } from "react-icons/tb";

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from '../components/Toast';
import "react-toastify/ReactToastify.min.css";

// import { useAuth } from '../hooks/useAuth';
// import MultiSelectComponent from '../components/MultSelect';

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
  bolsa_familia: 0 | 1;
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

// interface StudentOption {
//   value: string;
//   label: string;
// }

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

  // const [allStudents, setAllStudents] = useState<Aluno[]>([]);
  const [allDataToDashboard, setAllDataToDashboard] = useState<DashboardData | null>(null);
  // const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState('1');

  // Filters and search

  const [inputValue, setInputValue] = useState("");
  // const [searchResults, setSearchResults] = useState<Aluno[]>([]);
  // const [isSearching, setIsSearching] = useState(false);
  const [sexo, setSexo] = useState<string>('');
  const [etnia, setEtnia] = useState<string>('');
  const [packageFamily, setPackageFamily] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [deficiency, setDeficiency] = useState<string>('');
  const [classStudent, setClassStudent] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [route, setRoute] = useState<string>('');
  // const [combinedOptions, setCombinedOptions] = useState<StudentOption[]>([]);
  // const studentsToDisplay = isSearching ? searchResults : allStudents;
  // const studentsToDisplay = isSearching
  //   ? (Array.isArray(searchResults) ? searchResults : [])
  //   : (Array.isArray(allStudents) ? allStudents : [])
  // ;

  const [allStudents, setAllStudents] = useState<Aluno[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false); // Estado para busca
  const [searchResults, setSearchResults] = useState<Aluno[] | null>(null); // Resultados da busca

  const studentsToDisplay = isSearching
    ? Array.isArray(searchResults)
      ? searchResults
      : []
    : Array.isArray(allStudents)
    ? allStudents
    : []
  ;

  // Função para rolar para o topo
  const scrollToTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Rola suavemente para o topo
    });
  };

  // Gera a lista de números de página para exibição
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalToShow = 5; // Número de páginas a exibir no centro
    const start = Math.max(1, currentPage - Math.floor(totalToShow / 2));
    const end = Math.min(totalPages, start + totalToShow - 1);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return (
      <Flex>
        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(page)}
            variant={page === currentPage ? "solid" : "outline"}
            colorScheme={page === currentPage ? "blue" : "gray"}
            mx={1}
          >
            {page}
          </Button>
        ))}
        {totalPages > end && (
          <Button
            onClick={() => setCurrentPage(totalPages)}
            variant="outline"
            colorScheme="gray"
            mx={1}
          >
            {totalPages}
          </Button>
        )}
      </Flex>
    );
  };

  // Dashboard data

  const statisticsData = [
    { bg: 'blue', icon: PiStudentBold, name: 'Total de alunos', value: allDataToDashboard?.total_alunos ?? 0 },
    { bg: '', icon: AiFillLike, name: 'Alunos ativos', value: allDataToDashboard?.total_ativos ?? 0 },
    { bg: '', icon: AiFillDislike, name: 'Alunos inativos', value: allDataToDashboard?.total_tarde ?? 0 },
    { bg: 'blue', icon: FaWheelchair, name: 'Alunos Deficientes', value: allDataToDashboard?.total_deficiencia ?? 0 },
    { bg: '', icon: MdFamilyRestroom, name: 'Bolsa familia', value: allDataToDashboard?.total_bolsa_familia ?? 0 },
    { bg: 'blue', icon: IoWomanSharp, name: 'Femininos', value: allDataToDashboard?.total_feminino ?? 0 },
    { bg: 'white', icon: TbMoodBoy, name: 'Masculinos', value: allDataToDashboard?.total_masculino ?? 0 },
    { bg: 'blue', icon: WiSunrise, name: 'Alunos matutinos', value: '55' },
    { bg: 'blue', icon: BsFillSunFill, name: 'Alunos verspertino', value: allStudents?.length ?? 0 },
    { bg: 'blue', icon: FaExchangeAlt, name: 'Alunos transferidos', value: '10' },
    { bg: 'blue', icon: FaChildReaching, name: 'Matriculados semana', value: '20'},
    { bg: 'blue', icon: FaUserGroup, name: 'Matriculados no mes', value: '18' },
  ];

  // 1 - Fetch Data

  // const fetchAllStudents = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await api.get('/alunos');
  //     const allStudents = Array.isArray(response.data.alunos) ? response.data.alunos : [];
  //     setAllStudents(allStudents);
  //     setLoading(false);

  //   } catch (error) {
  //     setLoading(false);
  //     console.error('Error:', error);
  //     setAllStudents([]);
  //     toastApiResponse(error, 'Não foi possível listar os alunos! Por favor, tente novamente!');
  //   }
  // };

  // 1 - Fetch Data com Paginação
  const fetchAllStudents = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/alunos?page=${page}`); // Inclui paginação
      const alunosData = response.data.alunos.data; // Dados da página atual
      setAllStudents(alunosData);
      setCurrentPage(response.data.alunos.current_page); // Página atual
      setTotalPages(response.data.alunos.last_page); // Total de páginas

    } catch (error) {
      console.error("Error:", error);
      setAllStudents([]);
      toastApiResponse(
        error,
        "Não foi possível listar os alunos! Por favor, tente novamente!"
      );
    } finally {
      setLoading(false);
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

  const handleViewChange = (value: string) => {
    setSelectedView(value);
  };

  const handleSearchStudent = async () => {
    setLoading(true);
    setIsSearching(true);

    try {
      const response = await api.post('/alunos/buscar', {
        query: inputValue
      });

      const allResults = Array.isArray(response.data.data) ? response.data.data : [];
      setSearchResults(allResults);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setSearchResults([]);
      toastApiResponse(error, 'Não foi possível buscar os alunos! Por favor, tente novamente!');
    }
  };

  const handlePDFGenerate = async () => {
    setLoading(true); // Inicia o estado de carregamento
  
    try {
      // Faz a requisição para gerar o PDF
      const response = await api.post('/alunos/gerar-pdf', {
        nome_aluno: 'si',
      }, { responseType: 'blob' });
  
      // Cria o blob do PDF retornado pela API
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Cria uma URL temporária para o PDF
      const pdfUrl = window.URL.createObjectURL(blob);
  
      // Cria um link para download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'alunos_filtrados.pdf');
      document.body.appendChild(link);
      link.click();
  
      // Remove o link temporário
      document.body.removeChild(link);
      window.URL.revokeObjectURL(pdfUrl);
  
      // Exibe mensagem de sucesso
      toastApiResponse(null, 'PDF gerado com sucesso!');
    } catch (error) {
      // Exibe mensagem de erro
      console.error('Erro ao gerar PDF:', error);
      toastApiResponse(error, 'Não foi possível gerar o PDF! Por favor, tente novamente.');
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };  

  // const handleMultiSelectChange = (newOptions: StudentOption[]) => {
  //   setCombinedOptions(newOptions);
  //   // setSexo(newOptions.find(option => option.label.startsWith('Sexo:'))?.label || '');
  //   setSexo(newOptions.find(option => option.label === sexo)?.label || '');
  //   setEtnia(newOptions.find(option => option.label === etnia)?.label || '');
  //   setPackageFamily(newOptions.find(option => option.label === packageFamily)?.label || '');
  //   setSchoolBus(newOptions.find(option => option.label === schoolBus)?.label || '');
  //   setDeficiency(newOptions.find(option => option.label === deficiency)?.label || '');
  //   setClassStudent(newOptions.find(option => option.label === classStudent)?.label || '');
  //   setPeriod(newOptions.find(option => option.label === period)?.label || '');
  //   setRoute(newOptions.find(option => option.label === route)?.label || '');
  // };

  const handleAdvancedSearch = async () => {
    setLoading(true);
    setIsSearching(true);
  
    try {
      const dataToSendRaw = {
        sexo: sexo,
        etnia: etnia,
        turno: period,
        turma: classStudent,
        bolsa_familia: packageFamily,
        status: status,
        deficiencia: deficiency,
        rota: route,
      };

      const dataToSend: Record<string, string | number | null | undefined> = {};

      for (const [key, value] of Object.entries(dataToSendRaw)) {
        if (value && value !== '') {
          if (key === 'bolsa_familia') {
            dataToSend[key] = parseInt(value, 10);
          } else {
            dataToSend[key] = value;
          }
        }
      }
  
      const response = await api.post('/alunos/search', dataToSend);
      const allResults = response.data;
  
      if (allResults.status && Array.isArray(allResults.alunos)) {
        setSearchResults(allResults.alunos);
      } else {
        setSearchResults([]);
        console.error('Formato de resposta inesperado:', allResults);
      }
  
      setLoading(false);
      resetFields();
  
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setSearchResults([]);
      toastApiResponse(error, 'Não foi possível listar os alunos desta turma! Por favor, tente novamente!');
    }
  };

  const resetFields = () => {
    setSexo('');
    setEtnia('');
    setPeriod('');
    setClassStudent('');
    setPackageFamily('');
    setStatus('');
    setDeficiency('');
    setRoute('');
    onClose();
  };

  const resetSearch = () => {
    onClose();
    setIsSearching(false);
    setInputValue("");
    setSearchResults([]);
    // setCombinedOptions([]);
  };

  const openProfile = () => {
    onOpen();
  };

  // 3 - Navigate to pages

  const handleStudentDetails = (student_ID: number) => {
    navigate(`/student_details/${student_ID}`);
  };

  // 4 - Use effects and callbacks

  // useEffect(() => {
  //   const newOptions: StudentOption[] = [];
  //   if (sexo) newOptions.push({ value: sexo, label: sexo });
  //   if (etnia) newOptions.push({ value: etnia, label: etnia });
  //   if (packageFamily) newOptions.push({ value: packageFamily, label: packageFamily });
  //   if (schoolBus) newOptions.push({ value: schoolBus, label: schoolBus });
  //   if (deficiency) newOptions.push({ value: deficiency, label: deficiency });
  //   if (classStudent) newOptions.push({ value: classStudent, label: classStudent });
  //   if (period) newOptions.push({ value: period, label: period });
  //   if (route) newOptions.push({ value: route, label: route });
  //   setCombinedOptions(newOptions);
  // }, [sexo, etnia, packageFamily, schoolBus, deficiency, classStudent, period, route]);

  // useEffect(() => {
  //   fetchAllStudents();
  //   fetchDataToDashboard();
  // }, []);

  // 2 - UseEffect para carregar os dados iniciais
  useEffect(() => {
    fetchDataToDashboard();
    fetchAllStudents(currentPage);
    scrollToTheTop(); // Rola para o topo sempre que a página mudar
  }, [currentPage]);

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
            Encontre o aluno que voce deseja e selecione o modo de visualização
          </Text>

          <RadioGroup onChange={handleViewChange} value={selectedView} color={'gray.500'}>
            <Stack direction="row" spacing={4} mt={3}>
              <Radio value="1">Cartão</Radio>
              <Radio value="0">Tabela</Radio>
            </Stack>
          </RadioGroup>

          <VStack my={5} gap={2} width={'100%'} px={3}>
            <InputGroup size="md" width={'50%'}>
              <Input
                type="text"
                placeholder="Digite o nome do aluno, CPF, rota..."
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
                  <Text my={5}>Desculpe, mas nenhum aluno foi encontrado! Tente outra vez...</Text>
                  <Button mb={2} colorScheme="blue" onClick={resetSearch}>
                    Mostrar todos os alunos
                  </Button>
                </Flex>
              ) : (
                <>
                  {isSearching && (
                    <HStack alignItems={'center'} justifyContent={'space-between'} px={2}>
                      <Text fontWeight="semibold" fontSize={'lg'} my={5} color={'blue.300'}>
                        Alunos encontrados: {studentsToDisplay.length}
                      </Text>

                      <Button
                        h="2rem"
                        size="md"
                        bg="blue.300"
                        _hover={{ bg: "cyan.500" }}
                        borderRadius={5}
                        leftIcon={<FaFilePdf />}
                        onClick={handlePDFGenerate}
                        color={'white'}
                        fontSize={'sm'}
                      >
                        PDF
                      </Button>
                    </HStack>                    
                  )}

                  {selectedView === '1' ?                   
                    <>
                      <SimpleGrid
                        columns={{ base: 1, sm: 1, md: 3, lg: 4, xl: 5 }}
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
                            etnia={student.etnia}
                            cpfAluno={student.cpf_aluno}
                            telefoneResponsavel={student.telefone_responsavel}
                            dataNascimento={student.data_nascimento}
                            professora='Nascimento'
                            onClick={() => handleStudentDetails(student.id)}
                          />
                        ))}
                      </SimpleGrid>
                    </> 
                    : 
                    <>
                      <TableStudents 
                        students={studentsToDisplay} 
                        onStudentClick={handleStudentDetails} 
                      />
                    </>
                  }

                  {/* Paginação */}
                  <Flex justify="center" my={5} align="center" wrap="wrap">
                    <Button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      isDisabled={currentPage === 1}
                      mx={1}
                      leftIcon={<TbSquareArrowLeft/>}
                    >
                      Anterior
                    </Button>

                    {renderPageNumbers()}

                    <Button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      isDisabled={currentPage === totalPages}
                      mx={1}
                      rightIcon={<TbSquareArrowRight/>}
                    >
                      Próxima
                    </Button>
                  </Flex>
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
              <VStack width={'100%'} alignItems={'flex-start'} mb={4}>

                {/* <Box width={'100%'} my={3}>
                  <Text mb={2} fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Suas opções selecionadas são:
                  </Text>

                  <MultiSelectComponent 
                    selectedOptions={combinedOptions} 
                    onChange={handleMultiSelectChange}
                  />
                </Box> */}
              </VStack>

              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="100%">

                <VStack width={'100%'} alignItems={'flex-start'}>
                  <Text fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Sexo:
                  </Text>
                  <ChakraSelect onChange={(e) => setSexo(e.target.value)} value={sexo}>
                    <option value=""></option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                  </ChakraSelect>
                </VStack>

                <VStack width={'100%'} alignItems={'flex-start'}>
                  <Text fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Etnia:
                  </Text>
                  <ChakraSelect onChange={(e) => setEtnia(e.target.value)} value={etnia}>
                    <option value=""></option>
                    <option value="Branco">Branco</option>
                    <option value="Pardo">Pardo</option>
                    <option value="Preto">Preto</option>
                    <option value="Amarelo">Amarelo</option>
                    <option value="Indígena">Indígena</option>
                  </ChakraSelect>
                </VStack>

                <VStack width={'100%'} alignItems={'flex-start'}>
                  <Text fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Bolsa família:
                  </Text>
                  <ChakraSelect onChange={(e) => setPackageFamily(e.target.value)} value={packageFamily}>
                    <option value=""></option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </ChakraSelect>
                </VStack>

                <VStack width={'100%'} alignItems={'flex-start'}>
                  <Text fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Status do aluno:
                  </Text>
                  <ChakraSelect onChange={(e) => setStatus(e.target.value)} value={status}>
                    <option value=""></option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </ChakraSelect>
                </VStack>

                <VStack width={'100%'} alignItems={'flex-start'}>
                  <Text fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Deficiencia:
                  </Text>
                  <ChakraSelect onChange={(e) => setDeficiency(e.target.value)} value={deficiency}>
                    <option value=""></option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                  </ChakraSelect>
                </VStack>

                <VStack width={'100%'} alignItems={'flex-start'}>
                  <Text fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Turma:
                  </Text>
                  <ChakraSelect onChange={(e) => setClassStudent(e.target.value)} value={classStudent}>
                    <option value=""></option>
                    <option value="1A">1A</option>
                    <option value="1B">1B</option>
                    <option value="1C">1C</option>
                    <option value="1D">1D</option>
                  </ChakraSelect>
                </VStack>

                <VStack width={'100%'} alignItems={'flex-start'}>
                  <Text fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Turno:
                  </Text>
                  <ChakraSelect onChange={(e) => setPeriod(e.target.value)} value={period}>
                    <option value=""></option>
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                  </ChakraSelect>
                </VStack>

                <VStack width={'100%'} alignItems={'flex-start'}>
                  <Text fontWeight="semibold" fontSize={'sm'} textAlign={'left'} color={'gray.400'}>
                    Rota:
                  </Text>
                  <ChakraSelect onChange={(e) => setRoute(e.target.value)} value={route}>
                    <option value=""></option>
                    <option value="1">Rota 01</option>
                    <option value="2">Rota 02</option>
                    <option value="3">Rota 03</option>
                    <option value="4">Rota 04</option>
                    <option value="10">Rota 10</option>
                  </ChakraSelect>
                </VStack>

              </SimpleGrid>
            </ModalBody>

            <Box width={'100%'} px={7} mt={5}>
              <Divider />
            </Box>

            <ModalFooter width={'100%'} justifyContent={'center'} alignItems={'center'} gap={5} mt={2}>
              <Button variant="outline" onClick={resetFields} fontSize={'sm'} leftIcon={<FaArrowRotateLeft />}>
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