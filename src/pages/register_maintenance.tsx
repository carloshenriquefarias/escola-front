'use client'

import { Box, Button, FormControl, FormLabel, Input, Checkbox, VStack, Textarea, Flex,
  Heading, Stack, SimpleGrid, Image,
  // Select,
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Header from "../components/Header";
import { useState } from "react";
import { api } from "../services/api";

// Schema de validação com Yup
const schema = yup.object().shape({
  onibus_id: yup.number().required("O campo Ônibus ID é obrigatório"),
  data: yup.date().required("A data é obrigatória"),
  nome_motorista: yup.string().required("O nome do motorista é obrigatório"),
  rota: yup.string().required("A rota é obrigatória"),
  km_atual: yup.string().required("O KM atual é obrigatório"),
  problema: yup
  .mixed()
  .transform((value) =>
    typeof value === "string" ? value.split(",").map((v) => v.trim()) : value
  )
  .test(
    "is-array",
    "Descrição dos problemas deve ser uma lista de itens separados por vírgula",
    (value) => Array.isArray(value)
  )
  .test(
    "not-empty",
    "Descrição dos problemas deve conter pelo menos um item",
    (value) => {
      if (!value || !Array.isArray(value)) {
        return false; // Retorna falso se `value` for undefined ou não for um array
      }
      return value.length > 0 && value.every((v) => v !== "");
    }
  ),  
  data_da_manutencao: yup.date().required("A data da manutenção é obrigatória"),
  status_manutencao: yup.boolean().required("O status da manutenção é obrigatório"),
});

const RegisterMaintenance = () => {
  const { control, register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      onibus_id: undefined,
      data: undefined,
      nome_motorista: "",
      rota: "",
      km_atual: "",
      problema: [],
      data_da_manutencao: undefined,
      status_manutencao: false,
    },
  });

  const [fotoPrincipal, setFotoPrincipal] = useState(null);
  const [gallery, setGallery] = useState<File[]>([]);

  const formatDate = (date: any) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    const day = String(d.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
    return `${year}-${month}-${day}`;
  };

  const handleFotoPrincipalChange = (event: any) => {
    const file = event.target.files?.[0] || null;
    setFotoPrincipal(file);
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files); // Converte FileList para array
      setGallery((prev) => [...prev, ...files]); // Adiciona os novos arquivos
    }
  };

  const removeImage = (index: any) => {
    setGallery((prev) => prev.filter((_, i) => i !== index)); // Remove uma imagem específica
  };

  const onSubmit = async (data: any) => {

    try {
      // Converte as datas para o formato YYYY-MM-DD usando a função customizada
      const formattedData = {
        ...data,
        data: formatDate(data.data),
        data_da_manutencao: formatDate(data.data_da_manutencao),
      };

      const formData = new FormData();

      // Adiciona os campos do formulário ao FormData
      formData.append("onibus_id", formattedData.onibus_id);
      formData.append("data", formattedData.data); // Data formatada
      formData.append("nome_motorista", formattedData.nome_motorista);
      formData.append("rota", formattedData.rota);
      formData.append("km_atual", formattedData.km_atual);
      formData.append("data_da_manutencao", formattedData.data_da_manutencao); // Data formatada      
      formData.append("status_manutencao", String(data.status_manutencao ? 1 : 0));

      // Adiciona os problemas como um array
      data.problema.forEach((problema: string, index: number) => {
        formData.append(`problema[${index}]`, problema.trim());
      });

      // Adiciona a foto principal ao FormData, se disponível
      if (fotoPrincipal) {
        formData.append("foto_principal", fotoPrincipal);
      }

      // Adiciona as fotos da galeria ao FormData
      gallery.forEach((file, index) => {
        formData.append(`gallery[${index}]`, file);
      });
 
      const response = await api.post('/manutencoes', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Dados enviados com sucesso:", response.data);
      
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <Flex direction="column" height="100%">
      <Header>
        <Stack padding={4}>
          <Heading size="md">Cadastro de Manutenções</Heading>
          <Box as="form" onSubmit={handleSubmit(onSubmit)} p={5} borderWidth={1} borderRadius="md" boxShadow="md" mt={5}>
            <VStack spacing={4}>

              <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} spacing={2} px={2} w="100%">
                {/* Campo Ônibus ID */}
                <FormControl isInvalid={!!errors.onibus_id}>
                  <FormLabel>Ônibus ID</FormLabel>
                  <Input type="number" {...register("onibus_id")} />
                  {errors.onibus_id && <Box color="red.500">{errors.onibus_id.message}</Box>}
                </FormControl>

                {/* Campo Rota */}
                <FormControl isInvalid={!!errors.rota}>
                  <FormLabel>Rota</FormLabel>
                  <Input type="text" {...register("rota")} />
                  {errors.rota && <Box color="red.500">{errors.rota.message}</Box>}
                </FormControl>

                {/* Campo Data */}
                <FormControl isInvalid={!!errors.data}>
                  <FormLabel>Data</FormLabel>
                  <Input type="date" {...register("data")} />
                  {errors.data && <Box color="red.500">{errors.data.message}</Box>}
                </FormControl>

                {/* Campo KM Atual */}
                <FormControl isInvalid={!!errors.km_atual}>
                  <FormLabel>KM Atual</FormLabel>
                  <Input type="text" {...register("km_atual")} />
                  {errors.km_atual && <Box color="red.500">{errors.km_atual.message}</Box>}
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2} px={2} w="100%">
                {/* Campo Nome do Motorista */}
                <FormControl isInvalid={!!errors.nome_motorista}>
                  <FormLabel>Nome do Motorista</FormLabel>
                  <Input type="text" {...register("nome_motorista")} />
                  {errors.nome_motorista && (
                    <Box color="red.500">{errors.nome_motorista.message}</Box>
                  )}
                </FormControl>
              </SimpleGrid>

              <FormControl isInvalid={!!errors.problema}>
                <FormLabel>Descrição dos problemas</FormLabel>
                <Textarea
                  {...register("problema")}
                  placeholder="Descreva os problemas separados por vírgula"
                />
                {errors.problema && <Box color="red.500">{errors.problema.message}</Box>}
              </FormControl>

              {/* Campo Data da Manutenção */}
              <FormControl isInvalid={!!errors.data_da_manutencao}>
                <FormLabel>Data da Manutenção</FormLabel>
                <Input type="date" {...register("data_da_manutencao")} />
                {errors.data_da_manutencao && (
                  <Box color="red.500">{errors.data_da_manutencao.message}</Box>
                )}
              </FormControl>

              {/* Campo Status da Manutenção */}
              <FormControl>
                <FormLabel>Status da Manutenção</FormLabel>
                <Controller
                  control={control}
                  name="status_manutencao"
                  render={({ field }) => (
                    <Checkbox isChecked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                      Concluída
                    </Checkbox>
                  )}
                />
              </FormControl>

              {/* Campo Foto Principal */}
              <FormControl>
                <FormLabel>Foto Principal</FormLabel>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFotoPrincipalChange} // Atualiza o estado local
                />
                {fotoPrincipal && (
                  <Box mt={2}>
                    <Image
                      src={URL.createObjectURL(fotoPrincipal)}
                      alt="Pré-visualização da Foto Principal"
                      boxSize="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Box>
                )}
              </FormControl>

              {/* Campo para Galeria de Fotos */}
              <FormControl>
                <FormLabel>Galeria de Fotos</FormLabel>
                <Input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png"
                  onChange={handleGalleryChange}
                />
              </FormControl>

              {/* Pré-visualização da Galeria */}
              {gallery.length > 0 && (
                <SimpleGrid columns={3} spacing={4}>
                  {gallery.map((file, index) => (
                    <Box key={index} position="relative">
                      <Image
                        src={URL.createObjectURL(file)} // Cria uma URL temporária para a visualização
                        alt={`Foto ${index + 1}`}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => removeImage(index)} // Remove a imagem da galeria
                        position="absolute"
                        top="0"
                        right="0"
                      >
                        X
                      </Button>
                    </Box>
                  ))}
                </SimpleGrid>
              )}

              {/* Botão de Enviar */}
              <Button type="submit" colorScheme="blue" w="full">
                Enviar Dados
              </Button>
            </VStack>
          </Box>
        </Stack>
      </Header>
    </Flex>
  );
};

export default RegisterMaintenance;
