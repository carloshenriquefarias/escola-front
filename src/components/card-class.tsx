'use client'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react'
import { IoIosPricetags } from 'react-icons/io'


export default function CardClass({}) {
  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
        _hover={{ boxShadow: "0 0 0 4px cyan"}}
      >
        <Avatar
          size={'xl'}
          src={
            'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
          }
          mb={4}
        />

        <Heading fontSize={'xl'} fontWeight={'semibold'} fontFamily={'body'} color={'blue.300'}>
          1A | Anne Maria 
        </Heading>

        <Text fontSize={'sm'} color={'gray.500'} mb={4} mt={1}>
          Vespertino
        </Text>

        {/* <Text fontSize={'sm'} color={'gray.500'} mb={4} mt={0}>
          {'1A'} | {'Vespertino'} | Anne Sofia
        </Text> */}

        <VStack justifyContent='space-between' alignItems='center' w='100%'>
          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["sm", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                Alunos na sala: {'25'}
              </Text>
            </HStack>
          </HStack>

          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["sm", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                Masculino: {15}
              </Text>
            </HStack>
          </HStack>

          <HStack justifyContent='flex-start' alignItems='center' w='100%'>
            <HStack>
              <Icon as={IoIosPricetags} color={"gray.300"} />
              <Text fontSize={["sm", "sm"]} fontWeight="semibold" color='gray.300' textAlign='left'>
                Feminino: {10}
              </Text>
            </HStack>
          </HStack>
        </VStack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
          >
            Ver turma
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}