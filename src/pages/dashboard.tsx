import { Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Button, VStack, Box, 
  HStack, useBreakpointValue 
}from '@chakra-ui/react';

import Card from '../components/Card'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IconBox from '../components/IconBox'
import MiniStatistics from '../components/MiniStatistics'

import { MdBarChart } from "react-icons/md";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

import { api } from '../services/api'

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

import { toastApiResponse } from '../components/Toast'
// import PaginationContainer from '../components/Pagination';

export default function Dashboard() {

  const { user } = useAuth();
  // const { id: boatId } = useParams<{ id: string }>();

  const columns = useBreakpointValue({ base: 2, md: 2, lg: 3, xl: 4 });
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  const isValidUser = user !== null && user?.id !== '' && user?.name !== '' && user?.email !== '';
  const email = isValidUser ? user?.email : null;
  const cardShadow = useColorModeValue( "0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  const isWideVersion = useBreakpointValue({ base: false, lg: true,});

  const statisticsData = [
    { bg: 'blue', icon: MdBarChart, name: 'Total Listings', value: '10' },
    { bg: '', icon: MdBarChart, name: 'Expired Listings', value: '5' },
    { bg: '', icon: MdBarChart, name: 'Active Listings', value: '5' },
    { bg: 'blue', icon: MdBarChart, name: 'Enabled Listings', value: '2' },
    { bg: 'blue', icon: MdBarChart, name: 'Disabled Listings', value: '5' },
    // { bg: 'white', icon: MdAttachMoney, name: 'Total Sales', value: '22.450,00' },
  ];

  const fetchUserLogged = async () => {
    try {
      const response = await api.get(`/user/me.php?id=${user?.id}`);
      const userLogged = response.data;
      console.log(userLogged);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    }
  };

  const CustomMiniStatistics = ({ bg, icon, name, value }: any) => {
    return (
      <MiniStatistics
        bg={bg}
        _hover={"0 0 0 5px cyan"}
        startContent={
          <IconBox 
            w='56px' h='56px' 
            icon={
              <Icon w='32px' h='32px' as={icon} color={'gray.500'} />
            } 
          />
        }
        name={name}
        value={value}
      />
    );
  }; 

  const handleClickRegisterBoat = () => {
    navigate('/registerBoatBasic');
  };

  const handleClickManageProfile = () => {
    navigate('/editprofile');
  };

  useEffect(() => {
    fetchUserLogged();
  }, []);

  useEffect(() => { 
    if (email !== null) {
    } 
  }, [email]); 

  return (
    <>
      {user?.id ? (
        <Flex direction="column" height="100%" bg="white">
          <Header />

          <SimpleGrid 
            columns={{ base: 1, md: 1, lg: 1 }} 
            spacing={3}
            w="100%"
            maxWidth={1480}
            mx='auto'
            mt={5}
            px={3}
          >
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Box justifyContent={'flex-start'} alignItems={'center'}>
                <Text
                  color={textColorPrimary}
                  fontWeight="bold"
                  fontSize="2xl"
                  mt="5px"
                  textAlign="left"
                >
                  My Dashboard
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                  Manage Your Listings
                </Text>
              </Box>

              <HStack justifyContent={'center'} alignItems={'center'} gap={2}>
                <Button bg='gray.50' w='auto' h={'80px'} onClick={handleClickRegisterBoat}>
                  <VStack pt={0}>
                    <Icon as={BsFillPlusSquareFill} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>{isWideVersion ? 'New Listing' : 'New Ad'}</Text>
                  </VStack>
                </Button> 

                <Button bg='gray.50' w='auto' h={'80px'} onClick={handleClickManageProfile}>
                  <VStack pt={0}>
                    <Icon as={FaCircleUser} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>{isWideVersion ? 'Manage Profile' : 'Profile'}</Text>
                  </VStack>
                </Button>
              </HStack>
            </HStack>

            <Divider />
          </SimpleGrid>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Analitics
            </Text>

            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 3, "2xl": 5 }}
              gap='20px'
              spacing={10}
              my='20px'
              w="100%"
              maxWidth={1480}
              mx='auto'
            >
              {statisticsData.map((data, index) => (
                <CustomMiniStatistics key={index} {...data} />
              ))}
            </SimpleGrid>
          </Card>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' py={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' mb='10px'>
              My Registered Listings
            </Text>
            <SimpleGrid columns={columns} spacing={3}
              w="100%"
              maxWidth={1480}
              mx='auto'
              mt={5}
            >
              

            </SimpleGrid>
          </Card>

          {/* <Card bg={bg} boxShadow={cardShadow} mb='20px' pb={5} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <PaginationContainer totalPages={100}/>
          </Card> */}

          <ToastContainer />
          <Footer />
        </Flex>
      ) : (       
        null
      )}
    </>
  )
}