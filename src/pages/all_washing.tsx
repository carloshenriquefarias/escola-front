
'use client'

import {
  Box, VStack, Text, Divider, Flex, SimpleGrid, HStack, Button, Icon, useColorModeValue, 
  Input, Select, Stack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader, ModalOverlay
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NewTable from "../components/Table";
// import PaginationContainer from "../components/Pagination";
import MenuMiniStatistics from "../components/MenuMiniStatistics";
import React, { useEffect } from "react";

import { BiSearchAlt2 } from "react-icons/bi";
import { FaCity, FaPlus } from "react-icons/fa";
import { IoConstruct } from "react-icons/io5";
import { MdAttachMoney, MdBarChart } from "react-icons/md";
import { MdCleaningServices } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useAuth } from "../hooks/useAuth";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { api } from "../services/api";
import { toastApiResponse } from "../components/Toast";
import { FaFilePdf } from "react-icons/fa6";

interface Lavagem {
  id: number;
  data_envio_solicitacao: string;
  placa_onibus: string;
  nome_motorista: string;
  rota: string;
  km_rota: number;
  data_lavagem_programada: string;
  data_lavagem_realizada: string | null;
  hora_lavagem: string;
  servicos_realizados: string;
  valor_servico: string;
  status_lavagem: number;
  data_prevista_proxima_lavagem: string;
}

export default function AllWashing() {

  // const { user } = useAuth();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorSecondary = "gray.400";
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // const recordsPerPage = 10;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [searchInitiated, setSearchInitiated] = useState(false);
  // const [isSearchEmpty, setIsSearchEmpty] = useState(false);  
  const [allWashing, setAllWashing] = useState<Lavagem[]>([]);

  const [filters, setFilters] = useState({
    user: '',
    plan: '',
    price: '',
    createdAt: '',
    month: '',
    year: '',
    status: '',
    methodPayment: ''
  });

  const statisticsData = [
    { bg: 'blue', icon: MdBarChart, name: 'Total lavagens', value: '10' },
    { bg: '', icon: FaCity, name: 'Pendentes', value: '12' },
    { bg: '', icon: MdBarChart, name: 'Finalizadas', value: '7' },
    { bg: 'blue', icon: IoConstruct, name: 'Canceled', value: '4' },
    { bg: 'blue', icon: MdBarChart, name: 'Returned', value: '10' },
    { bg: 'white', icon: MdAttachMoney, name: 'Total global', value: '8.450,00' },
  ];

  // const boxData = [
  //   { color: 'lightblue', height: '300px', borderRadius: 10 },
  //   { color: 'lightgreen', height: '300px', borderRadius: 10 },
  // ];

  const fetchAllWashing = async () => {
    try {
      const response = await api.get('/lavagens');
      const allWashingRegistered = Array.isArray(response.data.data) ? response.data.data : [];
      setAllWashing(allWashingRegistered);

    } catch (error) {
      console.error('Error:', error);
      setAllWashing([]);
      toastApiResponse(error, 'Não foi possível listar as turmas! Por favor, tente novamente!');
    }
  };

  const handleGoToAdmin = () => {
    setIsLoading(true);
    navigate('/admin');
    setIsLoading(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchAllWashing();
  }, []);

  return (
    <>
      {/* {user?.is_admin == '1' ? ( */}
      <Header>
        <Flex direction="column" height="100%" bg="white">
          {/* <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 1 }}
          >
            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 1 }}
              spacing={3}
              w="100%"
              maxWidth={1480}
              mx='auto'
              mt={5}
              px={3}
            >
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Box justifyContent={'flex-start'} alignItems={'center'}>
                  <Text
                    color={textColorPrimary}
                    fontWeight="bold"
                    fontSize="2xl"
                    mt="5px"
                    textAlign="left"
                  >
                    Payments report
                  </Text>

                  <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                    Find all types of payments available by the sistem boats on the market
                  </Text>
                </Box>

                <Button bg='gray.50' w='auto' h={'80px'} onClick={handleGoToAdmin}>
                  <VStack pt={0}>
                    <Icon as={ImUserTie} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Admin portal</Text>
                  </VStack>
                </Button>
              </HStack>

              <Divider />
            </SimpleGrid>
          </motion.div> */}

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
                    Lavagens e lubrificações
                  </Text>

                  <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                    Todas as informações sobre as lavagens e lubrificações dos onibus da escola
                  </Text>
                </Box>

                <Button bg='gray.100' w='auto' h={'80px'} onClick={handleGoToAdmin}>
                  <VStack pt={0}>
                    <Icon as={FaPlus} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Nova lavagem</Text>
                  </VStack>
                </Button>
              </HStack>
            </SimpleGrid>
          </motion.div>

          <Card boxShadow={cardShadow} my='10px' p={5} w="100%" borderRadius={10} bg={bg}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Informações sobre as lavagens
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
            <Text color={textColorSecondary} fontSize='md' ml='6px' mb='5px'>
              Listagem de lavagens
            </Text>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 150 }}
              transition={{ duration: 0.8 }}
            >
              <Box mb={5}>
                <HStack justifyContent={'space-between'} alignItems={'center'} p={5} >
                  <Button bg='gray.100' onClick={openModal} leftIcon={<FaFilter/>} fontSize={'sm'} color={'blue.300'}>
                    Advanced search
                  </Button>
                  
                  <HStack justifyContent={'center'} alignItems={'center'}>
                    <Button bg='blue.200' onClick={openModal} leftIcon={<FaFilePdf />} fontSize={'sm'} color={'white'}>
                      PDF
                    </Button>
                    <Button bg='blue.200' onClick={openModal} leftIcon={<RiFileExcel2Fill />} fontSize={'sm'} color={'white'}>
                      Excel
                    </Button>
                  </HStack>
                </HStack>

                <NewTable washing={allWashing} bgColor="lightblue" />

                {/* {isSearchEmpty && (
                          <Box textAlign="center" my={5}>
                            <Text fontSize="lg" fontWeight="bold">
                              No one result was found for this search!
                            </Text>
                          </Box>
                        )} */}

                {/* {searchInitiated &&
                          <Button
                            colorScheme='gray'
                            color={'blue.500'}
                            ml={5}
                            _hover={{ backgroundColor: "gray.200" }}
                            fontSize="sm"
                            justifyContent="center"
                            alignItems="center"
                            size={'sm'}
                            onClick={() => {
                              setFilteredPayments(allPayments);
                              setIsSearchEmpty(false);
                              setFilters({
                                user: '', plan: '', price: '', createdAt: '', month: '', year: '', status: '', methodPayment: ''
                              });
                            }}
                          >
                            <HStack>
                              <Icon as={MdCleaningServices} fontSize="md" />
                              <Text>Reset Filter</Text>
                            </HStack>
                          </Button>
                        } */}

                {/* <PaginationControls
                          currentPage={currentPage}
                          totalPages={totalPages}
                          setCurrentPage={setCurrentPage}
                          updateCurrentPayments={updateCurrentPayments}
                        /> */}
              </Box>
            </motion.div>
          </Card>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="gray.700">Perform your advanced search</ModalHeader>
              <HStack w="100%" mt={1} px={6}>
                <Text color="gray.300" fontSize={'sm'}>
                  The filter will reply to your request as soon as possible
                </Text>
              </HStack>

              <Box w="100%" mt={4} px={6}>
                <Divider borderColor="gray.400" borderWidth='0.5px'></Divider>
              </Box>
              <ModalCloseButton color="gray.700" />

              <ModalBody pb={6} mt={1}>
                <VStack bg='white'>
                  <Stack direction="column" spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Insert the customer name</Text>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={filters.user}
                      onChange={e => setFilters({ ...filters, user: e.target.value })}
                    />
                  </Stack>

                  <Stack direction="column" mt={1} spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Select month</Text>
                    <Select value={filters.month} onChange={e => setFilters({ ...filters, month: e.target.value })}>
                      <option value=""></option>
                      <option value="january">January</option>
                      <option value="february">February</option>
                      <option value="march">March</option>
                      <option value="april">April</option>
                      <option value="may">May</option>
                      <option value="june">June</option>
                      <option value="july">July</option>
                      <option value="august">August</option>
                      <option value="september">September</option>
                      <option value="october">October</option>
                      <option value="november">November</option>
                      <option value="december">December</option>
                    </Select>
                  </Stack>

                  <Stack direction="column" mt={1} spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Select plan</Text>
                    <Select value={filters.plan} onChange={e => setFilters({ ...filters, plan: e.target.value })}>
                      <option value=""></option>
                      <option value="free">Free</option>
                      <option value="freeLimitedOnly">Free limited only</option>
                      <option value="classic">Classic</option>
                      <option value="enhanced">Enhanced</option>
                      <option value="master">Master</option>
                    </Select>
                  </Stack>

                  <Stack direction="column" mt={1} spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Select the method payment</Text>
                    <Select value={filters.methodPayment} onChange={e => setFilters({ ...filters, methodPayment: e.target.value })}>
                      <option value=""></option>
                      <option value="debitCard">Debit card</option>
                      <option value="creditCard">Credit card</option>
                    </Select>
                  </Stack>

                  <Stack direction="column" mt={1} spacing={2} w={'full'}>
                    <Text fontWeight={'bold'}>Select status</Text>
                    <Select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                      <option value=""></option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </Stack>

                  <Stack direction="column" spacing={2} w={'full'} mt={1}>
                    <Text fontWeight={'bold'}>Insert the year</Text>
                    <Input
                      type="text"
                      placeholder="Year"
                      value={filters.year}
                      onChange={e => setFilters({ ...filters, year: e.target.value })}
                    />
                  </Stack>
                </VStack>
              </ModalBody>

              <ModalFooter gap={3}>
                <Button
                  colorScheme='gray'
                  color={'blue.500'}
                  _hover={{ backgroundColor: "gray.200" }}
                  fontSize="sm"
                  justifyContent="center"
                  alignItems="center"
                  size={'sm'}
                // onClick={() => {
                //   setFilteredPayments(allPayments); setFilters({
                //     user: '', plan: '', price: '', createdAt: '', month: '', year: '', status: '', methodPayment: ''
                //   });
                // }}
                >
                  <HStack>
                    <Icon as={MdCleaningServices} fontSize="md" />
                    <Text>Reset Filter</Text>
                  </HStack>
                </Button>

                <Button
                  isLoading={isLoading}
                  color={'gray.50'}
                  _hover={{ backgroundColor: "blue.200" }}
                  fontSize="sm"
                  justifyContent="center"
                  alignItems="center"
                  colorScheme='facebook'
                  size={'sm'}
                // onClick={handleSearch}
                >
                  <HStack>
                    <Icon as={BiSearchAlt2} fontSize="md" />
                    <Text>Search</Text>
                  </HStack>
                </Button>
              </ModalFooter>
            </ModalContent>
            <ToastContainer />
          </Modal>

          <Footer />
        </Flex>
      </Header>
      {/* ) : (
        navigate('/')
      )} */}
    </>
  );
}

