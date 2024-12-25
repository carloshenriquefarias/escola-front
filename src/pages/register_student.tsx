// import {
//   Box, Center, Flex, Heading, VStack, Text, Divider, Button, Input, FormControl, FormLabel,
//   Stack, HStack, Icon, Card, CardBody, Checkbox, SimpleGrid, Select, useBreakpointValue,
//   Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator,
//   StepStatus, StepTitle, Stepper, useSteps, IconButton, Switch, CheckboxGroup, Progress
// } from '@chakra-ui/react';

// import { BsCreditCard } from "react-icons/bs";
// import { BsCreditCardFill } from "react-icons/bs";
// import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
// import { FaTrashCan } from "react-icons/fa6";
// import { FcOk } from "react-icons/fc";
// import { LuImagePlus } from "react-icons/lu";
// import { FaAsterisk } from "react-icons/fa";

// import { useAuth } from "../hooks/useAuth";
// import { useDropzone } from "react-dropzone";
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/ReactToastify.min.css";

// import AccordionEngine from '../components/AccordionEngine';
// import AccordionOtherInfo, { OtherInfo } from '../components/AccordionOtherInfo';
// import AllRights from '../components/AllRights'
// import ButtonType from '../components/ButtonType';
// import BoatForm from '../components/FormBasicInformation';
// import BoatSelector from '../components/BoatCategorySelector';
// // import Header from '../components/Header';
// import ModalMaxFiles from '../components/ModalMaxFiles';
// // import MultiSelectComponent from '../components/MultSelect';

// import { api } from '../services/api';
// import { plans } from '../mock/planList';
// import { toastApiResponse } from '../components/Toast';
// import { allCountries } from '../mock/allCountries';
// import TextEditor from '../components/TextEditor';
// import { IoIosBoat } from 'react-icons/io';
// import heic2any from "heic2any";

// interface CustomFile extends File {
//   preview: string;
// }

// export interface User {
//   id?: string;
//   name?: string;
//   email?: string;
//   phone_number?: string;
//   photo_filename?: string;
//   created_at?: string;
//   is_admin?: string;
//   admin?: null | string;
//   isBroker?: number;
//   Broker_name: string;
//   Broker_phone: string;
//   Broker_address: string;
//   Broker_email: string;
// }

// export default function RegisterBoatsBasic() {

//   // Global consts
//   const { user } = useAuth();
//   const user_id = user?.id;
//   const [isBroker, setIsBroker] = useState(0);

//   const steps = [
//     { id: '1', title: 'Step 1', description: isBroker == 0 ? 'Plans' : 'Broker' },
//     { id: '2', title: 'Step 2', description: 'Information' },
//     { id: '3', title: 'Step 3', description: 'Details' },
//     { id: '4', title: 'Step 4', description: 'Images' },
//     { id: '5', title: 'Step 5', description: 'My Data' },
//     { id: '6', title: 'Step 6', description: 'Checkout' },
//   ].filter(step => !(isBroker && step.id === '6'));

//   const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length });

//   const isWideVersion = useBreakpointValue({ base: false, lg: true });
//   const isLastStep = activeStep === steps.length - 1;
//   const navigate = useNavigate();
//   const textColorSecondary = "gray.400";

//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingButtonBack, setIsLoadingButtonBack] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const buttonsPayment = [
//     { id: "1", label: "Debit card", image: <BsCreditCard /> },
//     { id: "2", label: "Credit card", image: <BsCreditCardFill /> },
//   ];

//   //Data from PlanSelected - Step 0
//   const [planSelected, setPlanSelected] = useState<string | null>(null); 

//   //Data from FormBoatBasicInfo - Step 1
//   const [formBoatBasicInfo, setFormBoatBasicInfo] = useState({
//     nameBoat: "", yearBoat: "", maker: "", model: "",
//   });

//   //Data from formBoatDetails - Step 2
//   const [engines, setEngines] = useState([]);
//   const [otherInfo, setOtherInfo] = useState<OtherInfo[]>(
//     [
//       {
//         hinNumber: '',
//         bridgeClearance: '',
//         designer: '',
//         fuelCapacity: '',
//         holding: '',
//         freshWater: '',
//         cruisingSpeed: '',
//         loa: '',
//         maxSpeed: '',
//         beam: '',
//         accommodations: '',
//         mechanicalEquipment: '',
//         navigationSystem: '',
//         galleryEquipment: '',
//         deckAndHull: '',
//         additionalEquipment: '',
//       },
//     ]
//   );
//   const [content, setContent] = useState('');
//   const [formBoatDetails, setFormBoatDetails] = useState({
//     boatType: "", boatCondition: "",
//     hullMaterial: "", hullType: "", length: '', boatDescription: content,
//   });

//   //Data from formBoatDetails - Step 3
//   const [imagesBoat, setImagesBoat] = useState<CustomFile[]>([]);
//   const [typeCoin, setTypeCoin] = useState("");
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState("");
//   const [priceVisibility, setPriceVisibility] = useState('0');
//   const [formFeaturesBoat, setFormFeaturesBoat] = useState({
//     linkVideo: '', typeCoin, city, country, price: '',
//   });
//   const [isVideoEnabled, setIsVideoEnabled] = useState(false);
//   const [file, setFile] = useState<CustomFile | null>(null);
//   // console.log('File 09:22', file.lenght);

//   //Data from PersonalData - Step 4
//   const [userDataCurrent, setUserDataCurrent] = useState<User | null>(null);

//   const [formPersonalData, setFormPersonalData] = useState({
//     email: '', phone: '', fullName: '', address: '',
//   });

//   const fillFormWithData = () => {
//     if (userDataCurrent?.isBroker == 1) {
//       setFormPersonalData({
//         email: userDataCurrent.Broker_email || '',
//         phone: userDataCurrent.Broker_phone || '',
//         fullName: userDataCurrent.Broker_name || '',
//         address: userDataCurrent.Broker_address || '',
//       });
//     } else {
//       // Se `isBroker` for 0, não preenche o formulário
//       setFormPersonalData({
//         email: '',
//         phone: '',
//         fullName: '',
//         address: '',
//       });
//     }
//   };  

//   const fetchUserLogged = async () => {
//     setIsLoading(true);

//     try {
//       const response = await api.get(`/user/me.php?id=${user_id}`);
//       const userLogged = response.data;

//       setUserDataCurrent(userLogged);
//       setIsBroker(userLogged.isBroker);

//     } catch (error) {
//       console.error('Error:', error);
//       toastApiResponse(error, 'It is not possible to list this user! Please try again!');

//     } finally {
//       setIsLoading(false);
//     }
//   };

//   //Data from PaymentData - Step 5
//   const [paymentType, setPaymentType] = useState(null);
//   const [formPaymentData, setFormPaymentData] = useState({
//     cardNumber: '', expireDateCard: '', cvv: '', zipCode: '', paymentType: '',
//   });

//   const [uploadProgress, setUploadProgress] = useState({
//     total: imagesBoat.length,
//     uploaded: 0
//   });

//   // const openModal = () => {
//   //   setIsModalOpen(true);
//   // };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // const optionsMultSelect = [
//   //   { value: 'SuperBoat', label: 'Super Boat' },
//   //   { value: 'Yatchs', label: 'Yatchs' },
//   //   { value: 'WaterToys', label: 'Water Toys' },
//   //   { value: 'PWC', label: 'PWC' },
//   //   { value: 'MotorBoat', label: 'MotorBoat' },
//   // ]

//   //Data from PlanSelected - Step 0

//   const handlePlanSelected = (planId: string) => {
//     const selectedPlan = plans.find((plan) => plan.id === planId);

//     if (selectedPlan) {
//       const planName = selectedPlan.id;
//       setPlanSelected(planId);

//       console.log('Plano Selecionado:', planName);
//     }
//   };

//   function PlanButton({ plan, planSelected, handlePlanSelected }: {
//     plan: {
//       id: string;
//       name: string;
//       description: string;
//       item: string[];
//       price: string;
//       isOnSale?: boolean;
//       is_active?: boolean;
//       maxFiles: number;
//       video: number;
//       saleEndDate: string;
//     };
//     planSelected: string | null;
//     handlePlanSelected: (planId: string) => void;
//   }) {
//     const isSelected = planSelected === plan.id;

//     return (
//       <Card
//         id={plan.id}
//         maxW='lg'
//         height={'auto'}
//         borderWidth={isSelected ? "3px" : "1px"}
//         borderColor={isSelected ? "blue.300" : "gray.400"}
//         bg={isSelected ? "lightblue" : "white"}
//         w="100%"
//         colorScheme="teal"
//         variant="outline"
//         cursor={'pointer'}
//         onClick={() => handlePlanSelected(plan.id)}
//         transition="all 0.25s"
//         transitionTimingFunction="spring(1 100 10 10)"
//         _hover={{ transform: "translateY(-4px)", shadow: "xl", borderColor: "blue.300", bg: 'lightblue', borderWidth: "3px" }}
//       >
//         <CardBody>
//           <Box
//             bg={plan.isOnSale ? 'yellow.200' : 'blue.300'}
//             w='100%'
//             mb={3}
//             h='7vh'
//             display='flex'
//             alignItems='center'
//             justifyContent='center'
//             borderRadius={5}
//           >
//             {plan.isOnSale ? (
//               <Stack w='100%' gap={1} pb={3}>
//                 <Heading fontSize={["md", "lg"]} textAlign='center' color='blue.500' pt={3}>
//                   {plan.name}
//                 </Heading>

//                 <Text fontSize={["xs", "sm"]} textAlign='center' color='blue.500'>
//                   {/* {'This offer ends at '} {plan.saleEndDate} {'! Get now!'} */}
//                   No Credit Card Required
//                 </Text>
//               </Stack>
//             ) : (
//               <Heading fontSize={["md", "lg"]} textAlign='center' color='white'>
//                 {plan.name}
//               </Heading>
//             )}
//           </Box>

//           <Stack mt='6'>
//             <Stack w='100%'>
//               <Text fontSize={["xs", "sm"]}>{plan.description}</Text>
//             </Stack>
//             <Box w='100%' mb={3} h='5vh' display='flex' alignItems='center' justifyContent='center'>
//               <Heading fontSize={["xl", "2xl"]} textAlign='center' color={'blue.500'}>{plan.price}</Heading>
//             </Box>

//             <Divider />

//             <VStack p={6} spacing={4} alignItems="flex-start">
//               <Text fontSize="sm" fontWeight="semibold">WHAT'S INCLUDED</Text>
//               {plan.item.map((item, index) => (
//                 <HStack key={index} spacing={3}>
//                   <Icon as={FcOk} h={4} w={4} color="green.500" />
//                   <Text fontSize="sm" color="gray.500">
//                     {item}
//                   </Text>
//                 </HStack>
//               ))}
//             </VStack>
//           </Stack>
//         </CardBody>
//       </Card>
//     );
//   }

//   function PlanDetails({ plan }: { plan: { id: string; name: string; description: string; item: string[]; price: string } | null }) {
//     if (!plan) {
//       return (
//         <Box>Select one plan to see the details.</Box>
//       );
//     }

//     return (
//       <Card id={'1'} cursor="pointer" bg='gray.50' mt={5} w='100%'>
//         <CardBody>
//           <Heading size='md' textAlign='center' color={'blue.500'} mb={4}>SELECTED PLAN</Heading>
//           <Box bg='blue.300' w='100%' mb={3} h='5vh' display='flex' alignItems='center' justifyContent='center'>
//             <Heading size='md' textAlign='center' color={'white'}>{plan.name}</Heading>
//           </Box>

//           <Stack mt='6'>
//             <Text textAlign={'center'}>{plan.description}</Text>
//             <Box w='100%' mb={3} h='5vh' display='flex' alignItems='center' justifyContent='center'>
//               <Heading size='xl' textAlign='center' color={'blue.500'}>{plan.price}</Heading>
//             </Box>
//           </Stack>
//         </CardBody>
//       </Card>
//     );
//   }

//   //Data from FormBoatBasicInfo - Step 1

//   const handleInputChanges = (e: any) => {
//     const { name, value } = e.target;
//     if (name === 'yearBoat' && value.length > 4) {
//       return;
//     }
//     setFormBoatBasicInfo((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   //Data from formBoatDetails - Step 2

//   const handleSelectCategory = (category: string, buttonLabel: string) => {
//     setFormBoatDetails((prevFormBoatDetails) => ({
//       ...prevFormBoatDetails,
//       boatType: buttonLabel,
//       boatCategory: category,
//     }));
//   };

//   const handleSelectCondition = (event: any) => {
//     setFormBoatDetails({ ...formBoatDetails, boatCondition: event.target.value });
//   };

//   const handleHullMaterial = (event: any) => {
//     setFormBoatDetails({ ...formBoatDetails, hullMaterial: event.target.value });
//   };

//   const handleHullType = (event: any) => {
//     setFormBoatDetails({ ...formBoatDetails, hullType: event.target.value });
//   };

//   const handleInputChangeLength = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormBoatDetails((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   const handleContentChange = (newContent: any) => {
//     setContent(newContent);
//     setFormBoatDetails(prevDetails => ({
//       ...prevDetails,
//       boatDescription: newContent
//     }));
//   };

//   const handleValuesChange = (values: any) => {
//     setEngines(values);
//   };

//   // DAQUI PARA BAIXO COMECA A NOVA VERSAO:

//   // Helper to convert HEIC to PNG
//   const convertHeicToPng = async (file: File): Promise<string | null> => {
//     try {
//       const convertedBlob = await heic2any({ blob: file, toType: "image/png" });
//       if (Array.isArray(convertedBlob)) {
//         return URL.createObjectURL(convertedBlob[0]);
//       }
//       return URL.createObjectURL(convertedBlob);
//     } catch (error) {
//       console.error("Error converting HEIC file:", error);
//       return null;
//     }
//   };

//   // Validate and set main image
//   const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
//     maxFiles: 1,
//     accept: {
//       "image/jpeg": [".jpeg", ".jpg"],
//       "image/png": [".png"],
//       "image/heic": [".heic", ".HEIC"],
//     },
//     onDrop: async (acceptedFiles) => {
//       const imageFile = acceptedFiles[0];
//       if (!imageFile) return;

//       const isHeic = imageFile.type === "image/heic" || imageFile.name.toLowerCase().endsWith(".heic");
//       const preview = isHeic ? await convertHeicToPng(imageFile) : URL.createObjectURL(imageFile);

//       if (preview) {
//         if (imageFile.size > 5242880) {
//           toast.error("This photo is bigger than 5MB, so please select a small image!");
//           return;
//         }

//         setFile(Object.assign(imageFile, { preview }));
//       }
//     },
//   });

//   const removeImageBoatMain = () => {
//     if (file) {
//       URL.revokeObjectURL(file.preview);
//       setFile(null);
//     }
//   };

//   // Handle gallery images
//   const maxFilesAllowed = planSelected ? plans.find((plan) => plan.id === planSelected)?.maxFiles || 1000 : 1000;
//   // const { getRootProps, getInputProps } = useDropzone({
//   //   accept: {
//   //     "image/jpeg": [".jpeg", ".jpg"],
//   //     "image/png": [".png"],
//   //     "image/heic": [".heic", ".HEIC"],
//   //   },
//   //   onDrop: async (acceptedFiles, fileRejections) => {
//   //     const totalFiles = imagesBoat.length + acceptedFiles.length;

//   //     if (totalFiles > maxFilesAllowed) {
//   //       toast.error("Maximum file limit exceeded!");
//   //       return;
//   //     }

//   //     if (fileRejections.length > 0) {
//   //       toast.error("Error uploading files. Ensure the file format is correct with PNG, JPG, or HEIC.");
//   //       return;
//   //     }

//   //     const updatedFiles = await Promise.all(
//   //       acceptedFiles.map(async (file) => {
//   //         const isHeic = file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic");
//   //         const preview = isHeic ? await convertHeicToPng(file) : URL.createObjectURL(file);

//   //         return Object.assign(file, { preview });
//   //       })
//   //     );

//   //     setImagesBoat((prevFiles) => [...prevFiles, ...updatedFiles]);
//   //   },
//   // });

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "image/jpeg": [".jpeg", ".jpg"],
//       "image/png": [".png"],
//       "image/heic": [".heic", ".HEIC"],
//     },
//     onDrop: async (acceptedFiles, fileRejections) => {
//       const totalFiles = imagesBoat.length + acceptedFiles.length;
  
//       if (totalFiles > maxFilesAllowed) {
//         toast.error("Maximum file limit exceeded!");
//         return;
//       }
  
//       if (fileRejections.length > 0) {
//         toast.error("Error uploading files. Ensure the file format is correct with PNG, JPG, or HEIC.");
//         return;
//       }
  
//       await handlePreviewImages(acceptedFiles); // Chamar handlePreviewImages aqui
//     },
//   });
  
//   const handlePreviewImages = async (files: File[]) => {
//     const updatedFiles = await Promise.all(
//       files.map(async (file) => {
//         const isHeic = file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic");
//         const preview = isHeic ? await convertHeicToPng(file) : URL.createObjectURL(file);
  
//         return Object.assign(file, { preview: preview || "" });
//       })
//     );
  
//     setImagesBoat((prevFiles) => [...prevFiles, ...updatedFiles]);
//   };
  

//   const removeFile = (fileToRemove: CustomFile) => {
//     const updatedFiles = imagesBoat.filter((file) => file !== fileToRemove);
//     setImagesBoat(updatedFiles);
//   };

//   const Preview = imagesBoat.map((file) => (
//     <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
//       <IconButton
//         aria-label="Delete"
//         bg="red"
//         size="sm"
//         onClick={() => removeFile(file)}
//         position="absolute"
//         top={2}
//         right={2}
//         zIndex={1}
//       >
//         <Box color="white">
//           <FaTrashCan />
//         </Box>
//       </IconButton>

//       <Box position="relative">
//         {file.type.startsWith("image/") ? (
//           <img src={file.preview} alt={file.name} width="100%" height="100%" />
//         ) : (
//           <iframe src={file.preview} title={file.name} width="100%" height="300px" />
//         )}
//       </Box>
//     </Box>
//   ));

//   //Data from formBoatDetails - Step 3

//   // const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
//   //   maxFiles: 1,
//   //   accept: {
//   //     'image/jpeg': ['.jpeg', '.jpg'],
//   //     'image/png': ['.png']
//   //   },
//   //   onDrop: (acceptedFiles) => {
//   //     const imageFile = acceptedFiles[0];

//   //     if (!imageFile) return;

//   //     // Check for image dimensions
//   //     const image = new Image();
//   //     image.src = URL.createObjectURL(imageFile);
//   //     image.onload = () => {
//   //       // if (image.width > 1920 || image.height > 1080) {
//   //       //   toast.error('This photo is bigger than 1920 x 1080 pixels, so please select a small image!');
//   //       //   return;
//   //       // }

//   //       if (imageFile.size > 5242880) { // 5MB in bytes,
//   //         toast.error('This photo is bigger than 5MB, so please select a small image!');
//   //         return;
//   //       }

//   //       const updatedFile = Object.assign(imageFile, {
//   //         preview: URL.createObjectURL(imageFile),
//   //       });

//   //       setFile(updatedFile);
//   //     };
//   //   },
//   // });

//   // const removeImageBoatMain = () => {
//   //   URL.revokeObjectURL(file!.preview);
//   //   setFile(null);
//   // };

//   // const maxFilesAllowed = planSelected ? plans.find((plan) => plan.id === planSelected)?.maxFiles || 1000 : 1000;
//   // const { getRootProps, getInputProps } = useDropzone({
//   //   accept: {
//   //     "image/png": [".png", ".jpg"],
//   //     "text/html": [".html", ".htm"],
//   //   },
//   //   onDrop: (acceptedFiles, fileRejections) => {
//   //     const totalFiles = imagesBoat.length + acceptedFiles.length;

//   //     if (totalFiles > maxFilesAllowed) {
//   //       openModal();
//   //       return;
//   //     }

//   //     if (fileRejections.length > 0) {
//   //       toast.error(`Error uploading files. Please make sure the file format is correct with png or jpg.`);
//   //       return;
//   //     }

//   //     acceptedFiles.forEach((file) => {
//   //       const reader = new FileReader();
//   //       reader.onload = (event) => {
//   //         const result = event.target?.result;

//   //         if (result) {
//   //           const image = new Image();
//   //           image.src = result as string;

//   //           image.onload = () => {
//   //             if (image.width > 1920 || image.height > 1080) {
//   //               toast.error('This photo is bigger than 1920 x 1080 pixels, so please select a smaller image!');
//   //               return;
//   //             }

//   //             if (file.size > 5242880) { // 5MB in bytes
//   //               toast.error('This photo is bigger than 5MB, so please select a smaller image!');
//   //               return;
//   //             }

//   //             // Se a imagem passar pelas verificações, adicione-a ao estado
//   //             const updatedFile = Object.assign(file, {
//   //               preview: URL.createObjectURL(file),
//   //             });
//   //             setImagesBoat((prevFiles) => [...prevFiles, updatedFile]);
//   //           };
//   //         } else {
//   //           toast.error('Failed to load image. Please try again.');
//   //         }
//   //       };
//   //       reader.readAsDataURL(file);
//   //     });      
//   //   },
//   // });

//   // const removeFile = (fileToRemove: CustomFile) => {
//   //   const updatedFiles = imagesBoat.filter((file) => file !== fileToRemove);
//   //   setImagesBoat(updatedFiles);
//   // };

//   // const Preview = imagesBoat.map((file) => (
//   //   <Box key={file.name} borderWidth="1px" borderRadius="lg" p={1} m={2} position="relative">
//   //     <IconButton
//   //       aria-label="Excluir"
//   //       bg="red"
//   //       size="sm"
//   //       onClick={() => removeFile(file)}
//   //       position="absolute"
//   //       top={2}
//   //       right={2}
//   //       zIndex={1}
//   //     >
//   //       <Box color="white">
//   //         <FaTrashCan />
//   //       </Box>
//   //     </IconButton>

//   //     <Box position="relative">
//   //       {file.type.startsWith("image/") ? (
//   //         <img src={file.preview} alt={file.name} width="100%" height="100%" />
//   //       ) : (
//   //         <iframe src={file.preview} title={file.name} width="100%" height="300px" />
//   //       )}
//   //     </Box>
//   //   </Box>
//   // ));

//   // const formatValue = (value: string) => {
//   //   const numericValue = value.replace(/\D/g, "");    
//   //   if (numericValue === "") return "";
//   //   const formattedValue = new Intl.NumberFormat("pt-BR", {
//   //     minimumFractionDigits: 2,
//   //     maximumFractionDigits: 2,
//   //   }).format(Number(numericValue) / 100);
//   //   return formattedValue;
//   // };

//   const formatValue = (value: string) => {
//     const numericValue = value.replace(/\D/g, "");    
//     if (numericValue === "") return "";
//     const formattedValue = new Intl.NumberFormat("pt-BR", {
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(Number(numericValue));
//     return formattedValue;
//   };

//   const unformatValue = (value: string) => {
//     return value.replace(/\./g, "").replace(",", ".");
//   };

//   const handleInputChangeFeatures = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === 'price') {
//       const formattedValue = formatValue(value);
//       setFormFeaturesBoat(prev => ({
//         ...prev,
//         [name]: formattedValue
//       }));
//     } else {
//       setFormFeaturesBoat(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//   };

//   const handleSelectTypeCoin = (event: any) => {
//     setTypeCoin(event.target.value);
//     setFormFeaturesBoat({ ...formFeaturesBoat, typeCoin: event.target.value });
//   };

//   const handleSelectCity = (event: any) => {
//     setCity(event.target.value);
//     setFormFeaturesBoat({ ...formFeaturesBoat, city: event.target.value });
//   };

//   const handleSelectCountry = (event: any) => {
//     setCountry(event.target.value);
//     setFormFeaturesBoat({ ...formFeaturesBoat, country: event.target.value });
//   };

//   const handleVisibilityChange = (isChecked: boolean) => {
//     const newValue = isChecked ? '1' : '0';
//     setPriceVisibility(newValue);
//     setFormFeaturesBoat(prev => ({ ...prev, priceOrRequest: newValue }));
//   };

//   const toggleVideoInput = (event: any) => {
//     setIsVideoEnabled(event.target.checked);
//   };

//   //Data from PersonalData - Step 4

//   const handleInputChangePersonalData = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormPersonalData((prevForm) => ({
//       ...prevForm,
//       [name]: value,
//     }));
//   };

//   //Data from PaymentData - Step 5

//   const handleButtonPayment = (buttonId: any, label: any) => {
//     setPaymentType(buttonId);
//     setFormPaymentData({ ...formPaymentData, paymentType: label });
//   };

//   const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     let { value } = event.target;
//     value = value.replace(/\D/g, '');
//     value = value.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
//     setFormPaymentData(prev => ({
//       ...prev,
//       cardNumber: value
//     }));
//   };

//   const handleExpDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     let { value } = event.target;
//     value = value.replace(/\D/g, '');
//     value = value.slice(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2');
//     setFormPaymentData(prev => ({
//       ...prev,
//       expireDateCard: value
//     }));
//   };

//   const handleCVVChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     let { value } = event.target;
//     value = value.replace(/\D/g, '').slice(0, 3); // Apenas 3 dígitos
//     setFormPaymentData(prev => ({
//       ...prev,
//       cvv: value
//     }));
//   };

//   const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     let { value } = event.target;
//     value = value.replace(/\D/g, '').slice(0, 5);
//     setFormPaymentData(prev => ({
//       ...prev,
//       zipCode: value
//     }));
//   };

//   // All data from formBoat

//   const [allDataBoat, setAllDataBoat] = useState({
//     user_id,
//     planSelected,
//     ...formBoatDetails,
//     engines,
//     otherInfo,
//     ...formBoatBasicInfo,
//     // imagesBoat,
//     // imageMainBoat,
//     ...formFeaturesBoat,
//     ...formPersonalData,
//     ...formPaymentData,
//   });

//   async function handleNext() {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const { yearBoat, maker, model } = formBoatBasicInfo;
//     const { boatType, boatCondition, length, boatDescription } = formBoatDetails;
//     const { typeCoin, city, country, price } = formFeaturesBoat;
//     const { email, fullName } = formPersonalData;

//     if (activeStep === 0) {
//       if (isBroker == 1) {
//         setActiveStep(activeStep + 1);

//       } else {
//         if (planSelected === null) {
//           toastApiResponse(null, 'Please, select a plan!');

//         } else if (activeStep < steps.length - 1) {
//           setActiveStep(activeStep + 1);
//         } else {
//           toast.error('Please, fill all fields correctly!');
//         }
//       }

//     } else if (activeStep === 1) {
//       if (yearBoat.trim() === '' || maker.trim() === '' || model.trim() === '') {
//         let errorMessage = 'Please fill the following fields: ';
//         const fields = [];

//         if (yearBoat.trim() === '') {
//           fields.push('Year of Boat');
//         }
//         if (maker.trim() === '') {
//           fields.push('Maker');
//         }
//         if (model.trim() === '') {
//           fields.push('Model');
//         }

//         errorMessage += fields.join(', ');

//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else {
//         if (activeStep < steps.length - 1) {
//           setActiveStep(activeStep + 1);
//         }
//       }

//     } else if (activeStep === 2) {
//       if (length.trim() === '' || boatType === '' || boatDescription.trim() === '' || boatCondition === '') {
//         let errorMessage = 'Please fill the following fields: ';
//         const fields = [];

//         if (length.trim() === '') {
//           fields.push('Length of Boat');
//         }
//         if (boatType === '') {
//           fields.push('Boat Type');
//         }
//         if (boatDescription.trim() === '') {
//           fields.push('Boat Description');
//         }
//         if (boatCondition === '') {
//           fields.push('Boat Condition');
//         }

//         errorMessage += fields.join(', ');

//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else {
//         if (activeStep < steps.length - 1) {
//           setActiveStep(activeStep + 1);
//         }
//       }

//     } else if (activeStep === 3) {

//       const isValidPrice = (price: string) => {      
//         const normalizedPrice = price.replace(/[\.,]/g, '');  // Remove pontos e vírgulas do preço e considera apenas números inteiros
//         return /^\d+$/.test(normalizedPrice); // Verifica se é um número inteiro válido
//       };

//       if (!isValidPrice(price.trim()) || typeCoin === '' || city === '' || country === '' || !file ||  imagesBoat.length === 0) {
//         let errorMessage = 'Please fill the following fields correctly: ';
//         const fields = [];

//         if (!isValidPrice(price.trim())) {
//           fields.push('Price');
//         }

//         if (typeCoin === '') {
//           fields.push('Type of Coin');
//         }

//         if (city === '') {
//           fields.push('City');
//         }

//         if (country === '') {
//           fields.push('Country');
//         }

//         if (!file) {
//           fields.push('Main Image Boat');
//         }

//         if (imagesBoat.length === 0) {
//           fields.push('Boat Images');
//         }

//         errorMessage += fields.join(', ');

//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else {
//         if (activeStep < steps.length - 1) {
//           setActiveStep(activeStep + 1);
//         }
//       }

//     } else if (activeStep === 4) {
//       if (email.trim() === '' || fullName.trim() === '' || !/^\S+@\S+\.\S+$/.test(email)) {
//         let errorMessage = 'Please fill the following fields correctly: ';
//         const fields = [];

//         if (email.trim() === '') {
//           fields.push('Email');
//         } else if (!/^\S+@\S+\.\S+$/.test(email)) {
//           fields.push('Valid Email Address');
//         }
//         if (fullName.trim() === '') {
//           fields.push('Full Name');
//         }

//         errorMessage += fields.join(', ');

//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else {
//         if (activeStep < steps.length - 1) {
//           setActiveStep(activeStep + 1);
//         }
//       }
//     }

//     setIsLoading(false);
//   }

//   async function handleBack() {
//     setIsLoadingButtonBack(true)
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     if (activeStep > 0) {
//       setActiveStep(activeStep - 1);
//     }
//     setIsLoadingButtonBack(false)
//   };

//   async function handleSelectPlan() {
//     if (activeStep > 2) {
//       setActiveStep(activeStep - 3);
//     }
//   };

//   function handleGoDashboard() {
//     navigate('/dashboard');
//   }

//   async function handleSaveData() {
//     setIsLoading(true);
//     const { cardNumber, expireDateCard, cvv, paymentType } = formPaymentData;
//     const imageMainBoat = file

//     let newAllDataBoat = allDataBoat;
//     newAllDataBoat.price = unformatValue(newAllDataBoat.price);

//     // console.log('newAllDataBoat 16:12', newAllDataBoat);
//     // setIsLoading(false);
//     // return

//     if (planSelected === '6') { // The free plan has id 6
//       try {

//         if (imageMainBoat) {

//           const responseBoats = await api.post('/register_boats.php', newAllDataBoat);
//           const idBoat = responseBoats.data.id;

//           const formImage = new FormData();
//           formImage.append("id_boat", idBoat);
//           const imageFile = new File([imageMainBoat], 'image_main_boat.jpg', { type: (imageMainBoat as any).type });
//           formImage.append('imageMainBoat', imageFile);

//           const responseMainImage = await api.post('/register_boats_images.php', formImage, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });

//           if (!responseMainImage?.data) {
//             throw new Error('Failed to upload main boat image');
//           }

//           if (imagesBoat && imagesBoat.length > 0) {
//             for (const [index, file] of imagesBoat.entries()) {
//               const formImages = new FormData();
//               formImages.append("id_boat", idBoat);
//               const imageFile = new File([file as Blob], `image_${index}.jpg`, { type: file.type });
//               formImages.append("files[]", imageFile);

//               const responseImages = await api.post('/register_boats_images.php', formImages, {
//                 headers: {
//                   'Content-Type': 'multipart/form-data',
//                 },
//               });

//               if (!responseImages?.data) {
//                 throw new Error(`Failed to upload image ${index + 1}`);
//               }

//               setUploadProgress(prevProgress => ({
//                 ...prevProgress,
//                 uploaded: prevProgress.uploaded + 1
//               }));
//             }

//             await new Promise((resolve) => setTimeout(resolve, 2000));
//             toastApiResponse(null, 'Your free access is available now! Enjoy Boats on the market');
//           }

//           setIsLoading(false);
//           await new Promise((resolve) => setTimeout(resolve, 2000));
//           toastApiResponse(null, 'Your free access is available now! Enjoy Boats on the market');
//           handleGoDashboard();

//         } else {
//           throw new Error('Sorry, occurred while uploading your image! Please contact the support');
//         }

//       } catch (error) {
//         console.error('Error:', error);
//         toastApiResponse(error, 'An error occurred while connecting to the server, please try again later');
//         setIsLoading(false);
//         navigate(`/registerBoatBasic`);
//       }

//     } else {
//       if (
//         paymentType.trim() !== '' &&
//         cardNumber.trim() !== '' &&
//         expireDateCard.trim() !== '' &&
//         cvv.trim() !== ''
//         // zipCode.trim() !== ''
//       ) {
//         try {
//           const responseBoats = await api.post('/register_boats.php', allDataBoat);
//           const idBoat = responseBoats.data.id;

//           const formImage = new FormData();
//           formImage.append("id_boat", idBoat);

//           imagesBoat.forEach((file, index) => {
//             const imageFile = new File([file as Blob], `image_${index}.jpg`, { type: file.type });
//             formImage.append("files[]", imageFile);
//           });

//           if (imageMainBoat) {
//             const imageFile = new File([imageMainBoat], 'image_main_boat.jpg', { type: (imageMainBoat as any).type });
//             formImage.append('imageMainBoat', imageFile);
//           }

//           const responseImages = await api.post('/register_boats_images.php', formImage, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });

//           if (responseImages?.data) {
//             toastApiResponse(null, 'Your payment was successfull! Wellcome to boats on the market');
//           }

//           await new Promise((resolve) => setTimeout(resolve, 2000));
//           setIsLoading(false);
//           handleGoDashboard();

//         } catch (error) {
//           console.error('Error:', error);
//           toastApiResponse(error, 'Have ocorred an error to conect to servidor, please try again later');
//           await new Promise((resolve) => setTimeout(resolve, 3000));
//           navigate(`/registerBoatBasic`);
//         }
//       } else {
//         let errorMessage = 'Please fill the following fields correctly: ';
//         const fields = [];

//         if (paymentType === '') {
//           fields.push('Payment Type');
//         }
//         if (cardNumber === '') {
//           fields.push('Card Number');
//         }
//         if (expireDateCard === '') {
//           fields.push('Expiration Date (MM/YY format)');
//         }
//         if (cvv === '') {
//           fields.push('CVV');
//         }

//         setIsLoading(false);

//         errorMessage += fields.join(', ');

//         toast.error(errorMessage, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     }
//   }

//   // useEffect para buscar dados do usuário ao montar o componente
//   useEffect(() => {
//     fetchUserLogged();
//   }, []);

//   useEffect(() => {
//     if (userDataCurrent) {
//       fillFormWithData();
//     }
//   }, [userDataCurrent]);


//   // useEffect para preencher o formulário quando `userDataCurrent` mudar
//   // useEffect(() => {
//   //   if (userDataCurrent) {
//   //     fillFormWithData();
//   //   }
//   // }, [userDataCurrent]);

//   //Aqui selecionamos automaticamente o plano sem clicar

//   useEffect(() => {
//     const activePlan = plans.find((plan) => plan.is_active === true);
//     if (activePlan) {
//       setPlanSelected(activePlan.id);
//     }
//   }, [plans]); // Executa quando os planos são carregados

//   useEffect(() => {
//     setAllDataBoat({
//       user_id,
//       planSelected,
//       ...formBoatDetails,
//       engines,
//       otherInfo,
//       ...formBoatBasicInfo,
//       // imagesBoat,
//       // imageMainBoat,
//       ...formFeaturesBoat,
//       ...formPersonalData,
//       ...formPaymentData,
//     });
//   }, [user_id, formBoatDetails, formBoatBasicInfo, // imagesBoat, imageMainBoat, 
//     engines, otherInfo, planSelected, formFeaturesBoat, formPersonalData, formPaymentData]
//   );

//   return (
//     <>
//       {user?.id ? (
//         <>
//           <Flex direction="column" height="100%" bg="white" justifyContent='center' alignItems='center'>
//             {/* <Header /> */}

//             {isWideVersion && (
//               <Box w='100%' mt={10} px={'10rem'} fontSize={['xs', 'sm', 'md']}>
//                 <Stepper size={['md']} index={activeStep} >
//                   {steps.map((step, index) => (
//                     <Step key={index} onClick={() => setActiveStep(index)}>
//                       <StepIndicator>
//                         <StepStatus
//                           complete={<StepIcon />}
//                           incomplete={<StepNumber />}
//                           active={<StepNumber />}
//                         />
//                       </StepIndicator>

//                       <Box flexShrink='0' fontSize={['xs', 'sm', 'md']}>
//                         <StepTitle>{step.title}</StepTitle>
//                         <StepDescription>{step.description}</StepDescription>
//                       </Box>

//                       <StepSeparator />
//                     </Step>
//                   ))}
//                 </Stepper>
//               </Box>
//             )}

//             <Center bg="white" w="100%" maxWidth={1080} mt={5} mb={5} px={2}>
//               <VStack w='100%'>
//                 <Stack w='100%' mt={10}>
//                   <form>
//                     {activeStep === 0 && (
//                       <VStack spacing={2} w='100%' mx='auto'>

//                         {isBroker == 1 ?
//                           <>
//                             <Heading color={textColorSecondary}>Step 1</Heading>                            
//                             <VStack mt={3} alignItems="center" justifyContent={'center'} w={'50%'} bg={'lightcyan'} padding={2} borderRadius={10}>
//                               <Heading mt={3} color={'gray.600'}>Let’s Get Started!</Heading>
//                               <Heading size={'md'} mt={3}>{userDataCurrent?.Broker_name}</Heading>
//                               <Heading size={'md'} mt={3} lineHeight="1.6" textAlign={'center'}> 
//                                 As a Broker you have unlimited listings, unlimited images, unlimited everything!
//                               </Heading>
//                               <Heading size={'md'}>
//                                 <FormLabel color={'gray.600'} fontWeight={'bold'} textAlign={'center'} padding={5} fontSize={'lg'} lineHeight="1.6">
//                                   As a small start-up aiming to enter the big leagues, we welcome any feedback on features and functionality.
//                                 </FormLabel>
//                               </Heading>
//                               <Heading size={'lg'}>
//                                 <FormLabel color={'gray.600'} fontWeight={'bold'} textAlign={'center'} padding={1} fontSize={'2xl'} lineHeight="1.6">
//                                   Now, let´s post your listing!
//                                 </FormLabel>
//                               </Heading>
//                             </VStack>
//                           </>
//                           :
//                           <>                          
//                             <Heading color={textColorSecondary}>Step 1</Heading>

//                             <Heading>Select the best plan for you</Heading>

//                             <Text color={textColorSecondary} fontSize={['xs', 'sm', 'md']} me='26px'>
//                               Pick a plan that best match the performance for your listing
//                             </Text>

//                             <Divider my={5} w={'50%'} />

//                             <VStack alignItems="center" justifyContent={'center'} w={'50%'} bg={'lightcyan'} padding={2} borderRadius={10}>
//                               <FormControl display="flex" alignItems="center" mt={0} justifyContent={'center'}>
//                                 <FormLabel htmlFor="video-switch" mb="0" fontWeight={'bold'} textAlign={'center'}>
//                                   Select the free plan below and click Next
//                                 </FormLabel>
//                               </FormControl>
//                             </VStack>

//                             <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5} mt={3}>
//                               {plans.filter((plan: any) => plan.is_active === true)
//                                 .map((plan, index) => (
//                                   <PlanButton
//                                     key={index}
//                                     plan={plan}
//                                     planSelected={planSelected}
//                                     handlePlanSelected={handlePlanSelected}
//                                   />
//                                 ))
//                               }
//                             </SimpleGrid>
//                           </>
//                         }
//                       </VStack>
//                     )}

//                     {activeStep === 1 && (
//                       <VStack spacing={2} w={isWideVersion ? '60%' : '100%'} mx='auto'>
//                         <Heading color={textColorSecondary}>Step 2</Heading>
//                         <BoatForm formData={formBoatBasicInfo} handleInputChange={handleInputChanges} />
//                       </VStack>
//                     )}

//                     {activeStep === 2 && (
//                       <VStack spacing={2} w={isWideVersion ? '60%' : '100%'} mx='auto'>
//                         <Heading color={textColorSecondary}>Step 3</Heading>

//                         <Heading>It's all in the details</Heading>

//                         <Text color={textColorSecondary} fontSize='md' me='26px'>
//                           Fill out this information to expose your listing to more potential buyers as they search.
//                         </Text>

//                         <Divider my={5} />

//                         <Heading size='md' mt={2}>Main details</Heading>

//                         <VStack w={isWideVersion ? '80%' : '100%'} mt={0} px={2}>
//                           <VStack w='100%'>
//                             <BoatSelector onSelectCategory={handleSelectCategory} />

//                             {/* <FormControl>
//                               <FormLabel color={'red.400'}>Sub category (PERGUNTAR AO ALAN SOBRE ISSO)</FormLabel>
//                               <MultiSelectComponent options={optionsMultSelect} />
//                             </FormControl> */}

//                             <FormControl>
//                               <FormLabel>Condition <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
//                               <Select id="category" value={formBoatDetails.boatCondition} onChange={handleSelectCondition}>
//                                 <option value=''></option>
//                                 <option value='New'>New</option>
//                                 <option value='New available'>New - Available for Order</option>
//                                 <option value='Used'>Used</option>
//                                 <option value='Insurance salvage'>Insurance Salvage</option>
//                                 <option value='Ex-Charter'>Ex-Charter</option>
//                               </Select>
//                             </FormControl>

//                             <FormControl>
//                               <FormLabel>{formBoatDetails.boatType === 'Water toys' ? 'Material' : 'Hull Material'}</FormLabel>
//                               <Select id='hullMaterial' value={formBoatDetails.hullMaterial} onChange={handleHullMaterial}>
//                                 <option value=''></option>
//                                 <option value='Composite'>Composite</option>
//                                 <option value='Aluminium'>Aluminium</option>
//                                 <option value='Fiberglass'>Fiberglass</option>
//                                 <option value='Carbon fiber'>Carbon Fiber</option>
//                                 <option value='PVC'>PVC</option>
//                                 <option value='Hypalon'>Hipalon</option>
//                                 <option value='Wood'>Wood</option>
//                                 <option value='Steel'>Steel</option>
//                                 <option value='Other'>Other</option>
//                               </Select>
//                             </FormControl>

//                             {formBoatDetails.boatType === 'Water toys' ? null :
//                               <FormControl>
//                                 <FormLabel>Hull Type</FormLabel>
//                                 <Select id='hullType' defaultValue='' value={formBoatDetails.hullType} onChange={handleHullType}>
//                                   <option id='0' value=''></option>
//                                   <option value='VShape'>V Shape</option>
//                                   <option value='Deep V'>Deep V</option>
//                                   <option value='Plaining'>Plaining</option>
//                                   <option value='Semi plaining'>Semi Plaining</option>
//                                   <option value='Displacement'>Displacement</option>
//                                   <option value='Semi displacement'>Semi Displacement</option>
//                                   <option value='Multi hull'>Multi Hull</option>
//                                   <option value='Round bottom'>Round Bottom</option>
//                                   <option value='Flat bottom'>Flat Bottom</option>
//                                   <option value='Bulbous bow'>Bulbous Bow</option>
//                                   <option value='Inverted bow'>Inverted Bow</option>
//                                   <option value='Other'>Other</option>
//                                 </Select>
//                               </FormControl>
//                             }

//                             <FormControl mt={2}>
//                               <FormLabel>Length (feet) <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
//                               <Input
//                                 type='number'
//                                 name='length'
//                                 value={formBoatDetails.length}
//                                 onChange={handleInputChangeLength}
//                               />
//                             </FormControl>

//                             <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
//                               <div>
//                                 <FormLabel>Description <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> </FormLabel>
//                                 <TextEditor
//                                   content={content}
//                                   setContent={handleContentChange}
//                                   placeholder="Type something amazing about your boat..."
//                                 />
//                               </div>
//                             </Box>

//                             <Heading size='sm' mt={5}>Optional details</Heading>

//                             <AccordionEngine onValuesChange={handleValuesChange} />

//                             {formBoatDetails.boatType === 'Water toys' ? null :
//                               <AccordionOtherInfo 
//                                 otherInfo={otherInfo}
//                                 setOtherInfo={setOtherInfo}
//                               />
//                             }

//                           </VStack>
//                         </VStack>
//                       </VStack>
//                     )}

//                     {activeStep === 3 && (
//                       <VStack spacing={2} w={isWideVersion ? '60%' : '95%'} mx='auto'>
//                         <Heading color={textColorSecondary}>Step 4</Heading>
//                         <Heading>Let's Showcase Your Listing</Heading>
//                         <Text mt={5} color={textColorSecondary} fontSize='md' me='26px' textAlign={'center'}>
//                           Great photos, your contact information, and a detailed description are key in increasing inquiries to your listing.
//                         </Text>

//                         <Divider mt={5} />

//                         <Heading size='md' my={3}>Price and Location</Heading>

//                         <VStack alignItems="flex-start" justifyContent={'flex-start'} w={'100%'} bg={'lightcyan'} padding={4} borderRadius={10}>
//                           <FormControl display="flex" alignItems="center" mt={2}>
//                             <FormLabel htmlFor="video-switch" mb="0" fontWeight={'bold'}>
//                               Fill in all the information marked in Red
//                             </FormLabel>
//                           </FormControl>

//                           <Box display="flex" alignItems="flex-start" justifyContent={'flex-start'}>
//                             <CheckboxGroup colorScheme="blue">
//                               <Stack spacing={2} display="flex" alignItems="flex-start" justifyContent={'flex-start'}>
//                                 <Checkbox
//                                   isChecked={priceVisibility === '1'}
//                                   onChange={(e) => handleVisibilityChange(e.target.checked)} // aqui, verificamos o estado do checkbox com e.target.checked
//                                 >
//                                   Price on Request
//                                 </Checkbox>
//                                 <Text mt={0} fontSize="sm">By checking this box, your price will be hidden on the description page</Text>
//                                 <Text mt={0} fontSize="sm">An estimated price of your boat still mandatory for ranking your ad on search results</Text>
//                               </Stack>
//                             </CheckboxGroup>
//                           </Box>
//                         </VStack>

//                         <HStack w='100%' mt={4} spacing={3}>
//                           <FormControl>
//                             <FormLabel>
//                               Price <Icon as={FaAsterisk} color="red.500" boxSize="10px" />
//                             </FormLabel>
//                             <Input
//                               name='price'
//                               value={formFeaturesBoat.price}
//                               onChange={handleInputChangeFeatures}
//                               onBlur={() => {
//                                 setFormFeaturesBoat(prev => ({
//                                   ...prev,
//                                   price: formatValue(prev.price)
//                                 }));
//                               }}
//                               onFocus={(e) => {
//                                 e.target.setSelectionRange(e.target.value.length, e.target.value.length);
//                               }}
//                             />
//                           </FormControl>

//                           <FormControl>
//                             <FormLabel>Currency <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
//                             <Select id="typecoin" defaultValue="" value={typeCoin} onChange={handleSelectTypeCoin}>
//                               <option id='0' value=''></option>
//                               <option id='2' value='DOLARS'>$ Dollar</option>
//                               <option id='3' value='EUROS'>€ Euro</option>
//                               <option id='4' value='POUNDS'> £ British Pounds</option>
//                             </Select>
//                           </FormControl>
//                         </HStack>

//                         <FormControl mt={2}>
//                           <FormLabel>City/Town <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
//                           <Input
//                             type='text'
//                             name='city'
//                             value={city}
//                             onChange={handleSelectCity}
//                             placeholder="Insert City | Insert On Request"
//                           />
//                         </FormControl>

//                         <FormControl>
//                           <FormLabel>Country <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
//                           <Select
//                             value={country}
//                             onChange={handleSelectCountry}
//                             placeholder="Select a Country | Select On Request"
//                           >
//                             {allCountries.map((country) => (
//                               <option key={country.id} value={country.name}>{country.name}</option>
//                             ))}
//                           </Select>
//                         </FormControl>

//                         {/* {planSelected === '6' ? null : ( */}
//                         <>
//                           <FormControl display="flex" alignItems="center" mt={2}>
//                             <FormLabel htmlFor="video-switch" mb="0">
//                               Do you have a video link for this listing?
//                             </FormLabel>
//                             <Switch id="video-switch" onChange={toggleVideoInput} isChecked={isVideoEnabled} />
//                           </FormControl>

//                           {isVideoEnabled && (
//                             <FormControl mt={4}>
//                               <FormLabel>Video Link/URL</FormLabel>
//                               <Input
//                                 type="text"
//                                 name="linkVideo"
//                                 placeholder='Paste here your link URL'
//                                 value={formFeaturesBoat.linkVideo}
//                                 onChange={handleInputChangeFeatures}
//                               />
//                             </FormControl>
//                           )}
//                         </>
//                         {/* )} */}

//                         <Divider mt={5} />

//                         {/* <Heading size='md' mt={5} textAlign={'left'}>Add Here Your Main Image</Heading>
//                         <Heading size='md' mt={5} textAlign={'left'} color={'red'}>Warning:</Heading>
//                         <Text mt={5} color={'gray.900'} fontSize='sm' textAlign={'center'}>
//                           Your main image must be on horizontal orientation position only. We recommend upload images with high resolution for a best performance! Minimum 640 x 480 | Maximum 5 MB.
//                         </Text> */}

//                         {/* <FormControl>
//                           <VStack spacing={4} mt={5}>
//                             <Box pb={5} w='100%'>
//                               <Center w='100%'>
//                                 <Box
//                                   {...getRootProps1({ className: "dropzone" })}
//                                   p={4}
//                                   borderWidth={2}
//                                   borderColor="blue.300"
//                                   borderStyle="dashed"
//                                   borderRadius="md"
//                                   textAlign="center"
//                                   w='100%'
//                                   cursor={'pointer'}
//                                 >
//                                   <input {...getInputProps1()} />
//                                   <Icon as={IoIosBoat} fontSize="5xl" color={'gray.300'} />
//                                   <Text> Add Here Your Main Image</Text>
//                                 </Box>
//                               </Center>

//                               {file && (
//                                 <Box mt={4} position="relative">
//                                   <img src={file.preview} alt="Preview" style={{ width: '100%', borderRadius: '10px' }} />
//                                   <IconButton
//                                     aria-label="Delete Image"
//                                     icon={<FaTrashCan />}
//                                     colorScheme="red"
//                                     position="absolute"
//                                     right="10px"
//                                     top="10px"
//                                     onClick={removeImageBoatMain}
//                                   />
//                                 </Box>
//                               )}
//                             </Box>
//                           </VStack>

//                           <Divider my={5} />

//                           <Heading size='md' mt={8} textAlign={'center'}>
//                             Select all images you want to show on your listing
//                           </Heading>

//                           <Text mt={5} color={'gray.900'} fontSize='sm' textAlign={'center'}>
//                             Your main image can be on horizontal or vertical orientation. We recommend upload images with high resolution for a best performance! Minimum 640 x 480 | Maximum 5 MB.
//                           </Text>

//                           <VStack spacing={4} mt={8}>
//                             <Center w='100%'>
//                               <Box
//                                 {...getRootProps({ className: "dropzone" })}
//                                 p={4}
//                                 borderWidth={2}
//                                 borderColor="blue.300"
//                                 borderStyle="dashed"
//                                 borderRadius="md"
//                                 textAlign="center"
//                                 w='100%'
//                                 cursor={'pointer'}
//                               >
//                                 <input {...getInputProps()} />
//                                 <Icon as={LuImagePlus} fontSize="5xl" color={'gray.300'} />
//                                 <Text> Add here all your images</Text>
//                               </Box>
//                             </Center>

//                             <Box w="100%">
//                               <Text fontSize="sm" mt={5} fontWeight="thin" textAlign={'center'}>
//                                 Images Preview
//                               </Text>
//                               <Box display="flex" flexWrap="wrap">
//                                 {Preview}
//                               </Box>
//                             </Box>
//                           </VStack>
//                         </FormControl> */}

//                         <FormControl>
//                           <Heading size="md" mt={5} textAlign="left">
//                             Add Here Your Main Image
//                           </Heading>
//                           <Heading size="md" mt={5} textAlign="left" color="red">
//                             Warning:
//                           </Heading>
//                           <Text mt={5} color="gray.900" fontSize="sm" textAlign="center">
//                             Your main image must be in horizontal orientation only. Minimum 640 x 480 | Maximum 5 MB.
//                           </Text>

//                           <VStack spacing={4} mt={5}>
//                             <Box pb={5} w="100%">
//                               <Center w="100%">
//                                 <Box
//                                   {...getRootProps1({ className: "dropzone" })}
//                                   p={4}
//                                   borderWidth={2}
//                                   borderColor="blue.300"
//                                   borderStyle="dashed"
//                                   borderRadius="md"
//                                   textAlign="center"
//                                   w="100%"
//                                   cursor="pointer"
//                                 >
//                                   <input {...getInputProps1()} />
//                                   <Icon as={IoIosBoat} fontSize="5xl" color="gray.300" />
//                                   <Text>Add Here Your Main Image</Text>
//                                 </Box>
//                               </Center>

//                               {file && (
//                                 <Box mt={4} position="relative">
//                                   <img src={file.preview} alt="Preview" style={{ width: "100%", borderRadius: "10px" }} />
//                                   <IconButton
//                                     aria-label="Delete Image"
//                                     icon={<FaTrashCan />}
//                                     colorScheme="red"
//                                     position="absolute"
//                                     right="10px"
//                                     top="10px"
//                                     onClick={removeImageBoatMain}
//                                   />
//                                 </Box>
//                               )}
//                             </Box>
//                           </VStack>

//                           <Divider my={5} />

//                           <Heading size="md" mt={8} textAlign="center">
//                             Select all images you want to show on your listing
//                           </Heading>

//                           <Text mt={5} color="gray.900" fontSize="sm" textAlign="center">
//                             Your images can be in horizontal or vertical orientation. Minimum 640 x 480 | Maximum 5 MB.
//                           </Text>

//                           <VStack spacing={4} mt={8}>
//                             <Center w="100%">
//                               <Box
//                                 {...getRootProps({ className: "dropzone" })}
//                                 p={4}
//                                 borderWidth={2}
//                                 borderColor="blue.300"
//                                 borderStyle="dashed"
//                                 borderRadius="md"
//                                 textAlign="center"
//                                 w="100%"
//                                 cursor="pointer"
//                               >
//                                 <input {...getInputProps()} />
//                                 <Icon as={LuImagePlus} fontSize="5xl" color="gray.300" />
//                                 <Text>Add here all your images</Text>
//                               </Box>
//                             </Center>

//                             <Box w="100%">
//                               <Text fontSize="sm" mt={5} fontWeight="thin" textAlign="center">
//                                 Images Preview
//                               </Text>
//                               <Box display="flex" flexWrap="wrap">
//                                 {Preview}
//                               </Box>
//                             </Box>
//                           </VStack>
//                         </FormControl>

//                         <Divider my={5} />

//                         {isModalOpen && (
//                           <ModalMaxFiles
//                             isOpen={isModalOpen}
//                             onClose={closeModal}
//                             selectPlan={handleSelectPlan}
//                             title={`Your plan selected allows ONLY ${maxFilesAllowed} FILES. So if you want to add more photos, CHANGE YOUR PLAN...`}
//                           />
//                         )}


//                       </VStack>
//                     )}

//                     {activeStep === 4 && (
//                       <VStack spacing={2} w={isWideVersion ? '60%' : '95%'} mx='auto'>
//                         <Heading color={textColorSecondary}>Step 5</Heading>
//                         <Heading>Let's connect you with the buyer.</Heading>
//                         <Text color={textColorSecondary} fontSize='md' me='26px'>
//                           Time to start getting noticed!
//                         </Text>
//                         <Divider my={2} />

//                         <FormControl mt={5}>
//                           <FormLabel w={'100%'}>
//                             Email  
//                             <Icon as={FaAsterisk} color="red.500" boxSize="10px" mx={2}/> 
//                             <Text color={textColorSecondary} fontSize='md' fontStyle="italic">
//                               Where you wish to be contacted regarding this listing!
//                             </Text>                            
//                           </FormLabel>
//                           <Input
//                             type='email'
//                             name='email'
//                             value={formPersonalData.email}
//                             onChange={handleInputChangePersonalData}
//                           />
//                         </FormControl>

//                         <FormControl mt={2}>
//                           <FormLabel>Contact Phone (Optional)</FormLabel>
//                           <Input
//                             type='text'
//                             name='phone'
//                             value={formPersonalData.phone}
//                             onChange={handleInputChangePersonalData}
//                           />
//                         </FormControl>

//                         <FormControl mt={2}>
//                           <FormLabel>
//                             {userDataCurrent?.isBroker == 1 ? 'Company Name ' : 'Full Name'}                             
//                             <Icon as={FaAsterisk} color="red.500" boxSize="10px" /> 
//                           </FormLabel>
//                           <Input
//                             type='text'
//                             name='fullName'
//                             value={formPersonalData.fullName}
//                             onChange={handleInputChangePersonalData}
//                           />
//                         </FormControl>

//                         <FormControl mt={2}>
//                           <FormLabel>Address (Optional)</FormLabel>
//                           <Input
//                             type='text'
//                             name='address'
//                             value={formPersonalData.address}
//                             onChange={handleInputChangePersonalData}
//                           />
//                         </FormControl>

//                         {uploadProgress.uploaded > 0 &&
//                           <Box mt={5} justifyContent={'center'} alignItems={'center'} w={'100%'}>
//                             <Heading fontSize={['md', 'lg']} color={textColorSecondary} mb={4} textAlign={'center'}>
//                               Uploaded {uploadProgress.uploaded}/{imagesBoat.length} images
//                             </Heading>

//                             <Progress
//                               size='lg'
//                               hasStripe
//                               value={(uploadProgress.uploaded / imagesBoat.length) * 100}
//                               colorScheme="blue"
//                               isAnimated
//                             />

//                             <Heading color={textColorSecondary} my={4} textAlign={'center'}>
//                               {((uploadProgress.uploaded / imagesBoat.length) * 100).toFixed(0)}%
//                             </Heading>
//                           </Box>
//                         }
//                       </VStack>
//                     )}

//                     {activeStep === 5 && (
//                       <VStack spacing={2} w={isWideVersion ? '60%' : '95%'} mx='auto'>
//                         <Heading color={textColorSecondary}>Step 6</Heading>
//                         <Heading>Let´s post your listing</Heading>
//                         <Text color={textColorSecondary} fontSize='md' me='26px'>
//                           {/* Insert your personal data to finish the payment process */}
//                           You are almost there
//                         </Text>
//                         <Divider my={3} />

//                         {planSelected === '6' ? null : (
//                           <>
//                             <FormControl>
//                               <FormLabel>Payment Type <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
//                               <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={3}>
//                                 {buttonsPayment.map((button) => (
//                                   <ButtonType
//                                     key={button.id}
//                                     id={button.id}
//                                     label={button.label}
//                                     image={button.image}
//                                     isSelected={paymentType === button.id}
//                                     onClick={() => handleButtonPayment(button.id, button.label)}
//                                   />
//                                 ))}
//                               </SimpleGrid>
//                             </FormControl>

//                             <FormControl mt={2}>
//                               <FormLabel>Cardholder Name <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
//                               <Input
//                                 type='text'
//                                 name='cardholderName'
//                               // value={formPaymentData.cardNumber}
//                               // onChange={handleCardNumberChange}
//                               />
//                             </FormControl>

//                             <FormControl mt={2}>
//                               <FormLabel>Card Number <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
//                               <Input
//                                 type='text'
//                                 name='cardNumber'
//                                 value={formPaymentData.cardNumber}
//                                 onChange={handleCardNumberChange}
//                               />
//                             </FormControl>

//                             <HStack w='100%' mt={2} spacing={3}>
//                               <FormControl>
//                                 <FormLabel>Expire Date <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
//                                 <Input
//                                   type='text'
//                                   name='expireDateCard'
//                                   value={formPaymentData.expireDateCard}
//                                   onChange={handleExpDateChange}
//                                 />
//                               </FormControl>

//                               <FormControl>
//                                 <FormLabel>CVV <Icon as={FaAsterisk} color="red.500" boxSize="10px" /></FormLabel>
//                                 <Input
//                                   type='text'
//                                   name='cvv'
//                                   value={formPaymentData.cvv}
//                                   onChange={handleCVVChange}
//                                 />
//                               </FormControl>
//                             </HStack>

//                             <FormControl>
//                               <FormLabel>Zip Code</FormLabel>
//                               <Input
//                                 type='text'
//                                 name='zipCode'
//                                 value={formPaymentData.zipCode}
//                                 onChange={handleZipChange}
//                               />
//                             </FormControl>

//                             <HStack mt={4} bg='gray.50' display='flex' spacing={5} justifyContent='center' w='100%' h='auto' px={4}>
//                               <Checkbox value='confirm' color={'gray.500'} fontSize={['2xs', 'xs', 'sm']} spacing={5}>
//                                 I confirm that I have the right to use the photographs in this listing and the information is complete and accurate to the best of my knowledge, that I am legally authorized to sell this boat, and that I have read and agreed to the For Sale by Owner Terms and Conditions.
//                               </Checkbox>
//                             </HStack>
//                           </>
//                         )}

//                         {uploadProgress.uploaded > 0 ? null :
//                           <PlanDetails plan={plans.find((plan) => plan.id === planSelected) || null} />
//                         }

//                         {uploadProgress.uploaded > 0 &&
//                           <Box mt={5} justifyContent={'center'} alignItems={'center'} w={'100%'}>
//                             <Heading fontSize={['md', 'lg']} color={textColorSecondary} mb={4} textAlign={'center'}>
//                               Uploaded {uploadProgress.uploaded}/{imagesBoat.length} images
//                             </Heading>

//                             <Progress
//                               size='lg'
//                               hasStripe
//                               value={(uploadProgress.uploaded / imagesBoat.length) * 100}
//                               colorScheme="blue"
//                               isAnimated
//                             />

//                             <Heading color={textColorSecondary} my={4} textAlign={'center'}>
//                               {((uploadProgress.uploaded / imagesBoat.length) * 100).toFixed(0)}%
//                             </Heading>
//                           </Box>
//                         }
//                       </VStack>
//                     )}
//                   </form>
//                 </Stack>

//                 <Box mt={4} display='flex' justifyContent='center' w={isWideVersion ? '50%' : '80%'} gap={2}>
//                   <Button isLoading={isLoadingButtonBack} onClick={handleBack} disabled={activeStep === 0} w={isWideVersion ? '30%' : '100%'} h='6vh'>
//                     <HStack>
//                       <Icon as={FaRegArrowAltCircleLeft} fontSize="2xl" />
//                       <Text fontSize={['sm', 'md']}>Back</Text>
//                     </HStack>
//                   </Button>

//                   <Button
//                     onClick={isLastStep ? handleSaveData : handleNext}
//                     bg={isLastStep ? 'yellow.200' : 'blue.300'}
//                     color={isLastStep ? 'blue.300' : 'white'}
//                     disabled={activeStep === steps.length - 1}
//                     isLoading={isLoading}
//                     _hover={{ bg: isLastStep ? 'yellow.300' : 'blue.400' }}
//                     w={isWideVersion ? '30%' : '100%'}
//                     h='6vh'
//                   >
//                     <HStack>
//                       <Text fontSize={['sm', 'md']}> {isLastStep ? 'Send' : 'Next'}</Text>
//                       <Icon as={FaRegArrowAltCircleRight} fontSize="2xl" />
//                     </HStack>

//                   </Button>
//                 </Box>                
//               </VStack>
//             </Center>

//             <Divider borderColor="gray.200" mb={5} mt={10} w='60%'></Divider>
//           </Flex>

//           <AllRights />
//           <ToastContainer />
//         </>
//       ) : (
//         null
//       )}
//     </>
//   )
// }









'use client'

import { useForm, Controller } from "react-hook-form"
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Radio,
  RadioGroup,
  Select,
  Text,
  Image,
  useToast,
  SimpleGrid,
  HStack,
  useColorModeValue,
  Center,
} from "@chakra-ui/react"
import { useState } from "react"
import Header from "../components/Header"
import Card from "../components/Card"

type FormData = {
  nome_aluno: string;
  data_nascimento: string;
  cpf_aluno: string;
  sexo: "M" | "F";
  nome_pai: string;
  nome_mae: string;
  telefone_responsavel: string;
  etnia: string;
  status: string;
  bolsa_familia: "0" | "1";
  status_transporte: "0" | "1";
  numero_matricula_rede: string;
  numero_inep: string;
  deficiencia: "0" | "1";
  etapa_ensino: string;
  turma: string;
  endereco: string;
  tipo_vinculo: string;
  sigla_concessionaria_energia: string;
  unidade_consumidora: string;
  turno: string;
  rota: string;
  foto?: FileList;
}

export default function RegisterStudent() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const toast = useToast();
  const bg = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue("0px 18px 40px rgba(112, 144, 176, 0.12)", "unset");

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      nome_aluno: "",
      data_nascimento: "",
      cpf_aluno: "",
      sexo: "F",
      nome_pai: "",
      nome_mae: "",
      telefone_responsavel: "",
      etnia: "",
      status: "",
      bolsa_familia: "0",
      status_transporte: "0",
      numero_matricula_rede: "",
      numero_inep: "",
      deficiencia: "0",
      etapa_ensino: "",
      turma: "",
      endereco: "",
      tipo_vinculo: "",
      sigla_concessionaria_energia: "",
      unidade_consumidora: "",
      turno: "",
      rota: "",
    },
  })

  // function onSubmit(data: FormData) {
  //   console.log(data)
  //   toast({
  //     title: "Formulário enviado",
  //     description: "Os dados do aluno foram cadastrados com sucesso.",
  //     status: "success",
  //     duration: 5000,
  //     isClosable: true,
  //   })
  // }

  async function onSubmit(data: FormData) {
    console.log(data);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Falha ao cadastrar aluno');
      }

      const result = await response.json();
      console.log('Resposta da API:', result);

      toast({
        title: "Formulário enviado",
        description: "Os dados do aluno foram cadastrados com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao cadastrar o aluno. Por favor, tente novamente.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Header>
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
              Registro de aluno
            </Text>

            <Text color={'gray.500'} fontSize="md" me="6px" mb="5px" mt={2}>
              Preencha as informações abaixo sobre o novo aluno(a)
            </Text>
          </Box>
        </HStack>
      </SimpleGrid>

      <Box as="form" onSubmit={handleSubmit(onSubmit)} maxWidth="1000px" margin="auto" mt={5} justifyContent={'flex-start'} my={10}>
        <VStack spacing={0} align="stretch">

          {/* Informações basicas */}
          <Card boxShadow={cardShadow} mb='5px' p={5} w="100%" borderRadius={10} bg={bg}>
            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="lg"
              textAlign="left"
            >
              Informações básicas
            </Text>

            <FormControl mt={3}>
              <FormLabel>Escolha uma foto</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e);
                  const file = e.target.files?.[0];
                  if (file) {
                    // control.setValue('foto', e.target.files as FileList);
                  }
                }}
              />
              {previewImage && (
                <Image src={previewImage} alt="Preview" maxWidth="200px" mt={5} borderRadius={10} />
              )}
            </FormControl>

            <Controller
              name="nome_aluno"
              control={control}
              rules={{ required: "Nome do aluno é obrigatório" }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.nome_aluno} my={5}>
                  <FormLabel>Nome do Aluno</FormLabel>
                  <Input {...field} placeholder="Nome do aluno" />
                  <Text color="red.500">{errors.nome_aluno?.message}</Text>
                </FormControl>
              )}
            />

            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2 }}
              spacing={3}
              w="100%"
              mx='auto'
              my={5}
              borderRadius={10}
            >
              <Controller
                name="cpf_aluno"
                control={control}
                rules={{
                  required: "CPF é obrigatório",
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: "CPF inválido. Use o formato: 000.000.000-00"
                  }
                }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.cpf_aluno}>
                    <FormLabel>CPF do Aluno</FormLabel>
                    <Input {...field} placeholder="000.000.000-00" />
                    <Text color="red.500">{errors.cpf_aluno?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="data_nascimento"
                control={control}
                rules={{ required: "Data de nascimento é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.data_nascimento}>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <Input {...field} type="date" />
                    <Text color="red.500">{errors.data_nascimento?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="endereco"
                control={control}
                rules={{ required: "O endereço é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.endereco}>
                    <FormLabel>Endereço</FormLabel>
                    <Input {...field} placeholder="Endereço" />
                    <Text color="red.500">{errors.endereco?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="turma"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Turma</FormLabel>
                    <Input {...field} placeholder="Turma" />
                  </FormControl>
                )}
              />

              <Controller
                name="turno"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Turno</FormLabel>
                    <Input {...field} placeholder="Turno" />
                  </FormControl>
                )}
              />

              <Controller
                name="rota"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Rota</FormLabel>
                    <Input {...field} placeholder="Rota" />
                  </FormControl>
                )}
              />
            </SimpleGrid>

            <Controller
              name="sexo"
              control={control}
              rules={{ required: "Sexo é obrigatório" }}
              render={({ field }) => (
                <FormControl as="fieldset" isInvalid={!!errors.sexo}>
                  <FormLabel as="legend">Sexo</FormLabel>
                  <RadioGroup {...field}>
                    <HStack spacing={2} align="start">
                      <Radio value="F">Feminino</Radio>
                      <Radio value="M">Masculino</Radio>
                    </HStack>
                  </RadioGroup>
                  <Text color="red.500">{errors.sexo?.message}</Text>
                </FormControl>
              )}
            />
          </Card>

          <Card boxShadow={cardShadow} mb='5px' p={5} w="100%" borderRadius={10} bg={bg} mt={5}>
            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="lg"
              textAlign="left"
            >
              Informações familiares
            </Text>

            <Controller
              name="nome_pai"
              control={control}
              rules={{ required: "Nome do pai é obrigatória" }}
              render={({ field }) => (
                <FormControl my={5}>
                  <FormLabel>Nome do Pai</FormLabel>
                  <Input {...field} placeholder="Nome do pai" />
                </FormControl>
              )}
            />

            <Controller
              name="nome_mae"
              control={control}
              render={({ field }) => (
                <FormControl my={5}>
                  <FormLabel>Nome da Mãe</FormLabel>
                  <Input {...field} placeholder="Nome da mãe" />
                </FormControl>
              )}
            />

            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2 }}
              spacing={3}
              w="100%"
              mx='auto'
              my={5}
              borderRadius={10}
            >
              <Controller
                name="telefone_responsavel"
                control={control}
                rules={{ required: "Telefone do responsável é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.telefone_responsavel}>
                    <FormLabel>Telefone do Responsável</FormLabel>
                    <Input {...field} placeholder="Telefone do responsável" />
                    <Text color="red.500">{errors.telefone_responsavel?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="bolsa_familia"
                control={control}
                rules={{ required: "Informação sobre Bolsa Família é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.bolsa_familia}>
                    <FormLabel>Bolsa Família</FormLabel>
                    <Select {...field} placeholder="Recebe Bolsa Família?">
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
                    </Select>
                    <Text color="red.500">{errors.bolsa_familia?.message}</Text>
                  </FormControl>
                )}
              />
            </SimpleGrid>
          </Card>

          <Card boxShadow={cardShadow} mb='5px' p={5} w="100%" borderRadius={10} bg={bg} mt={5}>
            <Text
              color={'blue.300'}
              fontWeight="semibold"
              fontSize="lg"
              textAlign="left"
            >
              Informações complementares e escolores
            </Text>

            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 2 }}
              spacing={3}
              w="100%"
              mx='auto'
              my={5}
              borderRadius={10}
              gap={5}
            >
              <Controller
                name="etnia"
                control={control}
                rules={{ required: "Etnia é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.etnia}>
                    <FormLabel>Etnia</FormLabel>
                    <Select {...field} placeholder="Selecione a etnia">
                      <option value="Branco">Branco</option>
                      <option value="Pardo">Pardo</option>
                      <option value="Preto">Preto</option>
                      <option value="Amarelo">Amarelo</option>
                      <option value="Indígena">Indígena</option>
                    </Select>
                    <Text color="red.500">{errors.etnia?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="deficiencia"
                control={control}
                rules={{ required: "Informação sobre deficiência é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.deficiencia}>
                    <FormLabel>Deficiência</FormLabel>
                    <Select {...field} placeholder="Possui deficiência?">
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
                    </Select>
                    <Text color="red.500">{errors.deficiencia?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="status"
                control={control}
                rules={{ required: "Status é obrigatório" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.status}>
                    <FormLabel>Status</FormLabel>
                    <Select {...field} placeholder="Selecione o status">
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </Select>
                    <Text color="red.500">{errors.status?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="status_transporte"
                control={control}
                rules={{ required: "Informação sobre transporte é obrigatória" }}
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.status_transporte}>
                    <FormLabel>Status do Transporte</FormLabel>
                    <Select {...field} placeholder="Utiliza transporte escolar?">
                      <option value="0">Não</option>
                      <option value="1">Sim</option>
                    </Select>
                    <Text color="red.500">{errors.status_transporte?.message}</Text>
                  </FormControl>
                )}
              />

              <Controller
                name="numero_matricula_rede"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Número de Matrícula na Rede</FormLabel>
                    <Input {...field} placeholder="Número de matrícula" />
                  </FormControl>
                )}
              />

              <Controller
                name="numero_inep"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Número INEP</FormLabel>
                    <Input {...field} placeholder="Número INEP" />
                  </FormControl>
                )}
              />

              <Controller
                name="etapa_ensino"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Etapa de Ensino</FormLabel>
                    <Input {...field} placeholder="Etapa de ensino" />
                  </FormControl>
                )}
              />

              <Controller
                name="tipo_vinculo"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Tipo de Vínculo</FormLabel>
                    <Input {...field} placeholder="Tipo de vínculo" />
                  </FormControl>
                )}
              />

              <Controller
                name="sigla_concessionaria_energia"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Sigla da Concessionária de Energia</FormLabel>
                    <Input {...field} placeholder="Sigla da concessionária" />
                  </FormControl>
                )}
              />

              <Controller
                name="unidade_consumidora"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Unidade Consumidora</FormLabel>
                    <Input {...field} placeholder="Unidade consumidora" />
                  </FormControl>
                )}
              />
            </SimpleGrid>
          </Card>

          <Center>
            <Button type="submit" colorScheme="blue" mt={5} width={'50%'} height={'3rem'}>
              Cadastrar Aluno
            </Button>
          </Center>
        </VStack>
      </Box>
    </Header>
  )
}

