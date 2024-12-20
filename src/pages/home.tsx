import { Flex, SimpleGrid, Text, Box, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Home() {

  return (
    <Flex direction="column" height="100%" bg="red">
      <Header>
        <motion.div
          initial={{ opacity: 0, x: -150 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -150 }}
          transition={{ duration: 0.7 }}
        >
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
                  Aqui sera a tela home
                </Text>
              </Box>
            </HStack>
          </SimpleGrid>
        </motion.div>
        <Footer />
      </Header>
    </Flex>
  )
}