import {
  Divider, Flex, Icon, SimpleGrid, useColorModeValue, Text, Box, HStack, useBreakpointValue
} from '@chakra-ui/react';

import Card from '../components/Card'
import CardBoat from '../components/CardBoat'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IconBox from '../components/IconBox'
import MiniStatistics from '../components/MiniStatistics'
import ModalPlanList from '../components/ModalPlanList'

import { BoatDataGlobal } from '../mock/motorYatchs';

import { MdBarChart } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { IoConstruct } from "react-icons/io5";
import { IoTimer } from "react-icons/io5";
import { MdDirectionsBoatFilled } from "react-icons/md";
import { GiShipWheel } from "react-icons/gi";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

import { api } from '../services/api'

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

import { toastApiResponse } from '../components/Toast'
import ModalDelete from '../components/ModalDelete';
// import PaginationContainer from '../components/Pagination';

type PlanOrder = 'ENHANCED' | 'CLASSIC' | 'FREE LIMITED TIME';

export default function DashboardClientsAndBrokers() {

  const [userInfo, setUserInfo] = useState<{ id: string; email: string; name: string } | null>(null);

  const { user } = useAuth();
  const { id: id } = useParams<{ id: string }>();

  const columns = useBreakpointValue({ base: 2, md: 2, lg: 3, xl: 4 });
  const navigate = useNavigate();
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");
  // const isWideVersion = useBreakpointValue({ base: false, lg: true, });

  const [allBoatByUser, setAllBoatByUser] = useState<BoatDataGlobal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDeleteButton, setIsModalOpenDeleteButton] = useState(false);
  const [cardBoatID, setCardBoatID] = useState('');
  const [isBroker, setIsBroker] = useState(0);

  const generateCardInfoItems = (boat: any) => {
    return isBroker
      ? [
        { icon: IoConstruct, title: 'Maker', value: boat.maker },
        { icon: GiShipWheel, title: 'Model', value: boat.model },
        { icon: FaMapLocationDot, title: 'Location', value: boat.city },
        { icon: IoCalendarOutline, title: 'Listed', value: boat.date_registed },
      ]
      : [
        { icon: MdDirectionsBoatFilled, title: 'Type', value: boat.boatType },
        { icon: IoTimer, title: 'Final date', value: boat.final_date },
        { icon: IoConstruct, title: 'Plan selected', value: boat.planSelected },
        { icon: FaCity, title: 'Expire in', value: `${boat.days_to_expire} days` },
      ]
      ;
  };

  const counts = {
    is_active_0: 0,
    is_active_1: 0,
    is_date_expired_false: 0,
    is_date_expired_true: 0
  };

  allBoatByUser.forEach(boat => {
    if (boat.is_active === "0") {
      counts.is_active_0++;
    } else if (boat.is_active === "1") {
      counts.is_active_1++;
    }

    if (boat.is_date_expired === false) {
      counts.is_date_expired_false++;
    } else if (boat.is_date_expired === true) {
      counts.is_date_expired_true++;
    }
  });

  const statisticsData = [
    { bg: 'blue', icon: MdBarChart, name: 'Total Listings', value: allBoatByUser.length },
    { bg: '', icon: MdBarChart, name: 'Expired Listings', value: counts.is_date_expired_true },
    { bg: '', icon: MdBarChart, name: 'Active Listings', value: counts.is_date_expired_false },
    { bg: 'blue', icon: MdBarChart, name: 'Enabled Listings', value: counts.is_active_1 },
    { bg: 'blue', icon: MdBarChart, name: 'Disabled Listings', value: counts.is_active_0 },
    // { bg: 'white', icon: MdAttachMoney, name: 'Total Sales', value: '22.450,00' },
  ];

  const fetchUserLogged = async () => {

    try {
      const response = await api.get(`/user/me.php?id=${user?.id}`);
      const userLogged = response.data;

      setIsBroker(userLogged.isBroker);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to list this user! Please try again!');
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalDeleteButton = () => {
    setIsModalOpenDeleteButton(true);
  };

  const closeModalDeleteButton = () => {
    setIsModalOpenDeleteButton(false);
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

  async function handleDeleteBoatByID() {
    try {
      const response = await api.post('/delete_boat_id.php', { id: id });
      toastApiResponse(response, response.data.message);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/dashboard`);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
    }
  };

  const handleClickEditBoats = (boatId: string) => {
    navigate(`/boatedit/${boatId}`);
  };

  // const handleClickManageProfile = () => {
  //   navigate('/editprofile');
  // };

  const handleClickGoCardBoatDetails = (boatId: string) => {
    navigate(`/cardBoatDetails/${boatId}`);
  };

  function handleSelectPlan(boatId: string) {
    setCardBoatID(boatId)
    openModal()
  }

  async function fetchAllBoatByUser() {
    try {

      const response = await api.post('/list_boat_by_email.php', {
        email: userInfo?.email
      });

      const boats = response.data;
      const createImageMainBoatUrl = (image: any) => `https://techsoluctionscold.com.br/api-boats/uploads/boats_images/${image}`;

      const sortedBoats = boats
        // .filter((boat: any) => boat.is_date_expired === false)
        // .filter((boat: any) => boat.is_active === '1')
        .map((boat: any) => ({
          ...boat,
          imageMainBoat: createImageMainBoatUrl(boat.images[0]),
        }))
        .sort((a: any, b: any) => {
          const planOrder: Record<PlanOrder, number> = { 'ENHANCED': 0, 'CLASSIC': 1, 'FREE LIMITED TIME': 2 };

          const planA = a.planSelected as PlanOrder | undefined;
          const planB = b.planSelected as PlanOrder | undefined;

          if (planA && planB) {
            const orderDifference = planOrder[planA] - planOrder[planB];

            if (orderDifference !== 0) {
              return orderDifference;
            } else {
              return a.id.localeCompare(b.id);
            }
          } else {
            return 0;
          }
        })
        ;

      const groupedByPlan = sortedBoats.reduce((result: any, boat: any) => {
        const planCategory = boat.planSelected;
        result[planCategory] = result[planCategory] || [];
        result[planCategory].push(boat);
        return result;
      }, {} as Record<string, BoatDataGlobal[]>);

      // const finalSortedBoats = Object.values(groupedByPlan).flat();
      const finalSortedBoats = Object.values(groupedByPlan).flat().reverse();
      setAllBoatByUser(finalSortedBoats as BoatDataGlobal[]);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'It is not possible to load boat details');
    }
  }

  async function handleBoatEnabledOrDisabled(boatId: string) {
    try {
      const boatToUpdate = allBoatByUser.find((boat) => boat.id === boatId);
      let statusBoat = '';

      if (boatToUpdate) {
        boatToUpdate.is_active = boatToUpdate.is_active === '1' ? '0' : '1';
        statusBoat = boatToUpdate.is_active;
      }

      const formData = new FormData();
      formData.append("boat_id", boatId);
      formData.append("is_active", statusBoat);

      const response = await api.post('/change_status_boat.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toastApiResponse(response, response.data.message);
      setAllBoatByUser([...allBoatByUser]);

    } catch (error) {
      console.error('Error:', error);
      toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
    }
  }

  useEffect(() => {
    // Recupera o objeto JSON do localStorage
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo); // Atualiza o estado com o objeto do usuário
    }
  }, []);

  useEffect(() => {
    fetchUserLogged();
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.email !== null && userInfo.name !== null) {
      fetchAllBoatByUser();
    }
  }, [userInfo]);
  
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
                  Brokers and Clients Dashboard
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2}>
                  You are at {userInfo?.name} Dashboard!
                </Text>
              </Box>

              {/* <HStack justifyContent={'center'} alignItems={'center'} gap={2}>
                <Button bg='gray.50' w='auto' h={'80px'}>
                  <VStack pt={0}>
                    <Icon as={BsFillPlusSquareFill} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>
                      {isWideVersion ? 'Clients and Brokers' : 'Users'}
                    </Text>
                  </VStack>
                </Button>

                <Button bg='gray.50' w='auto' h={'80px'} onClick={handleClickManageProfile}>
                  <VStack pt={0}>
                    <Icon as={FaCircleUser} color={'blue.300'} h='28px' w='28px' />
                    <Text color={'blue.300'} fontSize={['2xs', 'xs', 'sm', 'md']}>
                      {isWideVersion ? 'Manage Profile' : 'Profile'}
                    </Text>
                  </VStack>
                </Button>
              </HStack> */}
            </HStack>

            <Divider />
          </SimpleGrid>

          <Card bg={bg} boxShadow={cardShadow} mb='20px' pt={3} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
            <Text color={textColorSecondary} fontSize='md' me='6px' mb='5px'>
              Analitics data
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
              Rike Registered Listings
            </Text>
            <SimpleGrid columns={columns} spacing={3}
              w="100%"
              maxWidth={1480}
              mx='auto'
              mt={5}
            >
              {allBoatByUser.map((boat, index) => (
                <CardBoat
                  key={index}
                  cardInfoItems={generateCardInfoItems(boat)}
                  id={boat.id}
                  is_active={boat.is_active}
                  titleButtonStatusPlan={boat.is_active === '1' ? 'Enable Ad' : 'Disable Ad'}
                  nameBoat={boat.nameBoat}
                  boatCategory={boat.boatType}
                  length={boat.length}
                  maker={boat.maker}
                  yearBoat={boat.yearBoat}
                  city={boat.city}
                  country={boat.country}
                  imageMainBoat={'https://techsoluctionscold.com.br/api-boats/uploads/boats_images/' + boat.images[0]}
                  priceOrRequest={boat.priceOrRequest}
                  price={boat.priceOrRequest === '1' ? 'Price on Request' : boat.price}
                  typeCoin={boat.typeCoin}
                  titleButton={boat.is_date_expired === false ? 'Edit Listing' : 'Delete Listing'}
                  onClick={() => (boat.is_date_expired === false ? handleClickEditBoats(boat.id) : openModalDeleteButton())}
                  showSecondButton
                  showThirdButton
                  titleButtonRenewPlan='Renew Plan'
                  // onClickRenewPlan={() => handleSelectPlan(boat.id)}
                  onClickRenewPlan={() => (isBroker == 0 ? handleSelectPlan(boat.id) : openModalDeleteButton())}
                  onClickStatusPlan={() => handleBoatEnabledOrDisabled(boat.id)}
                  onClickGoToMyBoat={() => handleClickGoCardBoatDetails(boat.id)}
                  buttonStatusColor={boat.is_active === '1' ? 'green.200' : 'red.200'}
                  titlePlan={boat.planSelected}
                  dateExpiratePlan={boat.days_to_expire}
                  finalDate={boat.final_date}
                  is_date_expired={boat.is_date_expired}
                  show_tooltip={!isBroker}
                />
              ))}

            </SimpleGrid>
          </Card>

          {/* <Card bg={bg} boxShadow={cardShadow} mb='20px' pb={5} px={3} maxWidth={1480} w="100%" mx='auto' borderRadius={10}>
              <PaginationContainer totalPages={100}/>
            </Card> */}

          {isModalOpen && (
            <ModalPlanList
              isOpen={isModalOpen}
              onClose={closeModal}
              boat_id={cardBoatID}
              recharge={fetchAllBoatByUser}
            />
          )}

          {isModalOpenDeleteButton && (
            <ModalDelete
              isOpen={isModalOpenDeleteButton}
              onClose={closeModalDeleteButton}
              onClick={handleDeleteBoatByID}
              // isLoading={isLoading}
              title={'Once you delete your boat, there is no going back. Please be certain.'}
            />
          )}

          <ToastContainer />
          <Footer />
        </Flex>
      ) : (
        null
      )}
    </>
  )
}