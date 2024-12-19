import React, { useEffect, useState} from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, 
  AccordionIcon, FormControl, FormLabel, Input, VStack, HStack, Box,
} from '@chakra-ui/react';
import TextEditor from './TextEditor';

export interface OtherInfo {
  hinNumber: string;
  bridgeClearance: string;
  designer: string;
  fuelCapacity: string;
  holding: string;
  freshWater: string;
  cruisingSpeed: string;
  loa: string;
  maxSpeed: string;
  beam: string;
  accommodations: string;
  mechanicalEquipment: string;
  navigationSystem: string;
  galleryEquipment: string;
  deckAndHull: string;
  additionalEquipment: string;
}

interface AccordionOtherInfoProps {
  dataOtherInfoToEdit?: OtherInfo[];
  otherInfo?: any
  setOtherInfo?: any
}

const AccordionOtherInfo: React.FC<AccordionOtherInfoProps> = (
  { otherInfo, setOtherInfo, dataOtherInfoToEdit }) => {

  const initialData = dataOtherInfoToEdit && dataOtherInfoToEdit.length > 0 ? dataOtherInfoToEdit[0] : {} as OtherInfo;

  const [contentAccomodation, setContentAccomodation] = useState(initialData.accommodations || '');
  const [contentNavigation, setContentNavigation] = useState(initialData.navigationSystem || '');
  const [contentGalley, setContentGalley] = useState(initialData.galleryEquipment || '');
  const [contentDeckAndHull, setContentDeckAndHull] = useState(initialData.deckAndHull || '');  
  const [contentMechanicalEquipment, setContentMechanicalEquipment] = useState(initialData.mechanicalEquipment || '');  
  const [contentAdditionalEquipment, setContentAdditionalEquipment] = useState(initialData.additionalEquipment || '');

  const handleContentChangeAccomodation = (newContentAccomodation: string) => {
    setContentAccomodation(newContentAccomodation);
    setOtherInfo((prevDetails: { [key: number]: OtherInfo }) => ({
      ...prevDetails,
      0: {
        ...prevDetails[0],
        accommodations: newContentAccomodation,
      },
    }));     
  };

  const handleContentChangeNavigation = (newContentNavigation: string) => {
    setContentNavigation(newContentNavigation);
    setOtherInfo((prevDetails: { [key: number]: OtherInfo }) => ({
      ...prevDetails,
      0: {
        ...prevDetails[0],
        navigationSystem: newContentNavigation,
      },
    })); 
  };

  const handleContentChangeGalley = (newContentGalley: string) => {
    setContentGalley(newContentGalley);
    setOtherInfo((prevDetails: { [key: number]: OtherInfo }) => ({
      ...prevDetails,
      0: {
        ...prevDetails[0],
        galleryEquipment: newContentGalley,
      },
    })); 
  };

  const handleContentDeckAndHull = (newContentDeckAndHull: any) => {
    setContentDeckAndHull(newContentDeckAndHull);
    setOtherInfo((prevDetails: { [key: number]: OtherInfo }) => ({
      ...prevDetails,
      0: {
        ...prevDetails[0],
        deckAndHull: newContentDeckAndHull,
      },
    })); 
  };

  const handleContentMechanicalEquipment = (newContentMechanicalEquipment: string) => {
    setContentMechanicalEquipment(newContentMechanicalEquipment);
    setOtherInfo((prevDetails: { [key: number]: OtherInfo }) => ({
      ...prevDetails,
      0: {
        ...prevDetails[0],
        mechanicalEquipment: newContentMechanicalEquipment,
      },
    })); 
  };

  const handleContentAdditionalEquipment = (newContentAdditionalEquipment: string) => {
    setContentAdditionalEquipment(newContentAdditionalEquipment);
    setOtherInfo((prevDetails: { [key: number]: OtherInfo }) => ({
      ...prevDetails,
      0: {
        ...prevDetails[0],
        additionalEquipment: newContentAdditionalEquipment,
      },
    }));
  };
  
  const handleInputChange = (index: number, fieldName: keyof OtherInfo, value: string) => {
    setOtherInfo((prevInfo: any) => [
      ...prevInfo.slice(0, index),
      { ...prevInfo[index], [fieldName]: value },
      ...prevInfo.slice(index + 1),
    ]);
  };

  useEffect(() => {
    if (dataOtherInfoToEdit) {
      setOtherInfo(dataOtherInfoToEdit);
    }
  }, []);

  useEffect(() => {
  //  console.log('accordiont 10:39', otherInfo)
  }, [otherInfo]);

  return (
    <Accordion allowMultiple w={'100%'} mt={5} >
      <AccordionItem>
        <h2>
          <AccordionButton>
            <HStack justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
              <FormLabel fontSize={'xl'} fontWeight={'bold'}>Other Information (Optional)</FormLabel>
            </HStack>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>

          {/* // Part 1 */}

          <VStack w={'100%'}>
            <FormControl mt={2}>
              <FormLabel>12 Digit HIN</FormLabel>
              <Input
                type="text"
                name='hinNumber'
                value={otherInfo[0].hinNumber}
                onChange={(e) => handleInputChange(0, 'hinNumber', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Bridge Clearance (feet)</FormLabel>
              <Input
                type="number"
                name='bridgeClearance'
                value={otherInfo[0].bridgeClearance}
                onChange={(e) => handleInputChange(0, 'bridgeClearance', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Designer</FormLabel>
              <Input
                type="text"
                name='designer'
                value={otherInfo[0].designer}
                onChange={(e) => handleInputChange(0, 'designer', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Fuel Capacity (US Gallons)</FormLabel>
              <Input
                type="number"
                name='fuelCapacity'
                value={otherInfo[0].fuelCapacity}
                onChange={(e) => handleInputChange(0, 'fuelCapacity', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Holding Tank (US Gallons)</FormLabel>
              <Input
                type="number"
                name='holding'
                value={otherInfo[0].holding}
                onChange={(e) => handleInputChange(0, 'holding', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Fresh Water (US Gallons)</FormLabel>
              <Input
                type="number"
                name='freshWater'
                value={otherInfo[0].freshWater}
                onChange={(e) => handleInputChange(0, 'freshWater', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Cruising Speed (knots)</FormLabel>
              <Input
                type="number"
                name='cruisingSpeed'
                value={otherInfo[0].cruisingSpeed}
                onChange={(e) => handleInputChange(0, 'cruisingSpeed', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>LOA (feet)</FormLabel>
              <Input
                type="number"
                name='loa'
                value={otherInfo[0].loa}
                onChange={(e) => handleInputChange(0, 'loa', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Max Speed (knots)</FormLabel>
              <Input
                type="number"
                name='maxSpeed'
                value={otherInfo[0].maxSpeed}
                onChange={(e) => handleInputChange(0, 'maxSpeed', e.target.value)}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Beam (feet)</FormLabel>
              <Input
                type="number"
                name='beam'
                value={otherInfo[0].beam}
                onChange={(e) => handleInputChange(0, 'beam', e.target.value)}
              />
            </FormControl>

            {/* Part 2 */}            

            <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
              <div>
                <FormLabel>Accommodations</FormLabel>
                <TextEditor
                  content={contentAccomodation}
                  setContent={handleContentChangeAccomodation}
                  placeholder="Typing your accommodations here..."
                />
              </div>
            </Box>

            <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
              <div>
                <FormLabel>Navigation System</FormLabel>
                <TextEditor
                  content={contentNavigation}
                  setContent={handleContentChangeNavigation}
                  placeholder="Typing your navigation system here..."
                />
              </div>
            </Box>
            
            <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
              <div>
                <FormLabel>Galley Equipment</FormLabel>
                <TextEditor
                  content={contentGalley}
                  setContent={handleContentChangeGalley}
                  placeholder="Typing your gallery equipment here..."
                />
              </div>
            </Box>            

            <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
              <div>
                <FormLabel>Deck and Hull Equipment</FormLabel>
                <TextEditor
                  content={contentDeckAndHull}
                  setContent={handleContentDeckAndHull}
                  placeholder="Typing your deck and hull here..."
                />
              </div>
            </Box>            

            <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
              <div>
                <FormLabel>Mechanical Equipment</FormLabel>
                <TextEditor
                  content={contentMechanicalEquipment}
                  setContent={handleContentMechanicalEquipment}
                  placeholder="Typing your mechanical equipment here..."
                />
              </div>
            </Box>           

            <Box w="100%" maxWidth={'100%'} h={'auto'} marginX="auto" mt={2}>
              <div>
                <FormLabel>Additional Equipment</FormLabel>
                <TextEditor
                  content={contentAdditionalEquipment}
                  setContent={handleContentAdditionalEquipment}
                  placeholder="Typing your additional equipment here..."
                />
              </div>
            </Box>

          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionOtherInfo;