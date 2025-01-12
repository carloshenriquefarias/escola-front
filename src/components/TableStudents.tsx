import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';

interface Aluno {
    id: number;
    nome_aluno: string;
    data_nascimento: string;
    cpf_aluno: string;
    sexo: 'M' | 'F';
    nomePai: string;
    nomeMae: string;
    telefone_responsavel: string;
    etnia: string;
    status: 'Ativo' | 'Inativo';
    bolsa_familia: 0 | 1;
    statusTransporte: '0' | '1';
    numeroMatriculaRede: string;
    numeroInep: string;
    deficiencia: '0' | '1';
    etapaEnsino: string;
    turma: string;
    endereco: string;
    tipoVinculo: string;
    siglaConcessionariaEnergia: string;
    unidadeConsumidora: string;
    turno: 'Matutino' | 'Vespertino' | 'Noturno';
    rota: string;
    createdAt: string;
    updatedAt: string;
}

interface StudentTableProps {
  students: Aluno[];
  onStudentClick: (id: number) => void;
}

const TableStudents: React.FC<StudentTableProps> = ({ students, onStudentClick }) => {
//   const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box overflowX="auto" px={2} mt={5}>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr bg={'gray.50'} height={10}>
              <Th>Nome</Th>
              <Th>Turma</Th>
              <Th>Turno</Th>
              <Th>Rota</Th>
              <Th>Sexo</Th>
              <Th>Etnia</Th>
              <Th>CPF</Th>
              <Th>Bolsa</Th>
              <Th>Deficiencia</Th>
              <Th>Telefone</Th>
              <Th>Data de Nascimento</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr
                key={student.id}
                onClick={() => onStudentClick(student.id)}
                cursor="pointer"
                _hover={{ bg: hoverBgColor }}
              >
                <Td>{student.nome_aluno}</Td>
                <Td>{student.turma}</Td>
                <Td>{student.turno}</Td>
                <Td>{student.rota}</Td>
                <Td>{student.sexo == 'M' ? 'Masculino' : 'Feminino'}</Td>
                <Td>{student.etnia}</Td>
                <Td>{student.cpf_aluno}</Td>
                <Td>{student.bolsa_familia === 1 ? 'Sim' : 'Não'}</Td>
                <Td>{student.deficiencia === '1' ? 'Sim' : 'Não'}</Td>
                <Td>{student.telefone_responsavel}</Td>
                <Td>{student.data_nascimento}</Td>
                <Td>
                  <Button size="sm" variant="ghost" onClick={() => onStudentClick(student.id)}>
                    Detalhes
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {students.length === 0 && (
        <Box textAlign="center" py={4}>
          <Text color={textColor}>Nenhum estudante encontrado.</Text>
        </Box>
      )}
    </Box>
  );
};

export default TableStudents;