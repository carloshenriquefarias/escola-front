'use client'

import { Box, Button, FormControl, FormLabel, Input, VStack, Radio, RadioGroup, Select, 
  Text, Image, useToast, SimpleGrid, HStack, useColorModeValue, Center, Avatar,
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import Header from "../components/Header"
import Card from "../components/Card"

import { api } from "../services/api"
import { toastApiResponse } from "../components/Toast"
import { ToastContainer } from "react-toastify"

type FormData = {
  nome_aluno: string;
  data_nascimento: string;
  cpf_aluno: string;
  sexo: "M" | "F";
  nome_pai: string;
  nome_mae: string;
  telefone_responsavel: string;
  etnia: string;
  status: string;
  bolsa_familia: "0" | "1";
  status_transporte: "0" | "1";
  numero_matricula_rede: string;
  numero_inep: string;
  deficiencia: "0" | "1";
  etapa_ensino: string;
  turma: string;
  endereco: string;
  tipo_vinculo: string;
  sigla_concessionaria_energia: string;
  unidade_consumidora: string;
  turno: string;
  rota: string;
  foto?: FileList;
}

export default function StudentEdit() {
  
  const toast = useToast();
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const navigate = useNavigate();
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [currentStudentData, setCurrentStudentData] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { id } = useParams<{ id: string }>();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const fetchStudentData = async () => {
    if (!id) {
      toastApiResponse(new Error('Student ID is missing'), 'Unable to fetch student data');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post('/alunos/edit', { id: id });
      setCurrentStudentData(response.data.aluno);
      reset(response.data.aluno);

    } catch (error) {
      console.error('Error fetching student data:', error);
      toastApiResponse(error, 'Unable to fetch student data. Please try again!');
      setCurrentStudentData(null);
      
    } finally {
      setIsLoading(false);
    }
  };

  async function onSubmit(data: FormData) {
    try {
      const response = await api.post('/alunos/update', data);
      console.log('API Response:', response.data);

      toast({
        title: "Formulário enviado",
        description: "Os dados do aluno foram atualizados com sucesso.",
        status: "success",
        position: "top",
        duration: 5000,
        isClosable: true,
      });

      navigate('/all_students');
      fetchStudentData();

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o aluno. Por favor, tente novamente.",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    fetchStudentData();
  }, [id, reset]);

  if (isLoading) {
    return <Center>Loading...</Center>;
  }

  return (
    <Header>
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
              Edição dos dados do aluno
            </Text>

            <Text color={'gray.500'} fontSize="md" me="6px" mb="5px" mt={2}>
              Atualize as informações sobre o estudante Carlos Henrique
            </Text>
          </Box>
        </HStack>
      </SimpleGrid>

      <Box as="form" onSubmit={handleSubmit(onSubmit)} maxWidth="1000px" margin="auto" mt={5} justifyContent={'flex-start'} my={10}>
        <VStack spacing={0} align="stretch">
          <VStack>
            <Avatar
              size={'xl'}
              src={
                'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              mb={2}
            />

            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="xl"
              textAlign="center"
            >
              {currentStudentData?.nome_aluno}
            </Text>

            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="xl"
              textAlign="center"
            >
              {currentStudentData?.turma} | {currentStudentData?.turno} | Professora Anne
            </Text>
          </VStack>

          {/* Informações basicas */}
          <Card boxShadow={cardShadow} mb='5px' p={5} w="100%" borderRadius={10} bg={bg}>
            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="lg"
              textAlign="left"
            >
              Informações básicas
            </Text>

            <FormControl mt={3}>
            <FormLabel>Escolha uma foto nova</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
              <Image src={previewImage} alt="Preview" maxWidth="200px" mt={5} borderRadius={10} />
            )}
          </FormControl>

          <Controller
            name="nome_aluno"
            control={control}
            rules={{ required: "Nome do aluno é obrigatório" }}
            render={({ field }) => (
              <FormControl isInvalid={!!errors.nome_aluno} my={5}>
                <FormLabel>Nome do Aluno</FormLabel>
                <Input {...field} placeholder="Nome do aluno" variant="filled" />
                <Text color="red.500">{errors.nome_aluno?.message}</Text>
              </FormControl>
            )}
          />

          <SimpleGrid 
            columns={{ base: 1, md: 1, lg: 2 }} 
            spacing={3} 
            w="100%" 
            mx='auto' 
            my={5} 
            borderRadius={10}
          >
            <Controller
              name="cpf_aluno"
              control={control}
              rules={{
                required: "CPF é obrigatório",
                pattern: {
                  value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                  message: "CPF inválido. Use o formato: 000.000.000-00"
                }
              }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.cpf_aluno}>
                  <FormLabel>CPF do Aluno</FormLabel>
                  <Input {...field} placeholder="000.000.000-00" variant="filled"/>
                  <Text color="red.500">{errors.cpf_aluno?.message}</Text>
                </FormControl>
              )}
            />

            <Controller
              name="data_nascimento"
              control={control}
              rules={{ required: "Data de nascimento é obrigatória" }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.data_nascimento}>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <Input {...field} type="date" variant="filled"/>
                  <Text color="red.500">{errors.data_nascimento?.message}</Text>
                </FormControl>
              )}
            />

            <Controller
              name="endereco"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Endereço</FormLabel>
                  <Input {...field} placeholder="Endereço" variant="filled"/>
                </FormControl>
              )}
            />

            <Controller
              name="turma"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Turma</FormLabel>
                  <Input {...field} placeholder="Turma" variant="filled"/>
                </FormControl>
              )}
            />

            <Controller
              name="turno"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Turno</FormLabel>
                  <Input {...field} placeholder="Turno" variant="filled"/>
                </FormControl>
              )}
            />

            <Controller
              name="rota"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel>Rota</FormLabel>
                  <Input {...field} placeholder="Rota" variant="filled"/>
                </FormControl>
              )}
            />
          </SimpleGrid>

          <Controller
            name="sexo"
            control={control}
            rules={{ required: "Sexo é obrigatório" }}
            render={({ field }) => (
              <FormControl as="fieldset" isInvalid={!!errors.sexo}>
                <FormLabel as="legend">Sexo</FormLabel>
                <RadioGroup {...field} >
                  <HStack spacing={2} align="start">
                    <Radio value="F">Feminino</Radio>
                    <Radio value="M">Masculino</Radio>
                  </HStack>
                </RadioGroup>
                <Text color="red.500">{errors.sexo?.message}</Text>
              </FormControl>
            )}
          />
          </Card>

          <Card boxShadow={cardShadow} mb='5px' p={5} w="100%" borderRadius={10} bg={bg} mt={5}>
            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="lg"
              textAlign="left"
            >
              Informações familiares
            </Text>

            <Controller
              name="nome_pai"
              control={control}
              rules={{ required: "Nome do pai é obrigatória" }}
              render={({ field }) => (
                <FormControl my={5}>
                  <FormLabel>Nome do Pai</FormLabel>
                  <Input {...field} placeholder="Nome do pai" variant="filled"/>
                </FormControl>
              )}
            />

            <Controller
              name="nome_mae"
              control={control}
              render={({ field }) => (
                <FormControl my={5}>
                  <FormLabel>Nome da Mãe</FormLabel>
                  <Input {...field} placeholder="Nome da mãe" variant="filled"/>
                </FormControl>
              )}
            />

            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2 }}
              spacing={3}
              w="100%"
              mx='auto'
              my={5}
              borderRadius={10}
            >
              <Controller
                name="telefone_responsavel"
                control={control}
                rules={{ required: "Telefone do responsável é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.telefone_responsavel}>
                    <FormLabel>Telefone do Responsável</FormLabel>
                    <Input {...field} placeholder="Telefone do responsável" variant="filled"/>
                    <Text color="red.500">{errors.telefone_responsavel?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="bolsa_familia"
                control={control}
                rules={{ required: "Informação sobre Bolsa Família é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.bolsa_familia}>
                    <FormLabel>Bolsa Família</FormLabel>
                    <Select {...field} placeholder="Recebe Bolsa Família?" variant="filled">
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
                    </Select>
                    <Text color="red.500">{errors.bolsa_familia?.message}</Text>
                  </FormControl>
                )}
              />
            </SimpleGrid>
          </Card>

          <Card boxShadow={cardShadow} mb='5px' p={5} w="100%" borderRadius={10} bg={bg} mt={5}>
            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="lg"
              textAlign="left"
            >
              Informações complementares e escolores
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2 }}
              spacing={3}
              w="100%"
              mx='auto'
              my={5}
              borderRadius={10}
              gap={5}
            >
              <Controller
                name="etnia"
                control={control}
                rules={{ required: "Etnia é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.etnia}>
                    <FormLabel>Etnia</FormLabel>
                    <Select {...field} placeholder="Selecione a etnia" variant="filled">
                      <option value="Branco">Branco</option>
                      <option value="Pardo">Pardo</option>
                      <option value="Preto">Preto</option>
                      <option value="Amarelo">Amarelo</option>
                      <option value="Indígena">Indígena</option>
                    </Select>
                    <Text color="red.500">{errors.etnia?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="deficiencia"
                control={control}
                rules={{ required: "Informação sobre deficiência é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.deficiencia}>
                    <FormLabel>Deficiência</FormLabel>
                    <Select {...field} placeholder="Possui deficiência?" variant="filled">
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
                    </Select>
                    <Text color="red.500">{errors.deficiencia?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="status"
                control={control}
                rules={{ required: "Status é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.status}>
                    <FormLabel>Status</FormLabel>
                    <Select {...field} placeholder="Selecione o status" variant="filled">
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </Select>
                    <Text color="red.500">{errors.status?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="status_transporte"
                control={control}
                rules={{ required: "Informação sobre transporte é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.status_transporte}>
                    <FormLabel>Status do Transporte</FormLabel>
                    <Select {...field} placeholder="Utiliza transporte escolar?" variant="filled">
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
                    </Select>
                    <Text color="red.500">{errors.status_transporte?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="numero_matricula_rede"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Número de Matrícula na Rede</FormLabel>
                    <Input {...field} placeholder="Número de matrícula" variant="filled"/>
                  </FormControl>
                )}
              />

              <Controller
                name="numero_inep"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Número INEP</FormLabel>
                    <Input {...field} placeholder="Número INEP" variant="filled"/>
                  </FormControl>
                )}
              />

              <Controller
                name="etapa_ensino"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Etapa de Ensino</FormLabel>
                    <Input {...field} placeholder="Etapa de ensino" variant="filled"/>
                  </FormControl>
                )}
              />

              <Controller
                name="tipo_vinculo"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Tipo de Vínculo</FormLabel>
                    <Input {...field} placeholder="Tipo de vínculo" variant="filled"/>
                  </FormControl>
                )}
              />

              <Controller
                name="sigla_concessionaria_energia"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Sigla da Concessionária de Energia</FormLabel>
                    <Input {...field} placeholder="Sigla da concessionária" variant="filled"/>
                  </FormControl>
                )}
              />

              <Controller
                name="unidade_consumidora"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Unidade Consumidora</FormLabel>
                    <Input {...field} placeholder="Unidade consumidora" variant="filled"/>
                  </FormControl>
                )}
              />
            </SimpleGrid>
          </Card>

          <Center>
            <Button type="submit" colorScheme="blue" mt={5} width={'50%'} height={'3rem'} isLoading={isLoading}>
              Atualizar aluno
            </Button>
          </Center>
        </VStack>
      </Box>
      <ToastContainer />
    </Header>
  )
}