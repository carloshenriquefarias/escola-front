import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
  VStack, SimpleGrid, Text, Select as ChakraSelect, Button, Divider, Heading
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import { useState } from 'react';
import { api } from '../services/api';
import { toastApiResponse } from '../components/Toast';

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  setSearchResults: (results: any) => void;
  setIsSearching: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export default function AdvancedFilterModal({
  isOpen, onClose, setSearchResults, setIsSearching, setLoading
}: AdvancedFilterModalProps) {
  const [sexo, setSexo] = useState('');
  const [etnia, setEtnia] = useState('');
  const [packageFamily, setPackageFamily] = useState('');
  const [status, setStatus] = useState('');
  const [deficiency, setDeficiency] = useState('');
  const [classStudent, setClassStudent] = useState('');
  const [period, setPeriod] = useState('');
  const [route, setRoute] = useState('');

  const handleAdvancedSearch = async () => {
    setLoading(true);
    setIsSearching(true);
    try {
      const dataToSend: Record<string, string | number> = {};
      const filters = {
        sexo,
        etnia,
        turno: period,
        turma: classStudent,
        bolsa_familia: packageFamily,
        status,
        deficiencia: deficiency,
        rota: route,
      };
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          dataToSend[key] = key === 'bolsa_familia' ? parseInt(value) : value;
        }
      }
      const response = await api.post('/alunos/search', dataToSend);
      setSearchResults(response.data.status && Array.isArray(response.data.alunos) ? response.data.alunos : []);
      resetFields();
    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]);
      toastApiResponse(error, 'Não foi possível listar os alunos desta turma!');
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setSexo('');
    setEtnia('');
    setPackageFamily('');
    setStatus('');
    setDeficiency('');
    setClassStudent('');
    setPeriod('');
    setRoute('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filtro avançado</ModalHeader>
        <Heading fontSize="sm" px={6} fontWeight="semibold" color="gray.600" mt={-2}>
          Escolha as características do aluno que você deseja
        </Heading>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="full">
            <VStack align="start">
              <Text fontWeight="semibold" fontSize="sm" color="gray.400">Sexo:</Text>
              <ChakraSelect onChange={(e) => setSexo(e.target.value)} value={sexo}>
                <option value="">Todos</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </ChakraSelect>
            </VStack>
            <VStack align="start">
              <Text fontWeight="semibold" fontSize="sm" color="gray.400">Etnia:</Text>
              <ChakraSelect onChange={(e) => setEtnia(e.target.value)} value={etnia}>
                <option value="">Todas</option>
                <option value="Branco">Branco</option>
                <option value="Pardo">Pardo</option>
                <option value="Preto">Preto</option>
                <option value="Amarelo">Amarelo</option>
                <option value="Indígena">Indígena</option>
              </ChakraSelect>
            </VStack>
            <VStack align="start">
              <Text fontWeight="semibold" fontSize="sm" color="gray.400">Bolsa família:</Text>
              <ChakraSelect onChange={(e) => setPackageFamily(e.target.value)} value={packageFamily}>
                <option value="">Todos</option>
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </ChakraSelect>
            </VStack>
            <VStack align="start">
              <Text fontWeight="semibold" fontSize="sm" color="gray.400">Status do aluno:</Text>
              <ChakraSelect onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </ChakraSelect>
            </VStack>
            <VStack align="start">
              <Text fontWeight="semibold" fontSize="sm" color="gray.400">Deficiência:</Text>
              <ChakraSelect onChange={(e) => setDeficiency(e.target.value)} value={deficiency}>
                <option value="">Todos</option>
                <option value="1">Sim</option>
                <option value="0">Não</option>
              </ChakraSelect>
            </VStack>
            <VStack align="start">
              <Text fontWeight="semibold" fontSize="sm" color="gray.400">Turma:</Text>
              <ChakraSelect onChange={(e) => setClassStudent(e.target.value)} value={classStudent}>
                <option value="">Todas</option>
                <option value="1A">1A</option>
                <option value="1B">1B</option>
                <option value="1C">1C</option>
                <option value="1D">1D</option>
              </ChakraSelect>
            </VStack>
            <VStack align="start">
              <Text fontWeight="semibold" fontSize="sm" color="gray.400">Turno:</Text>
              <ChakraSelect onChange={(e) => setPeriod(e.target.value)} value={period}>
                <option value="">Todos</option>
                <option value="Matutino">Matutino</option>
                <option value="Vespertino">Vespertino</option>
              </ChakraSelect>
            </VStack>
            <VStack align="start">
              <Text fontWeight="semibold" fontSize="sm" color="gray.400">Rota:</Text>
              <ChakraSelect onChange={(e) => setRoute(e.target.value)} value={route}>
                <option value="">Todas</option>
                <option value="1">Rota 01</option>
                <option value="2">Rota 02</option>
                <option value="3">Rota 03</option>
                <option value="4">Rota 04</option>
                <option value="10">Rota 10</option>
              </ChakraSelect>
            </VStack>
          </SimpleGrid>
        </ModalBody>
        <Divider my={5} />
        <ModalFooter justifyContent="center" gap={5}>
          <Button variant="outline" onClick={resetFields} fontSize="sm" leftIcon={<FaFilter />}>
            Cancelar
          </Button>
          <Button variant="solid" colorScheme="blue" fontSize="sm" onClick={handleAdvancedSearch} leftIcon={<FaFilter />}>
            Aplicar filtros
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}