import { Box, Stack, Text, Image, Button, ButtonProps, useColorModeValue, VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { motion } from "framer-motion";

type CardImageProps = {
  id?: string;
  image: string | any;
  linkAds?: string;
  costumer?: string;
  initialDate?: string;
  daysToEnd?: string;
  finalDate?: string;
  price?: string;
  onClickEdit?: () => void;
  onClickStatus?: () => void;
  onClickDelete?: () => void;
  buttonStatusColor?: string;
  showSecondButton?: boolean;
}

const CardAdsHorizontal = ({ image, initialDate, finalDate, costumer, price, onClickEdit, onClickStatus, onClickDelete, buttonStatusColor }: CardImageProps) => {
  return (
    <motion.div whileHover={{ translateY: -5 }}>
      <Box
        borderWidth="1px"
        cursor={'pointer'}
        _hover={{ boxShadow: "0 0 0 5px cyan" }}
        rounded="md"
        overflow="hidden"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Box w="auto" height="auto" borderRadius={10} position="relative">
          {buttonStatusColor === '0' && (
            <VStack
              top={0}
              h="100%"
              w="100%"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              zIndex={1}
            >
              <Box bg="blue.200" h="100%" w="100%" opacity={0.7} rounded="md" />
              <Text
                fontFamily="heading"
                fontSize="lg"
                color="gray.100"
                position="absolute"
                zIndex={2}
              >
                DISABLED
              </Text>
            </VStack>
          )}

          <Image
            src={image}
            objectFit="fill"
            w="100%"
            h="auto"
            maxH="14rem"
            opacity={buttonStatusColor === '0' ? 0.5 : 1}
          />
        </Box>

        <Box p={{ base: 3, sm: 5 }}>
          <Box mb={6}>
            <Text fontSize={{ base: 'md', sm: 'lg' }} noOfLines={2} fontWeight={'semibold'} color={'blue.400'}>
              {costumer}
            </Text>

            <Text fontSize={{ base: 'md', sm: 'lg' }} noOfLines={2} color={'blue.400'}>
              Price ads: $ {price}
            </Text>

            <Text fontSize={{ base: 'md', sm: 'lg' }} noOfLines={2} color={'blue.400'}>
              Initial date: {initialDate}
            </Text>

            <Text fontSize={{ base: 'md', sm: 'lg' }} noOfLines={2} fontWeight={'semibold'} color={'red.400'}>
              Final date: {finalDate}
            </Text>
          </Box>

          <Stack
            justifyContent="center"
            direction={{ base: 'column', sm: 'row' }}
            spacing={{ base: 2, sm: 2 }}
          >
            <CustomButton colorScheme="linkedin" variant="solid" w='full' onClick={onClickEdit}>
              Edit
            </CustomButton>

            <CustomButton colorScheme={buttonStatusColor === '0' ? 'gray' : 'teal'} variant="solid" w='full' onClick={onClickStatus}>
              {buttonStatusColor === '1' ? 'Enabled' : 'Disabled'}
            </CustomButton>

            <CustomButton bg="red.400" color={'white'} variant="solid" w='full' onClick={onClickDelete}>
              Delete
            </CustomButton>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
};

const CustomButton = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  return (
    <Button textTransform="uppercase" lineHeight="inherit" rounded="md" {...props}>
      {children}
    </Button>
  );
};

export default CardAdsHorizontal;