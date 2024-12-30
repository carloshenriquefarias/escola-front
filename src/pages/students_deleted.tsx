import { Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, Box, HStack,
  Stack, Avatar, Spinner, Input, InputGroup, useToast,
} from '@chakra-ui/react';

import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuMiniStatistics from '../components/MenuMiniStatistics';
import ModalDelete from '../components/ModalDelete';

import { ImUserTie } from "react-icons/im";
import { MdCalendarMonth } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { FaRegFaceSadCry } from "react-icons/fa6";
import { LuDatabaseBackup } from "react-icons/lu";
import { FaSearch } from 'react-icons/fa';
import { FaRegTrashCan } from "react-icons/fa6";

import { ToastContainer } from "react-toastify";
import { toastApiResponse } from '../components/Toast';
import "react-toastify/ReactToastify.min.css";
  
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
  
  export default function StudentsDeleted() {
  
    // const { user } = useAuth();
  
    const bg = useColorModeValue("white", "navy.700");
    const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
    const textColorSecondary = "gray.400";
    const navigate = useNavigate();
    const toast = useToast();
  
    const [loading, setLoading] = useState(false);
    const [allDeletedStudents, setAllDeletedStudents] = useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
  
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState<Student[]>([]);
    const [isSearching, setIsSearching] = useState(false);
  
    const statisticsData = [
      { bg: 'blue', icon: ImUserTie, name: 'Total', value: allDeletedStudents.length },
      { bg: 'blue', icon: IoMdSunny, name: 'Today', value: '5' },
      { bg: '', icon: MdCalendarMonth, name: 'This week', value: '7' },
      { bg: '', icon: MdCalendarMonth, name: 'This month', value: '8' },  
      { bg: '', icon: MdCalendarMonth, name: 'This year', value: '11' },   
      { bg: '', icon: MdCalendarMonth, name: 'This year', value: '10' },  
    ];
  
    const openModal = (userId: any) => {
      setUserIdToDelete(userId);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setUserIdToDelete(null);
    };

    const fetchAllStudents = async () => {
      try {
        const response = await api.get('/alunos/excluidos');
        const allStudents = response.data.alunos;
        setAllDeletedStudents(allStudents);
  
      } catch (error) {
        console.error('Error:', error);
        toastApiResponse(error, 'It is not possible to list this user! Please try again!');
      }
    };

    const handleRestoreStudent = async (id: any) => {
      setLoading(true);

      try {
        const response = await api.post('/alunos/restore', {
          id: id
        });

        if (response.data?.status) {
          toast({
            title: "Sucesso!",
            description: "O aluno foi recuperado com sucesso!",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
  
          setTimeout(() => {
            setLoading(false);
          }, 2000);
  
          setLoading(false);
          closeModal();
          navigate('/all_students');
        }
  
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        toastApiResponse(error, 'Não foi possível buscar os alunos! Por favor, tente novamente!');
      }
    };
  
    const handleDeleteStudentForever = async (id: any) => {
      setLoading(true);

      try {
        const response = await api.post('/alunos/force-delete', {
          id: id
        });

        if (response.data?.status) {
          toast({
            title: "Sucesso!",
            description: "Este aluno foi deletado permanente!",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
  
          setTimeout(() => {
            setLoading(false);
          }, 2000);
  
          setLoading(false);
          closeModal();
          navigate('/all_students');
        }
  
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        toastApiResponse(error, 'Não foi possível buscar os alunos! Por favor, tente novamente!');
      }
    };
  
    const handleSearch = () => {  
      setLoading(true);
      setTimeout(() => {
        const results = allDeletedStudents.filter(
          (student) =>
            student.nome_aluno.toLowerCase().includes(inputValue.toLowerCase()) ||
            student.turma.toLowerCase().includes(inputValue.toLowerCase()) ||
            student.rota.includes(inputValue)
        );
        setSearchResults(results);
        setLoading(false);
        setIsSearching(true);
      }, 1000);
    }; 
  
    const resetSearch = () => {
      setIsSearching(false);
      setInputValue("");
      setSearchResults([]);
    };
  
    const studentsToDisplay = isSearching && searchResults.length > 0 ? searchResults : allDeletedStudents;
    console.log(studentsToDisplay, "usersToDisplay");
  
    useEffect(() => {
      fetchAllStudents();
    }, []);
  
    return (
      <>
        {/* {user?.is_admin == '1' ? ( */}
          <Flex direction="column" height="100%" bg="white">
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
                      Alunos deletados ou transferidos
                    </Text>
  
                    <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                      Aqui estão todos os alunos que já foram excluidos do Contrans
                    </Text>
                  </Box>
                </HStack>
              </SimpleGrid>
            </motion.div>
  
            <Card boxShadow={cardShadow} my='10px' p={5} w="100%" borderRadius={10} bg={bg}>
              <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
                Estatisticas e dados sobre os usuarios excluidos
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
  
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 150 }}
              transition={{ duration: 0.8 }}
              style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} w="100%" mx='auto' borderRadius={10}>
                <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
                  Lista de todos os alunos deletados
                </Text>
  
                <Flex my={5} mx={10} gap={5}>
                  <InputGroup size="lg">
                    <Input
                      // pr="4.5rem"
                      type="text"
                      placeholder="Search..."
                      borderRadius="full"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </InputGroup>
  
                  <Button
                    h="3rem"
                    size="lg"
                    bg="blue.500"
                    _hover={{ bg: "blue.200" }}
                    borderRadius="full"
                    leftIcon={<FaSearch />}
                    onClick={handleSearch}
                    color={'white'}
                    fontSize={'md'}
                  >
                    Pesquisar
                  </Button>

                  <Button
                    h="3rem"
                    size="lg"
                    bg="red.700"
                    _hover={{ bg: "red.300" }}
                    borderRadius="full"
                    onClick={resetSearch}
                    color={'white'}
                    fontSize={'md'}
                  >
                    Resetar
                  </Button>
                </Flex>
  
                {loading ?
                  <Stack spacing={2} my={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='blue.500'
                      size='xl'
                    />
                  </Stack>
                  :
                  <Flex direction="column" mt={4}>
                    {isSearching && searchResults.length === 0 ? (
                      <Flex direction="column" align="center">
                        <Box fontSize="48px" color="gray.500">
                          <FaRegFaceSadCry />
                        </Box>
  
                        <Text my={5}>Sorry! This user can not be found! Try again...</Text>
  
                        <Button mb={2} colorScheme="blue" onClick={resetSearch}>
                          Display All Users
                        </Button>
                      </Flex>
                    ) : (
                      studentsToDisplay.map((student, index) => (
                        <React.Fragment key={index}>
                          <Flex
                            w="100%"
                            justifyContent="space-between"
                            alignItems="center"
                            _hover={{ bg: useColorModeValue("white", "white") }}
                          >
                            <Flex
                              align="center"
                              justify="space-between"
                              direction={{ base: "column", md: "row" }}
                              width="100%"
                              p={4}
                            >
                              {/* Informações do Usuário */}
                              <Flex align="center">
                                <Avatar size="md" name={student.nome_aluno} src={'student.photo_filename'} />
                                <Flex direction="column" ml={4}>
                                  <Text
                                    color={useColorModeValue("blue.300", "white")}
                                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                                    fontWeight={"semibold"}
                                    dangerouslySetInnerHTML={{ __html: student.nome_aluno }}
                                  />

                                  <Text color={useColorModeValue("gray.400", "gray.200")} fontSize={{ base: "sm", sm: "md" }}>                                 
                                    Rota: {student.rota}
                                  </Text>

                                  <Text color={useColorModeValue("gray.400", "gray.200")} fontSize={{ base: "sm", sm: "md" }}>
                                    Turno: {student.turno}
                                  </Text>
                                  
                                  <Text color={useColorModeValue("gray.400", "gray.200")} fontSize={{ base: "sm", sm: "md" }}>
                                    Turma: {student.turma} | Turno: {student.turno}
                                  </Text>
                                </Flex>
                              </Flex>
  
                              <SimpleGrid
                                columns={{ base: 1, md: 1 }}
                                spacing={4} 
                                mt={{ base: 4, md: 0 }}
                              >
                                <Button 
                                  bg={"blue.300"} 
                                  color={"white"} 
                                  gap={2} 
                                  onClick={() => handleRestoreStudent(student.id)}
                                  fontSize={'sm'}
                                >                              
                                  <Icon as={LuDatabaseBackup} color={"white"} h="1rem" w="1rem" />
                                  Recuperar aluno
                                </Button>
  
                                <Button bg={"red.700"} color={"white"} gap={2} onClick={() => openModal(student.id)} fontSize={'sm'}>
                                  <Icon as={FaRegTrashCan} color={"white"} h="1rem" w="1rem" />
                                  Deletar permanente
                                </Button>
                              </SimpleGrid>
                            </Flex>
                          </Flex>
                          <Divider m={0} />
                        </React.Fragment>
                      ))
                    )}
                  </Flex>
                }
  
                {isModalOpen && (
                  <ModalDelete
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onClick={() => handleDeleteStudentForever(userIdToDelete)}
                    title={'Uma vez que você deletar este aluno, não poderá mais recuperá-lo!'}
                  />
                )}
              </Card>
            </motion.div>
  
            <ToastContainer />
            <Footer />
  
            </Header>
          </Flex>
        {/* ) : (
          navigate('/')
        )} */}
      </>
    )
  }