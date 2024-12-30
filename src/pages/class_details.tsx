import { Flex, SimpleGrid, useColorModeValue, Text, Image, Heading, Center, VStack, Avatar, Box, useToast } from '@chakra-ui/react';
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
import { api } from '../services/api';
import { useEffect, useState } from 'react';
// import { toastApiResponse } from '../components/Toast';
import CardStudents from '../components/card-students';
import { useParams } from 'react-router-dom';

interface Aluno {
  id: number; // Identificação única do aluno
  nome_aluno: string; // Nome do aluno
  data_nascimento: string; // Data de nascimento no formato YYYY-MM-DD
  cpf_aluno: string; // CPF do aluno no formato 000.000.000-00
  sexo: 'M' | 'F';
  nomePai: string; // Nome do pai do aluno
  nomeMae: string; // Nome da mãe do aluno
  telefone_responsavel: string; // Telefone de contato do responsável
  etnia: string; // Etnia do aluno (Branco, Pardo, Negro, etc.)
  status: 'Ativo' | 'Inativo'; // Status do aluno (Ativo ou Inativo)
  bolsaFamilia: 0 | 1; // Indica se o aluno recebe Bolsa Família (0 = Não, 1 = Sim)
  statusTransporte: '0' | '1'; // Indica se o aluno utiliza transporte (0 = Não, 1 = Sim)
  numeroMatriculaRede: string; // Número de matrícula na rede de ensino
  numeroInep: string; // Número de identificação no INEP
  deficiencia: '0' | '1'; // Indica se o aluno possui deficiência (0 = Não, 1 = Sim)
  etapaEnsino: string; // Etapa de ensino do aluno (Ex: Pré-Escola, Ensino Fundamental, etc.)
  turma: string; // Turma à qual o aluno está vinculado (Ex: 1A, 1B, etc.)
  endereco: string; // Endereço completo do aluno
  tipoVinculo: string; // Tipo de vínculo do aluno (Ex: Estadual, Municipal, etc.)
  siglaConcessionariaEnergia: string; // Sigla da concessionária de energia (Ex: Energisa)
  unidadeConsumidora: string; // Código da unidade consumidora da energia elétrica
  turno: 'Matutino' | 'Vespertino' | 'Noturno'; // Turno de estudo (Ex: Matutino, Vespertino, Noturno)
  rota: string; // Número ou código da rota de transporte escolar
  createdAt: string; // Data e hora de criação do registro no formato ISO (YYYY-MM-DDTHH:MM:SSZ)
  updatedAt: string; // Data e hora da última atualização do registro no formato ISO (YYYY-MM-DDTHH:MM:SSZ)
}

export default function ClassDetails() {

  // const { user } = useAuth();
  const { id: classID } = useParams<{ id: string }>();
  const toast = useToast();

  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const textColorSecondary = "gray.400";

  const [allStudents, setAllStudents] = useState<Aluno[]>([]);

  // const fetchAllStudentsByClass = async () => {
  //   try {
  //     const response = await api.post('/alunos/students-by-class', {
  //       turma: classID
  //     });
  //     const allStudentsByClass = response.data.alunos;
  //     setAllStudents(allStudentsByClass);
  //     console.log('Dados dos alunos:', allStudentsByClass);

  //   } catch (error) {
  //     console.error('Error:', error);
  //     toastApiResponse(error, 'Não foi possível listar os alunos desta turma! Por favor, tente novamente!');
  //   }
  // };

  async function fetchStudentDetails() {
    try {
      const response = await api.get(`/turmas/${classID}/alunos`);    
      setAllStudents(response.data.student);
      console.log('Dados dos alunos:', response.data.student);
      return

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro de Login",
        description: "Não foi possivel carregar os dados do aluno.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      throw error;

    }
  }

  const statisticsData = [
    { bg: 'blue', icon: MdDirectionsBoatFilled, name: 'Alunos na turma', value: allStudents.length },
    { bg: '', icon: AiFillLike, name: 'Meninos', value: '1'  },
    { bg: '', icon: AiFillDislike, name: 'Meninas', value: '2'  },
    { bg: 'blue', icon: HiLockOpen, name: 'Bolsa familia', value: '5'  },
    { bg: 'blue', icon: HiLockOpen, name: 'Deficientes', value: '1'  },
    { bg: 'blue', icon: HiLockClosed, name: 'Alunos do transporte', value: '10'  },
  ];

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  return (
    <>
      {/* {user?.is_admin == '1' ? ( */}
      <Flex direction="column" height="100%" bg="red">
        <Header>

          <motion.div
            initial={{ opacity: 0, x: -150 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 0.7 }}
          >
            <Box
              w="100%"
              mt={0}
              bg={'blue.500'}
              height={'25rem'}
              borderRadius={10}
            >
              <Image
                src="https://fernandogiannini.com.br/wp-content/uploads/2024/04/DALL%C2%B7E-2024-04-26-08.39.53-An-educational-themed-banner-for-a-blog-post-titled-10-Practices-for-Using-AI-in-the-Classroom.-The-image-features-a-modern-classroom-setting-with-d-2.jpeg"
                alt="Placeholder"
                width="100%"
                height="100%"
                objectFit="fill"
                rounded={10}
              />
            </Box>
          </motion.div>

          <Center >
            <Avatar
              size={'2xl'}
              mb={5}
              mt={-14}
              src={
                'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
            />
          </Center>

          <VStack>
            <Heading fontSize={'2xl'} fontWeight={'semibold'} fontFamily={'body'} color={'blue.300'}>
              Professora Anne Sofia
            </Heading>

            <Text fontSize={'lg'} color={'gray.500'} mb={4} mt={0}>
              1A | Vespertino
            </Text>
          </VStack>

          <Card boxShadow={cardShadow} mb='10px' p={5} w="100%" borderRadius={10} bg={bg}>
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

          <Card boxShadow={cardShadow} mb='10px' p={5} w="100%" borderRadius={10} bg={bg}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Alunos desta turma
            </Text>

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
      {/* ) : (
        navigate('/')
      )} */}
    </>
  )
}
