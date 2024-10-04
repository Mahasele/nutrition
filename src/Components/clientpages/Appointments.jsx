
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Box,
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useState,useEffect } from "react"
import useAxiosIntercepters from "../../hooks/useAxiosIntercepters"
import useAuth from "../../hooks/use-auth"
import { services } from '../../utils/services';
import { axiosIntercepter } from '../../api/axios';
import TabPanel from '../minicomponents/TabPanel';
import Skeletons from '../minicomponents/Skeleton';
import dayjs from 'dayjs';



function Appointments() {
  const [editing, setEditing] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [user,setUser] = useState()
  const [userAppointments,setUserAppointments] = useState()
  const [error,setError] = useState()
  const [success,setSuccess] = useState()
  const [mode,setMode] = useState('')
  const [type,setType] = useState()
  const [service,setService] = useState()
  const [date,setDate] = useState('')
  const [time,setTime] = useState('')
  const {auth} = useAuth()
  const axios = useAxiosIntercepters()

  const handleEdit = () => {
    setEditing(!editing);
  };

  useEffect(()=>{
        let mounted = true;
        const controller = new AbortController()
        console.log('date',dayjs().daysInMonth())
        if(auth?.accessToken) {
            const getUser= async() => {
                try{
                    const res = await axios.get('/logged_user',{
                        signal:controller.signal,
                        withCredentials:true
                    })

                    mounted && setUser(res.data)
                    
                }catch(err) {
                    console.log(err)
                }
                
            }
            getUser()
        }
        return ()=>{
            mounted = false
            controller.abort()
        }
    },[])
  useEffect(()=>{
        let mounted = true;
        const controller = new AbortController()
        let intervalId
        if(auth?.accessToken) {
            const getAppointments= async() => {
                try{
                    const data = await axios.get('/user_appointments/'+user?.userId,{
                        signal:controller.signal,
                        withCredentials:true
                    })
                    setUserAppointments(data.data)
                    ///console.log(data.data)
                }catch(err) {
                    //console.log(err)
                }
                
            }
           // intervalId = setInterval(getAppointments,200)
           getAppointments()
        }
        return ()=>{
            mounted = false
            controller.abort()
            clearInterval(intervalId)
        }
    },[user])
  const handleSave = async() => {
    setError()
    try{

      const formattedTime = dayjs(date+'T'+time).add(2,'hours').format('HH:mm')
      const time12 = formattedTime.slice(0,2)
      const min = formattedTime.slice(formattedTime.lastIndexOf(':')+1)
      const formatDate =new Date(date).toDateString() 
      const now = dayjs(new Date()).add(2,'hours').format('HH:mm').slice(0,2)
      const hour = time12==='00' ? 24 :time12
      console.log('nowhour',hour)
      if (formatDate === (new Date().toDateString())) { 
        if (((Number(hour)-2)<9) && (Number(time.slice(0,2))<9)) {
          setError('It is too early, we open from 09:00 to 17:00')
      } else if (Number(hour)>=22 || (Number(time.slice(0,2))>=22)) {
        setError('We are closed, we open from 09:00 to 17:00')
      } else if ((Number(hour)-2)<Number(now)) {
        setError('you cannot pass passed time or less than 2 hours before the meeting')
      } else {
        const data = {type,service,date:formatDate,time,userId:user.userId,name:user.name,mode}
        const res =await  axiosIntercepter.post('/appointments',data)
        setSuccess(res.data)
      }
      } else {
        if (((Number(hour)-2)<9) && (Number(time.slice(0,2))<9)) {
          setError('It is too early, we open from 09:00 to 17:00')
      } else if (((Number(hour))>=22) || (Number(time.slice(0,2))>=22)) {
        setError('We are closed, we open from 09:00 to 17:00')
      } else{
        const data = {type,service,date:formatDate,time,userId:user.userId,name:user.name,mode}
        const res =await  axiosIntercepter.post('/appointments',data)
        setSuccess(res.data)
      }
      }
    }catch(err) {
        if (err.message==='Network Error') {
            setError('No Response From Server') 
        } else if(err?.response?.status===400 || err?.response?.status===409){
            setError(err?.response?.data) 
        }else{
            setError("Failed to create appointment")
        }
        console.log(err)
    }
    
  };

  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
 console.log(date)
  return (
    <>
    {user 
        ? 
        <Container maxWidth="lg" style={{ margin: '80px 0',padding:0 }}>
      <Paper style={{ padding: '0px' }}>
        <Grid container spacing={3}>

        <Grid item xs={12}>
            <Typography  variant="h4"my={3}>Your Appointments</Typography>
                <div style={{ padding: '0 10px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EventIcon />}
                    style={{ margin: '10px 0' }}
                    onClick={handleEdit}
                >
                    {editing ? 'Show Appointments List':'Schedule New Appointment'}
                    
                </Button>  
                </div>
                  
            {
                !editing 
                &&
                    <>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs variant='scrollable' value={tabValue} allowScrollButtonsMobile scrollButtons={'auto'} onChange={handleTabChange} aria-label="client info tabs">
                <Tab label="All" />
                <Tab label="Today" />
                <Tab label="Upcoming" />
                <Tab label="Previous" />
                
              </Tabs>
            </Box>
            <TabPanel tabValue={tabValue} userAppointments={userAppointments?.userAppointments} index={0}/>
            <TabPanel tabValue={tabValue} userAppointments={userAppointments?.userTodayAppointments} index={1}/>
            <TabPanel tabValue={tabValue} userAppointments={userAppointments?.userUpcomingAppointments} index={2}/>
            <TabPanel tabValue={tabValue} userAppointments={userAppointments?.userPreviousAppointments} index={3}/>
            
        </>
            } 
          </Grid> 
          {
            editing &&<Grid item xs={12} md={6}><div style={{ padding: '0 10px 20px ' }}>
            <Typography variant="h6">New Appointment</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Fullname"
              value={user?.name}
              disabled
            />
            
            <div className='goal'>
            <select name="goal" id="goal" defaultValue={0} onChange={(e)=> setType(e.target.value)}>
              <option value="">Appointment Type</option>
              {['Physical','Online'].map(type =>(<option value={type} key={type}>{type}</option>))}
            </select> 
            </div>
            {
              type==='Online' && <div className='goal'>
            <select name="goal" id="goal" defaultValue={0} onChange={(e)=> setMode(e.target.value)}>
              <option value="">Select Online platform</option>
              {['Zoom','Google meet','WhatsApp'].map(type =>(<option value={type} key={type}>{type}</option>))}
            </select> 
            </div>
            }
            
            <div className='goal'>
            <select name="goal" id="goal" defaultValue={0} onChange={(e)=> setService(e.target.value)}>
              <option value="">Select Appointment Service</option>
              {services.map(service =>(<option value={service.title} key={service.title}>{service.title}</option>))}
            </select> 
            </div>
            <TextField
              fullWidth
              type='date'
              margin="normal"
              label="Appointment Date"
              onChange={(e)=> setDate(e.target.value)}
              min={'2024-08-10'}
              inputProps={
                (Number(dayjs(new Date()).add(2,'hours').format('HH')) < 22) && (Number(dayjs(new Date()).add(2,'hours').format('HH').slice(0,1))>0) ?
                {
                  min:dayjs(new Date()).format('YYYY-MM-DD')
                }
                :
                {
                  min:dayjs(new Date()).add(1,'day').format('YYYY-MM-DD')
                }
              }
            />
            <TextField
              fullWidth
              type='time'
              margin="normal"
              label="Appointment time"
              onChange={(e)=> setTime(e.target.value)}
              min='09:00'
            />
            {error && <p className='error'>{error}</p>}
            {success && <p className='success'>{success.msg}</p>}
            
           
              <Button
              variant="contained"
              color="primary"
              onClick={ handleSave}
              style={{ marginTop: '10px' }}
              disabled={!type || !service || !date || !time}
            >
              submit
            </Button>      
            </div>
          </Grid>
          }
          
          
        </Grid>
      </Paper>
    </Container>
        :
        <Skeletons/>
    }
    </>
  );
    
    
}

export default Appointments;