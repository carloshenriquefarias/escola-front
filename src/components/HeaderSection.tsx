import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface HeaderSectionProps {
  textColorSecondary: string;
}

export default function HeaderSection({ textColorSecondary }: HeaderSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -150 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <SimpleGrid columns={1} spacing={3} w="full" p={3} bg="gray.50" borderRadius={10}>
        <HStack justify="space-between" align="center">
          <Box>
            <Text color="blue.300" fontWeight="semibold" fontSize="2xl" textAlign="left">
              Bem vindo ao Contrans, Carlos Henrique
            </Text>
            <Text color={textColorSecondary} fontSize="md" mt={2}>
              Este é o melhor lugar para você ter informações sobre o transporte escolar
            </Text>
          </Box>
        </HStack>
      </SimpleGrid>
    </motion.div>
  );
}