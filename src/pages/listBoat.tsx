// import { Flex, SimpleGrid } from '@chakra-ui/react'
// import AllBoats from '../components/AllBoats'
// import Footer from '../components/Footer'
// import Header from '../components/Header'

// export default function ListBoat() {
//   return (
//     <Flex direction="column" height="100%" bg="white">
//       <Header />

//       <SimpleGrid 
//         columns={{ base: 1, md: 1, lg: 1 }} 
//         spacing={3}
//         w="100%"
//         maxWidth={1480}
//         mx='auto'
//         mt={5}
//       >
//         <AllBoats />
//       </SimpleGrid>

//       <Footer />
//     </Flex>
//   )
// }


import { Flex, SimpleGrid, useColorModeValue, Text, Box, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuMiniStatistics from '../components/MenuMiniStatistics';

import { MdDirectionsBoatFilled } from "react-icons/md";
import { HiLockOpen } from "react-icons/hi2";
import { HiLockClosed } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import CardClass from '../components/card-class';

export default function ListBoat() {

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  // const navigate = useNavigate();
  // const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  const statisticsData = [
    { bg: 'blue', icon: MdDirectionsBoatFilled, name: 'Total de alunos', value: '10' },
    { bg: '', icon: AiFillLike, name: 'Alunos ativos', value: '10' },
    { bg: '', icon: AiFillDislike, name: 'Bolsa familia', value: '10' },
    { bg: 'blue', icon: HiLockOpen, name: 'Alunos', value: '10' },
    { bg: 'blue', icon: HiLockOpen, name: 'Deficientes', value: '10' },
    { bg: 'blue', icon: HiLockClosed, name: 'Femininos', value: '10' },
  ];

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
              {/* {allStudents?.map((student, index) => (
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
              ))}             */}

              <CardClass/>
              <CardClass/>
              <CardClass/>
              <CardClass/>
              <CardClass/>
            </SimpleGrid>
          </Card>

          <ToastContainer />
          <Footer />
        </Header>
      </Flex>
  )
}

