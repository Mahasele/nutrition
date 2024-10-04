import {LoginForm }from './Components/publicpages/LoginForm';
import Register from './Components/publicpages/Register';
import { Routes,Route } from 'react-router-dom';
import './App.css'
import Dashboard from './Components/dashboard';
import Dash from './Components/adminpages/Dash';
import PersistAuth from './Components/auths/PersistAuth';
import ClientPage from './Components/clientpages/Client';
import HomePage from './Components/publicpages/Home';
import Profile from './Components/clientpages/Profile';
import Appointments from './Components/clientpages/Appointments';
import AdminLayout from './Components/adminpages/AdminLayout';
import AdminProfile from './Components/adminpages/AdminProfile';
import AdminClients from './Components/adminpages/AdminClients';
import Schedule from './Components/adminpages/Schedule';
import AdminServices from './Components/adminpages/AdminServices';
import ServicesPage from './Components/publicpages/Services';
import RequiredAuth from './Components/auths/RequiredAuth';
import NewClient from './Components/adminpages/NewClient';
import AboutPage from './Components/publicpages/About';


function App() {
  return (
    <Routes>
      // public routes
    <Route path='/' element={  <HomePage/>}/>
    <Route path='login' element={<LoginForm/>}/>
    <Route path='about' element={<AboutPage/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path='services' element={<ServicesPage/>}/>

    //protected routes
    <Route element={<PersistAuth/>}>
      <Route element={<RequiredAuth allowedAuth={[2020]}/>}>
        <Route path='dashboard' element={<ClientPage/>}>
          <Route path='profile' element={<Profile/>}/>
          <Route path='appointments' element={<Appointments/>}/>
        </Route>
      </Route>
      <Route element={<RequiredAuth allowedAuth={[2020]}/>}>
        <Route path='dash' element={<AdminLayout/>}>
          <Route path='appointments' element={<Dash/>}/>
          <Route path='profile' element={<AdminProfile/>}/>
          <Route path='clients' element={<AdminClients/>}/>
          <Route path='schedule' element={<Schedule/>}/>
          <Route path='services' element={<AdminServices/>}/>
          <Route path='create_client' element={<NewClient/>}/>
        </Route>
      </Route>
    </Route>
    
  </Routes>
  )
  

}

export default App;