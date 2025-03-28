import { Card, HStack, Input, InputGroup, Button, RadioGroup, Stack, 
  Radio, Text, VStack, useBreakpointValue 
} from '@chakra-ui/react';
import { FaSearch, FaFilter } from 'react-icons/fa'; // Corrigir imports de ícones
import { AiOutlineReload } from 'react-icons/ai';
import { api } from '../services/api';
import { toastApiResponse } from '../components/Toast';

interface SearchSectionProps {
  bg: string;
  cardShadow: string;
  textColorSecondary: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedView: string;
  setSelectedView: (value: string) => void;
  setSearchResults: (results: any) => void;
  setIsSearching: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  onOpenAdvancedFilter: () => void;
}

export default function SearchSection({
  bg, 
  cardShadow, 
  textColorSecondary, 
  inputValue, 
  setInputValue, 
  selectedView, 
  setSelectedView, 
  setSearchResults, 
  setIsSearching, 
  setLoading, 
  onOpenAdvancedFilter
}: SearchSectionProps) {

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  const handleSearchStudent = async () => {
    setLoading(true);
    setIsSearching(true);

    try {
      const response = await api.post('/alunos/buscar', { query: inputValue });
      setSearchResults(Array.isArray(response.data.data) ? response.data.data : []);

    } catch (error) {
      console.error('Error:', error);
      setSearchResults([]);
      toastApiResponse(error, 'Não foi possível buscar os alunos!');

    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setIsSearching(false);
    setInputValue('');
    setSearchResults([]);
  };

  return (
    <Card bg={bg} boxShadow={cardShadow} py={3} px={3} w="full" borderRadius={10}>
      <Text color={textColorSecondary} fontSize="md" mb={4}>
        Encontre o aluno que você deseja e selecione o modo de visualização
      </Text>

      <RadioGroup onChange={setSelectedView} value={selectedView} color="gray.500">
        <Stack direction="row" spacing={4} mt={0}>
          <Radio value="1">Cartão</Radio>
          <Radio value="0">Tabela</Radio>
        </Stack>
      </RadioGroup>

      <VStack my={2} gap={2} w="full" px={isWideVersion ? 3 : 0}>
        <InputGroup size="md" w={isWideVersion ? "50%" : "100%"}>
          <Input
            type="text"
            placeholder="Digite o nome do aluno, CPF, rota..."
            borderRadius="full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </InputGroup>

        <HStack justify="center" w={isWideVersion ? "50%" : "100%"} mt={3} gap={2}>
          <Button
            h="3rem"
            size="lg"
            bg="blue.300"
            _hover={{ bg: 'cyan.500' }}
            borderRadius="full"
            leftIcon={<FaSearch />}
            onClick={handleSearchStudent}
            color="white"
            fontSize={["xs", "sm", "md"]}
          >
            Pesquisar
          </Button>

          <Button
            h="3rem"
            size="lg"
            bg="blue.500"
            _hover={{ bg: 'cyan.800' }}
            borderRadius="full"
            leftIcon={<FaFilter />}
            onClick={onOpenAdvancedFilter} // Abrir o modal
            color="white"
            fontSize="sm"
          >
            Filtro avançado
          </Button>

          <Button
            h="3rem"
            size="lg"
            bg="red.500"
            _hover={{ bg: 'gray.500' }}
            borderRadius="full"
            leftIcon={<AiOutlineReload />}
            onClick={resetSearch}
            color="white"
            fontSize="sm"
          >
            Resetar filtro
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}