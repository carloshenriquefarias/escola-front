import { Flex, SimpleGrid, Stack, Spinner, Text, Box, Button, HStack } from '@chakra-ui/react';
import { FaRegFaceSadCry, FaFilePdf } from 'react-icons/fa6';
import CardStudents from './card-students';

import TableStudents from '../components/TableStudents';
import { Aluno } from '../dtos/types';

interface StudentsDisplayProps {
  students: Aluno[];
  loading: boolean;
  isSearching: boolean;
  selectedView: string;
  onStudentClick: (id: number) => void;
  onGeneratePDF: () => void;
}

export default function StudentsDisplay({
  students, loading, isSearching, selectedView, onStudentClick, onGeneratePDF
}: StudentsDisplayProps) {
  if (loading) {
    return (
      <Stack spacing={2} my={3} align="center" justify="center">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Stack>
    );
  }

  return (
    <Flex direction="column" mt={4}>
      {isSearching && students.length === 0 ? (
        <Flex direction="column" align="center">
          <Box fontSize="48px" color="gray.500">
            <FaRegFaceSadCry />
          </Box>
          <Text my={5}>Desculpe, mas nenhum aluno foi encontrado! Tente outra vez...</Text>
          <Button mb={2} colorScheme="blue">
            Mostrar todos os alunos
          </Button>
        </Flex>
      ) : (
        <>
          {isSearching && (
            <HStack align="center" justify="space-between" px={2}>
              <Text fontWeight="semibold" fontSize="lg" my={5} color="blue.300">
                Alunos encontrados: {students.length}
              </Text>
              <Button
                h="2rem"
                size="md"
                bg="blue.300"
                _hover={{ bg: 'cyan.500' }}
                borderRadius={5}
                leftIcon={<FaFilePdf />}
                onClick={onGeneratePDF}
                color="white"
                fontSize="sm"
              >
                PDF
              </Button>
            </HStack>
          )}
          {selectedView === '1' ? (
            <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 4, xl: 5 }} spacing={4} px={2} w="full" mt={5}>
              {students.map((student) => (
                <CardStudents
                  key={student.id}
                  nomeAluno={student.nome_aluno}
                  turma={student.turma}
                  turno={student.turno}
                  rota={student.rota}
                  sexo={student.sexo}
                  etnia={student.etnia}
                  cpfAluno={student.cpf_aluno}
                  telefoneResponsavel={student.telefone_responsavel}
                  dataNascimento={student.data_nascimento}
                  professora="Nascimento"
                  onClick={() => onStudentClick(student.id)}
                />
              ))}
            </SimpleGrid>
          ) : (
            <TableStudents students={students} onStudentClick={onStudentClick} />
          )}
        </>
      )}
    </Flex>
  );
}