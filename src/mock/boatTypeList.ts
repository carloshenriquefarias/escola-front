import { GiSailboat} from "react-icons/gi";
import { IoIosBoat } from "react-icons/io";
import { MdKayaking } from "react-icons/md";
import { GiCargoShip } from "react-icons/gi";
import { ImLifebuoy } from "react-icons/im";
import { GiShipWheel } from "react-icons/gi";

export const boatTypeList = [
  {
    id: '1',
    title: 'SUPER YACHTS',
    boatType: 'super yatch',
    fullName: 'Super Yacht',
    icon: GiShipWheel,
    subtitle: 'MEGA YACHTS',
    palavra1: 'CLASSIC YACHTS',
    palavra2: 'MOTOR SAILER',
    description: 'GIGA YACHTS',
    image: "./images/NewSuperYacht.jpg",
  },
  {
    id: '2',
    title: 'MOTOR',
    boatType: 'power',
    fullName: 'Motor Yacht',
    icon: IoIosBoat,
    subtitle: 'YACHTS',
    palavra1: 'SPORTS',
    palavra2: 'NARROW BOATS',
    description: 'BOATS',
    image: "./images/NewMotorYacht.jpg",
  },
  {
    id: '3',
    title: 'SAILING',
    boatType: 'sail',
    fullName: 'Sailing Yacht',
    icon: GiSailboat,
    subtitle: 'YACHTS',
    palavra1: 'DINGHY',
    palavra2: 'MULTI HULL',
    description: 'BOATS',
    image: "./images/NewSailingYacht.jpg",
  },
  {
    id: '4',
    title: 'PWC ',
    icon: MdKayaking,
    fullName: 'PWC',
    boatType: 'PWC',
    subtitle: 'PERSONAL WATER CRAFT',
    palavra1: 'SURFSKI',
    palavra2: 'JETSKI',
    description: 'WAVE RUNNER',
    image: "./images/NewPWC.jpg",
  },
  {
    id: '5',
    title: 'WATER TOYS',
    boatType: 'water toys',
    fullName: 'Water Toys',
    icon: ImLifebuoy,
    subtitle: 'INFLATABLES', 
    palavra1: 'SEABOBS',
    palavra2: 'KAYAKS',
    description: 'TOWABLES', 
    image: "./images/NewWaterToys.jpg",
  },
  {
    id: '6',
    title: 'COMMERCIAL',
    boatType: 'commercial',
    fullName: 'Commercial',
    icon: GiCargoShip,
    subtitle: 'FISHING', 
    palavra1: 'CRUISE', 
    palavra2: 'SHIPS',
    description: 'FERRY',
    image: "./images/NewCommercial.jpg",
  }
];
