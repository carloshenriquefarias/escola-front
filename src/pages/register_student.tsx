'use client'

import { useForm, Controller } from "react-hook-form"
import { Box, Button, FormControl, FormLabel, Input, VStack, Radio, RadioGroup, Select, 
  Text, Image, useToast, SimpleGrid, HStack, useColorModeValue, Center,
} from "@chakra-ui/react";

import { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";

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

export default function RegisterStudent() {

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const toast = useToast();
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      nome_aluno: "",
      data_nascimento: "",
      cpf_aluno: "",
      sexo: "F",
      nome_pai: "",
      nome_mae: "",
      telefone_responsavel: "",
      etnia: "",
      status: "",
      bolsa_familia: undefined,
      status_transporte: undefined,
      numero_matricula_rede: "",
      numero_inep: "",
      deficiencia: undefined,
      etapa_ensino: "",
      turma: "",
      endereco: "",
      tipo_vinculo: "",
      sigla_concessionaria_energia: "",
      unidade_consumidora: "",
      turno: "",
      rota: "",
    },
  })

  async function onSubmit(data: FormData) {  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const responseText = await response.text();  
      let result;

      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Erro ao parsear JSON:', e);
        throw new Error('Resposta inválida do servidor');
      }
  
      if (result.status === true) {
        toast({
          title: "Formulário enviado",
          description: "Os dados do aluno foram cadastrados com sucesso.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });

      } else {
        // Tratamento específico para erro de CPF duplicado
        if (result.error && result.error.includes("Duplicate entry") && result.error.includes("cpf_aluno_unique")) {
          toast({
            title: "Erro de cadastro",
            description: "Este CPF já está cadastrado no sistema. Por favor, verifique os dados ou tente atualizar o cadastro existente.",
            status: "error",
            position: "top",
            duration: 7000,
            isClosable: true,
          });
        } else {
          throw new Error(result.message || 'Erro desconhecido ao cadastrar aluno');
        }
      }
      
    } catch (error) {
      console.error('Erro detalhado:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar o aluno",
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
              Registro de aluno
            </Text>

            <Text color={'gray.500'} fontSize="md" me="6px" mb="5px" mt={2}>
              Preencha as informações abaixo sobre o novo aluno(a)
            </Text>
          </Box>
        </HStack>
      </SimpleGrid>

      <Box as="form" onSubmit={handleSubmit(onSubmit)} maxWidth="1000px" margin="auto" mt={5} justifyContent={'flex-start'} my={10}>
        <VStack spacing={0} align="stretch">

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
              <FormLabel>Escolha uma foto</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e);
                  const file = e.target.files?.[0];
                  if (file) {
                    // control.setValue('foto', e.target.files as FileList);
                  }
                }}
              />
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
                  <Input {...field} placeholder="Nome do aluno" />
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
                    <Input {...field} placeholder="000.000.000-00" />
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
                    <Input {...field} type="date" />
                    <Text color="red.500">{errors.data_nascimento?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="endereco"
                control={control}
                rules={{ required: "O endereço é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.endereco}>
                    <FormLabel>Endereço</FormLabel>
                    <Input {...field} placeholder="Endereço" />
                    <Text color="red.500">{errors.endereco?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="turma"
                control={control}
                rules={{ required: "A turma é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.turma}>
                    <FormLabel>Turma</FormLabel>
                    <Select {...field} placeholder="Selecione a turma">
                      <option value="1A">1A</option>
                      <option value="1B">1B</option>
                      <option value="1C">1C</option>
                      <option value="1D">1D</option>
                      <option value="2A">2A</option>
                    </Select>
                    <Text color="red.500">{errors.turma?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="turno"
                control={control}
                rules={{ required: "O turno é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.turno}>
                    <FormLabel>Turno</FormLabel>
                    <Select {...field} placeholder="Selecione o Turno">
                      <option value="Matutino">Matutino</option>
                      <option value="Vespertino">Vespertino</option>
                    </Select>
                    <Text color="red.500">{errors.turno?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="rota"
                control={control}
                rules={{ required: "A rota é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.rota}>
                    <FormLabel>Rota</FormLabel>
                    <Select {...field} placeholder="Selecione a rota">
                      <option value="1">Rota 01</option>
                      <option value="2">Rota 02</option>
                      <option value="3">Rota 03</option>
                      <option value="4">Rota 04</option>
                      <option value="5">Rota 05</option>
                      <option value="6">Rota 06</option>
                    </Select>
                    <Text color="red.500">{errors.rota?.message}</Text>
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
                  <RadioGroup {...field}>
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
              render={({ field }) => (
                <FormControl my={5}>
                  <FormLabel>Nome do Pai</FormLabel>
                  <Input {...field} placeholder="Nome do pai" />
                </FormControl>
              )}
            />

            <Controller
              name="nome_mae"
              control={control}
              rules={{ required: "Nome da mãe é obrigatório" }}
              render={({ field }) => (
                <FormControl my={5} isInvalid={!!errors.nome_mae}>
                  <FormLabel>Nome da Mãe</FormLabel>
                  <Input {...field} placeholder="Nome da mãe" />
                  <Text color="red.500">{errors.nome_mae?.message}</Text>
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
                    <Input {...field} placeholder="Telefone do responsável" />
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
                    <Select {...field} placeholder="Selecione uma opção">
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
                    </Select>
                    <Text color="red.500" mt={2}>
                      {errors.bolsa_familia?.message}
                    </Text>
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
                    <Select {...field} placeholder="Selecione a etnia">
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
                    <Select {...field} placeholder="Possui deficiência?">
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
                    <Select {...field} placeholder="Selecione o status">
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
                    <Select {...field} placeholder="Utiliza transporte escolar?">
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
                    <Input {...field} placeholder="Número de matrícula" />
                  </FormControl>
                )}
              />

              <Controller
                name="numero_inep"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Número INEP</FormLabel>
                    <Input {...field} placeholder="Número INEP" />
                  </FormControl>
                )}
              />

              <Controller
                name="etapa_ensino"
                control={control}
                rules={{ required: "A etapa de ensino é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.etapa_ensino}>
                    <FormLabel>Etapa de Ensino</FormLabel>
                    <Select {...field} placeholder="Selecione a etapa de ensino">
                      <option value="Pré-ensino">Pré-ensino</option>
                      <option value="Fundamental">Fundamental</option>
                    </Select>
                    <Text color="red.500">{errors.etapa_ensino?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="tipo_vinculo"
                control={control}
                rules={{ required: "O tipo de vínculo é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.tipo_vinculo}>
                    <FormLabel>Tipo de Vínculo</FormLabel>
                    <Select {...field} placeholder="Selecione o tipo de vínculo">
                      <option value="Municipal">Municipal</option>
                    </Select>
                    <Text color="red.500">{errors.tipo_vinculo?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="sigla_concessionaria_energia"
                control={control}
                rules={{ required: "A concessionária de energia é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.sigla_concessionaria_energia}>
                    <FormLabel>Concessionária de Energia</FormLabel>
                    <Select {...field} placeholder="Selecione a concessionária">
                      <option value="Energisa">Energisa</option>
                    </Select>
                    <Text color="red.500">{errors.sigla_concessionaria_energia?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="unidade_consumidora"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Unidade Consumidora</FormLabel>
                    <Input {...field} placeholder="Unidade consumidora" />
                  </FormControl>
                )}
              />
            </SimpleGrid>
          </Card>

          <Center>
            <Button type="submit" colorScheme="blue" mt={5} width={'50%'} height={'3rem'}>
              Cadastrar Aluno
            </Button>
          </Center>
        </VStack>
      </Box>
    </Header>
  )
}

