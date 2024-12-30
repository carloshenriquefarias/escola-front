import {Route, BrowserRouter as Router, Routes, } from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import {theme} from './styles/theme'
import {AuthContextProvider} from './context/AuthContext'

import AboutUs from './pages/aboutUs'
import Dashboard from './pages/dashboard'
import EditProfile from './pages/editprofile'
import Home from './pages/home'
import Login from './pages/login'
import RegisterBoatsBasic from './pages/register_student'
import Admin from './pages/admin'
import Payments from './pages/payments'
import News from './pages/news'
import Ads from './pages/ads'
import Users from './pages/users'
import RegisterNews from './pages/registerNews'
import RegisterAds from './pages/registerAds'
import NewsEdit from './pages/newsEdit'
import AdsEdit from './pages/adsEdit'
import BoatNews from './pages/boatNews'
import AdsTerms from './pages/adsTerms'
import TermsOfUse from './pages/termsOfUse'
import ForgotMyPassword from './pages/forgotMyPassword'

import AllStudents from './pages/all_students'
import RegisterStudent from './pages/register_student'
import StudentDetails from './pages/student_details'
import StudentsDeleted from './pages/students_deleted'
import Class from './pages/class'
import AllClass from './pages/all_class'
import StudentEdit from './pages/student_edit'
import ClassDetails from './pages/class_details'


function App() {

  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <AuthContextProvider >
      <Router>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/editprofile'} element={<EditProfile/>} />
          <Route path={'/registerBoatBasic'} element={<RegisterBoatsBasic/>} />
          <Route path={'/dashboard'} element={<Dashboard/>} />         
          <Route path={'/login'} element={<Login/>} />
          <Route path={'/aboutUs'} element={<AboutUs/>} />
          <Route path={'/admin'} element={<Admin/>} />
          <Route path={'/payments'} element={<Payments/>} />
          <Route path={'/news'} element={<News/>} />
          <Route path={'/registerNews'} element={<RegisterNews/>} />
          <Route path={'/newsEdit/:id'} element={<NewsEdit/>} />
          <Route path={'/boatNews/:id'} element={<BoatNews/>} />
          <Route path={'/ads'} element={<Ads/>} />
          <Route path={'/users'} element={<Users/>} />
          <Route path={'/registerAds'} element={<RegisterAds/>} />
          <Route path={'/adsEdit/:id'} element={<AdsEdit/>} />
          <Route path={'/adsTerms'} element={<AdsTerms/>} />
          <Route path={'/termsOfUse'} element={<TermsOfUse/>} />
          <Route path={'/forgotMyPassword'} element={<ForgotMyPassword/>} />  

          <Route path={'/all_students'} element={<AllStudents/>} />  
          <Route path={'/all_class'} element={<AllClass/>} /> 
          <Route path={'/register_student'} element={<RegisterStudent/>} /> 
          <Route path={'/student_details/:id'} element={<StudentDetails/>} />
          <Route path={'/student_edit/:id'} element={<StudentEdit/>} />
          <Route path={'/class/:id'} element={<Class/>} />
          <Route path={'/all_users'} element={<Users/>} />
          <Route path={'/students_deleted'} element={<StudentsDeleted/>} />
          <Route path={'/class_details/:id'} element={<ClassDetails/>} />

                            
        </Routes>
      </Router>
      </AuthContextProvider>
    </ChakraProvider>    
  )
}

export default App
