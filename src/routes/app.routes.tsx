import { Route, Routes} from 'react-router-dom';

import Home from '../pages/home';
import CardBoatDetails from '../pages/class_details';
// import SignIn from '../pages/login';
import RegisterBoatBasic from '../pages/register_student';
import Dashboard from '../pages/dashboard';

export default function AppRoutes() {
  <Routes>
    <Route path={'/'} element={<Home/>} />
    <Route path={'/cardBoatDetails'} element={<CardBoatDetails/>} />
    <Route path={'/dashboard'} element={<Dashboard/>}/>
    <Route path={'/registerBoatBasic'} element={<RegisterBoatBasic/>} />
  </Routes>
};