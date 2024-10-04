
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
} from '@mui/material';
import {
  CalendarMonthRounded,
  InboxRounded,
  Login,
  LoginOutlined,
  Logout,
  MailOutline,
  Menu as MenuIcon,
  Person,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router';
import { Link,useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/use-auth';
import  '../../styles/dashboard.css'

import { useState } from 'react'

function Client() {
    const matches = useMediaQuery((useTheme().breakpoints.up('sm')))
    const {setAuth} = useAuth()
    const location = useLocation()
    const [open, setOpen] = useState(false);


    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
    const handleLogout = async() =>{
        try{
            const res = await axios.get('/logout')
            setAuth(null)
        } catch(err) {
            console.log(err)
        }
    }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
    {[{title:'Profile',path:'profile'}, {title:'Appointments',path:'appointments'}].map((text, index) => (
          <ListItem key={text.title} disablePadding>
            <Link to={text.path} className={location.pathname==='/dashboard/'+text.path?'active':''} style={{width:'100%'}}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Person/> : <CalendarMonthRounded />}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {['Logout'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                 <Logout/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
    
  return (
    <section style={{ width: '100%',overflowX:"hidden" }}>
        <AppBar position="static" py={0}>
        <Toolbar style={matches ? { justifyContent: 'space-around',width:'100%',position:'relative' }:{}}>
            {!matches && <MenuIcon onClick={toggleDrawer(true)} style={{ marginRight: '20px' }} />}
            <Box py={1}>
              <img src="/src/assets/logo2.png" width={'70'} height={'70'} alt='Logo'/>
          <Typography variant="h4" style={{ flexGrow: matches ? 0:1 }}>
           
            Mia's Clinic
          </Typography> 
            </Box>
         
          {
          matches && 
          <div>
           <Link className={location.pathname==='/dashboard/profile'?'active':''} style={{color:'#000'}} to={'profile'}>Profile</Link>
           <Link className={location.pathname==='/dashboard/appointments'?'active':''} to={'appointments'}>Appointments</Link>
           <Button variant="contained"
            color="primary"
            size="large"  
            sx={{mx:3}}
            onClick={handleLogout}>Logout</Button>
          </div>
          }
          <Drawer  open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet/>
      </Container>
    </section>
  )
}

export default Client