import { Container, Box, TableContainer, Table, Thead, Tbody, Th, Tr, Td, Text, useColorModeValue, HStack, Button } from '@chakra-ui/react';

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

interface DataTableProps {
  washing: Lavagem[];
  bgColor: string;
}

const NewTable: React.FC<DataTableProps> = ({ washing, bgColor }) => {

  const getFirstName = (fullName: string | undefined): string => {
    if (!fullName) return 'Nome não disponível';
    const names = fullName.split(' ');
    return names[0];
  };
  
  return (
    <Container maxW="full" py={2}>
      <Box border="1px solid" borderColor="gray.100" rounded="md" boxShadow="lg" overflow="hidden" mb={4}>
        <TableContainer>
          <Table size="sm">
            <Thead >
              <Tr fontWeight="900" bg={bgColor}>
                <Th py={5}>ID</Th>
                <Th>Solicitação</Th>
                <Th>Placa</Th>
                <Th>Motorista</Th>
                <Th>Rota</Th>
                <Th>Km atual</Th>
                <Th>Programada</Th>
                <Th>Realizada</Th>
                <Th>Hora</Th>
                {/* <Th>Serviço realizado</Th> */}
                <Th>Status</Th>
                <Th>Próxima</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {washing.map((washing, index) => (
                <Tr key={index} _hover={{ bg: 'lightblue' }} cursor={'pointer'}>
                  <Td fontSize="sm" color={'blue.500'}>{washing.id}</Td>
                  <Td fontSize="sm" color={'blue.500'}>{washing.data_envio_solicitacao}</Td>
                  <Td fontSize="sm" color={'blue.500'}>{washing.placa_onibus}</Td>
                  <Td fontSize="sm" color={'blue.500'}>{getFirstName(washing.nome_motorista)}</Td>
                  {/* <Td fontSize="sm" color={'blue.500'}>{washing.rota}</Td> */}
                  <Td fontSize="sm" color={'blue.500'}>{'10'}</Td>
                  <Td fontSize="sm" color={'blue.500'}>{washing.km_rota}</Td>
                  <Td fontSize="sm" color={'blue.500'}>{washing.data_lavagem_programada}</Td>
                  <Td fontSize="sm" color={'blue.500'}>{washing.data_lavagem_realizada}</Td>
                  <Td fontSize="sm" color={'blue.500'}>{washing.hora_lavagem}</Td>
                  {/* <Td fontSize="sm" color={'blue.500'}>{washing.servicos_realizados}</Td> */}
                  
                  <Td>
                    <Box
                      w="auto" h='1.8rem'
                      bg={useColorModeValue(washing.status_lavagem === 1 ? 'green.100' : 'red.400', 'gray.600')}
                      rounded="sm"
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text textAlign={'center'} pt={[0.5, 1, 1.5]} color={'white'} fontSize={['2xs', 'xs', 'sm']}>
                        {washing.status_lavagem === 1 ? 'Finalizado' : 'Pendente'}
                      </Text>
                    </Box>
                  </Td>
                  <Td fontSize="sm" color={'blue.500'}>{washing.data_prevista_proxima_lavagem}</Td>
                  <Td>
                    <HStack>
                      <Button size="sm" variant="solid" colorScheme="blue" fontWeight="semibold">
                        Editar
                      </Button>
                      <Button size="sm" variant="solid" colorScheme="red" fontWeight="semibold">
                        Excluir
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default NewTable;

