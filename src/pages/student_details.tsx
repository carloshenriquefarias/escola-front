'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Avatar,
  HStack,
} from '@chakra-ui/react'
import { MdLocalShipping } from 'react-icons/md'
import Header from '../components/Header'

export default function StudentDetails() {
  return (
    <Header>
      <Container maxW={'auto'}>
        <SimpleGrid
          columns={{ base: 1 }}
          spacing={{ base: 8 }}
          py={{ base: 6,}}
        >
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>

              <HStack justifyContent={'flex-start'} alignItems={'flex-start'} spacing={4}>
                <Avatar
                  size={'2xl'}
                  src={
                    'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                  }
                />

                <VStack spacing={{ base: 1, sm: 2 }} justifyContent={'flex-start'} alignItems={'flex-start'} mt={2}>
                  <Heading
                    color={useColorModeValue('blue.300', 'blue.200')}
                    fontWeight={600}
                    fontSize={{ base: 'md', sm: '2xl', md: '2xl', lg: '4xl' }}
                  >
                    Joao Silva
                  </Heading>

                  <Text
                    color={useColorModeValue('blue.300', 'blue.200')}
                    fontWeight={300}
                    fontSize={{ base: 'md', sm: 'xl', md: '2xl' }}
                  >
                    10 anos de idade
                  </Text>

                  <Text
                    color={useColorModeValue('blue.300', 'blue.200')}
                    fontWeight={300}
                    fontSize={{ base: 'md', sm: 'xl', md: '2xl' }}
                  >
                    Atualmente estuda no 1A
                  </Text>
                </VStack>  
              </HStack>            
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
              }
            >
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Informações básicas
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem color={'blue.300'}>Nome completo: Joao Lopes da Costa Silva</ListItem>
                    <ListItem color={'blue.300'}>CPF do Aluno: 857.741.785-99</ListItem>{' '}
                    <ListItem color={'blue.300'}>Data de nascimento: 18/04/2015</ListItem>
                    <ListItem color={'blue.300'}>Rota: 10</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem color={'blue.300'}>Sexo: Masculino</ListItem>
                    <ListItem color={'blue.300'}>Turma: 1A</ListItem>
                    <ListItem color={'blue.300'}>Turno: Matutino</ListItem>
                    <ListItem color={'blue.300'}>Endereço: Rua da picanha, 1313</ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Informações familiares
                </Text>

                <List spacing={2}>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Nome do Pai:
                    </Text>{' '}
                    Jose da Silva Pereira Machado
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Nome da mãe:
                    </Text>{' '}
                    Maria Joaquina Pedrita Cunha
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Telefone do Responsável:
                    </Text>{' '}
                    69 99985-9632
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Bolsa Família:
                    </Text>{' '}
                    Sim
                  </ListItem>
                </List>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Informações complementares e escolores
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Etnia:
                    </Text>{' '}
                    Branca
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Possui laguma deficiência:
                    </Text>{' '}
                    Não
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Status:
                    </Text>{' '}
                    Ativo
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Usa transporte escolar:
                    </Text>{' '}
                    Sim
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Número de Matrícula na Rede:
                    </Text>{' '}
                    587.541.899
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Número INEP:
                    </Text>{' '}
                    25865545
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Etapa de Ensino:
                    </Text>{' '}
                    Ensino Fundamental
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Tipo de Vínculo:
                    </Text>{' '}
                    Municipal
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Sigla da Concessionária de Energia:
                    </Text>{' '}
                    Energisa
                  </ListItem>
                  <ListItem color={'blue.300'}>
                    <Text as={'span'} fontWeight={'bold'} color={'blue.300'}>
                      Unidade Consumidora:
                    </Text>{' '}
                    20.148.859/88
                  </ListItem>
                </List>
                </SimpleGrid>
              </Box>
            </Stack>

            <HStack justifyContent={'space-between'} alignItems={'center'} spacing={4}>

              <Button
                rounded={50}
                w={'50%'}
                mt={8}
                size={'md'}
                py={'7'}
                bg={useColorModeValue('blue.300', 'gray.50')}
                color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
              >
                Editar informações
              </Button>

              <Button
                rounded={50}
                w={'50%'}
                mt={8}
                size={'md'}
                py={'7'}
                bg={useColorModeValue('red.500', 'red.200')}
                color={useColorModeValue('white', 'gray.900')}
                textTransform={'uppercase'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
              >
                Deletar aluno
              </Button>
            </HStack>

            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Header>
  )
}