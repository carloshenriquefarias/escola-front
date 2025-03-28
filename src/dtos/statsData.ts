import { PiStudentBold } from "react-icons/pi";
import { FaWheelchair } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { TbMoodBoy } from "react-icons/tb";
import { IoWomanSharp } from "react-icons/io5";
import { WiSunrise } from "react-icons/wi";
import { BsFillSunFill } from "react-icons/bs";
import { FaExchangeAlt } from "react-icons/fa";
import { FaChildReaching } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

export const statsData = (dashboardData: any) => [
  { bg: 'blue', icon: PiStudentBold, name: 'Total de alunos', value: dashboardData?.total_alunos ?? 0 },
  { bg: '', icon: AiFillLike, name: 'Alunos ativos', value: dashboardData?.total_ativos ?? 0 },
  { bg: '', icon: AiFillDislike, name: 'Alunos inativos', value: dashboardData?.total_inativos ?? 0 },
  { bg: 'blue', icon: FaWheelchair, name: 'Alunos Deficientes', value: dashboardData?.total_deficiencia ?? 0 },
  { bg: '', icon: MdFamilyRestroom, name: 'Bolsa família', value: dashboardData?.total_bolsa_familia ?? 0 },
  { bg: 'blue', icon: IoWomanSharp, name: 'Femininos', value: dashboardData?.total_feminino ?? 0 },
  { bg: 'white', icon: TbMoodBoy, name: 'Masculinos', value: dashboardData?.total_masculino ?? 0 },
  { bg: 'blue', icon: WiSunrise, name: 'Alunos matutinos', value: '55' },
  { bg: 'blue', icon: BsFillSunFill, name: 'Alunos vespertinos', value: dashboardData?.total_tarde ?? 0 },
  { bg: 'blue', icon: FaExchangeAlt, name: 'Alunos transferidos', value: '10' },
  { bg: 'blue', icon: FaChildReaching, name: 'Matriculados semana', value: '20' },
  { bg: 'blue', icon: FaUserGroup, name: 'Matriculados no mês', value: '18' },
];