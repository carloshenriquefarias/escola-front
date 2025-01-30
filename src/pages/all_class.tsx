import { Flex, SimpleGrid, useColorModeValue, Text, Box, HStack, Button, VStack, Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuMiniStatistics from '../components/MenuMiniStatistics';
import CardClass from '../components/card-class';

import { HiLockOpen } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi";
import { WiSunrise } from "react-icons/wi";
import { BsFillSunFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import { toastApiResponse } from '../components/Toast';
import { FaPlus } from 'react-icons/fa';

// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
interface Turma {
  id: number;
  name_class: string;
  teacher: string;
  period: string;
  description: string;
}

export default function AllClass() {

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  const textColorSecondary = "gray.400";

  const [allClasses, setAllClasses] = useState<Turma[]>([]);

  const statisticsData = [
    { bg: 'blue', icon: GiTeacher, name: 'Total de trumas', value: '10' },
    { bg: '', icon: WiSunrise, name: 'Turmas da manhã', value: '10' },
    { bg: '', icon: BsFillSunFill, name: 'Turmas da tarde', value: '10' },
    { bg: 'blue', icon: HiLockOpen, name: 'Alunos', value: '10' },
    { bg: 'blue', icon: HiLockOpen, name: 'Deficientes', value: '10' },
    { bg: 'blue', icon: HiLockClosed, name: 'Femininos', value: '10' },
  ];

  const fetchAllClasses = async () => {
    try {
      const response = await api.get('/turmas');
      const allClassRegistered = Array.isArray(response.data.turmas) ? response.data.turmas : [];
      setAllClasses(allClassRegistered);

    } catch (error) {
      console.error('Error:', error);
      setAllClasses([]);
      toastApiResponse(error, 'Não foi possível listar as turmas! Por favor, tente novamente!');
    }
  };

  const handleClassDetails = (class_ID: number) => {
    navigate(`/class_details/${class_ID}`);
  };

  const handleNewClass = () => {
    navigate('/register_class');
  };

  useEffect(() => {
    fetchAllClasses();
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
                    Professores e turmas
                  </Text>

                  <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                    Todas as informações sobre as turmas da escola
                  </Text>
                </Box>

                <Button bg='gray.100' w='auto' h={'80px'} onClick={handleNewClass}>
                  <VStack pt={0}>
                    <Icon as={FaPlus} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>Nova turma</Text>
                  </VStack>
                </Button>
              </HStack>
            </SimpleGrid>
          </motion.div>

          <Card boxShadow={cardShadow} my='10px' p={5} w="100%" borderRadius={10} bg={bg}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Estatisticas e dados sobre as turmas
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
              Encontre a turma que voce deseja
            </Text>

            <SimpleGrid columns={{ base: 2, md: 3, lg: 3, xl: 5 }} spacing={4} px={2} w="100%">
              {allClasses?.map((classItem, index) => (
                <CardClass
                  key={index} // Chave única para cada item mapeado (melhor usar student.id se existir)
                  name_class={classItem.name_class}
                  teacher={classItem.teacher}
                  period={classItem.period}
                  onClick={() => handleClassDetails(classItem.id)}
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

