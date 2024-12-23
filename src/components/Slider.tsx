import React from 'react';
import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
} from '@chakra-ui/react';

export default function SliderTooltip() {
  const [sliderValue, setSliderValue] = React.useState(5);
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Slider
        id='slider'
        defaultValue={5}
        min={0}
        max={100}
        colorScheme='orange'
        onChange={(v) => setSliderValue(v)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
    >
        <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
            25
        </SliderMark>
        <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
            50
        </SliderMark>
        <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
            75
        </SliderMark>
        <SliderTrack>
            <SliderFilledTrack />
        </SliderTrack>
        <Tooltip hasArrow bg='teal.500' color='white' placement='top' isOpen={showTooltip} label={`${sliderValue}`}>
            <SliderThumb />
        </Tooltip>
    </Slider>
  );
}


