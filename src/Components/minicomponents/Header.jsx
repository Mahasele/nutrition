import { AppBar, Button, Toolbar, Typography, useMediaQuery,List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider, 
  Box} from "@mui/material";
import {
  Menu as MenuIcon,PersonAdd,Home,MedicalServices,
  Login,
  FoodBank
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router";
import { useState } from "react";
import '../../styles/public.css'

function Header() {
    const route = useNavigate()
    const matches = useMediaQuery((useTheme().breakpoints.up('sm')))
    const [open, setOpen] = useState(false);


    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
    const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {[{title:'Home',path:'/',icon:<Home/>}, {title:'About',path:'/about',icon:<FoodBank/>},{title:'Services',path:'/services',icon:<MedicalServices/>}].map((text) => (
          <ListItem key={text.path} disablePadding>
            <ListItemButton onClick={()=>route(text.path)}>
              <ListItemIcon>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {[{title:'Register',path:'/register',icon:<PersonAdd/>},{title:'Login',path:'/login',icon:<Login/>}].map((text, index) => (
          <ListItem key={text.path} disablePadding>
            <ListItemButton onClick={()=>route(text.path)}>
              <ListItemIcon>
                 {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <AppBar position="static" py={0}>
            <Toolbar style={matches ? { justifyContent: 'space-around' }:{}}>
                {!matches && <MenuIcon style={{ marginRight: '20px' }} onClick={toggleDrawer(true)}/>}
            
            <Typography variant="h6" style={{ flexGrow: matches ? 0:1 }}>
                Mia's Nutrition Clinic Lesotho
            </Typography>
            {
            matches && <div>
            <Button onClick={()=>route('/')} color="inherit">Home</Button>
            <Button color="inherit" onClick={()=>route('/services')}>Services</Button>
                <Button onClick={()=>route('/about')} color="inherit">About</Button>
                <Button onClick={()=>route('/register')} color="inherit">Register</Button>
                <Button onClick={()=>route('/login')} color="inherit">Login</Button>
                
            </div>
            }
            {!matches && 
            <Drawer  open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
            }
            </Toolbar>
    </AppBar>    
  )
}

export default Header
