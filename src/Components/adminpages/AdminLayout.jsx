
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { 
  Menu as MenuIcon,
  PersonAdd as PersonAddIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
  Person,
  Person2,Dashboard,PeopleAltSharp,CalendarMonth,
  ArrowDropDown,
  MedicalServices
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import useFetchData from '../../hooks/useFetchData';
import useLogout from '../../hooks/useLogout';
function AdminLayout() {
    const location = useLocation()
    const [menu,setMenu] = useState(null)
    const [side,setSide] = useState(false)
    const [colapse,setColapse] =useState(false)
    const [head,setHead] =useState('')
    const matches = useMediaQuery((useTheme().breakpoints.up('md')))
    const open = Boolean(menu)
    const logout = useLogout()
    const appointments = useFetchData('/appointments')
    const clients = useFetchData('/users')
    useEffect(()=>{
        switch (location.pathname) {
            case '/dash':
                setHead('Dashboard')
                break;
            case '/dash/appointments':
                setHead('Appointments')
                break;
            case '/dash/schedule':
                setHead('Schedule Appointments')
                break;
            case '/dash/clients':
                setHead('Clients')
                break;
            case '/dash/create_client':
                setHead('Create Clients')
                break;
            case '/dash/services':
                setHead('Services')
                break;
            default:
                setHead('Profile')
                break;
        }
    },[location.pathname])
    console.log(appointments)
  return (
    <>
    <AppBar position="fixed" sx={{
        maxWidth:'1280px',
        right:'50%',
        left:'50%',
        transform:"translate(-50%)"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              if (matches) {
                setColapse(!colapse)
              } else {
                setColapse(false)
                setSide(!side)
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {head}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className='pro'
            onClick={(e)=>setMenu(e.currentTarget)}
          >
            <Person sx={{fontSize:'36px'}}/><ArrowDropDown/>
          </IconButton>
          <Menu
          anchorEl={menu}
          open={open}
          anchorOrigin={{
            vertical:'bottom',
            horizontal:'left'
          }}
          onClose={()=>setMenu(false)}
          >
            <MenuItem><Link to={'profile'} className='menu-link'>Profile</Link></MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {
        (side || matches)
        &&
      <aside>
        <div className='side-bar'>
            < Link to={''} className={location.pathname==='/dash'?'content active-link':'content '}>
                <Dashboard sx={{color:'white'}}></Dashboard>
                 {!colapse && 'Dashboard'}
            </Link>
            <Link to={'appointments'} className={location.pathname==='/dash/appointments'?'content active-link':'content '}>
                <EventIcon sx={{color:'white'}}></EventIcon>
                {!colapse && 'Appointments'}
            </Link>
            <Link to={'schedule'} className={location.pathname==='/dash/schedule'?'content active-link':'content '}>
                <CalendarMonth sx={{color:'white'}}></CalendarMonth>
                {!colapse && 'Schedule Appointment'}
            </Link>
            <Link to={'clients'} className={location.pathname==='/dash/clients'?'content active-link':'content '}>
                <PeopleAltSharp sx={{color:'white'}}></PeopleAltSharp>
                {!colapse && 'Clients'}
            </Link>
            <Link to={'create_client'} className={location.pathname==='/dash/create_client'?'content active-link':'content '}>
                <PersonAddIcon sx={{color:'white'}}></PersonAddIcon>
                {!colapse && 'Create client'}
            </Link>
            <Link to={'services'} className={location.pathname==='/dash/services'?'content active-link':'content '}>
                <MedicalServices sx={{color:'white'}}></MedicalServices>
                {!colapse && 'Services'}
            </Link>
        </div>
      </aside>
      }
      <section className='main' style={matches ? colapse ? {paddingLeft: '69px',paddingRight:'15px'}:{paddingLeft: '231px',paddingRight:'15px'}:{paddingLeft:0}}>
        
        <Container style={{ margin: '20px 0 0 0',flex:1,padding:"15px 12px",width:'100%'}}>
            {
                location.pathname==='/dash'
                ?<>
                <Typography variant="h4" style={{margin:'0 0 20px 0'}}>Appointments</Typography>
        <Grid container spacing={3}>
            
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Today Appointments </Typography>
              <Typography variant="h4">{appointments?.data?.todayAppointments?.length || 0}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Pending Appointments</Typography>
              <Typography variant="h4">{appointments?.data?.upcomingAppointments?.length || 0}</Typography>
            </Paper>
          </Grid>  
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Approved Appointments</Typography>
              <Typography variant="h4">{appointments?.data?.approvedAppointments?.length || 0}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">All Appointments</Typography>
              <Typography variant="h4">{appointments?.data?.appointments?.length || 0}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Typography variant="h4" style={{margin:'20px 0'}}>Clients</Typography>
        <Grid container spacing={3}>
            
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Total clients</Typography>
              <Typography variant="h4">{clients?.data?.length || 0}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Recent Clients</Typography>
              <Typography variant="h4">5</Typography>
            </Paper>
          </Grid>  
          
        </Grid></>
                : <Outlet/>
            }
        
      </Container>
      </section>
      
    </>
  )
}

export default AdminLayout