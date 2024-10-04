
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
import dayjs from 'dayjs';

// Dummy data
const clientData = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
  age: 35,
  height: '5\'10"',
  weight: '180 lbs',
  goal: 'Weight loss',
  dietaryRestrictions: 'Lactose intolerant',
  nutritionPlan: 'Low-carb diet with focus on lean proteins and vegetables.',
  progress: [
    { date: '2024-07-01', weight: 185 },
    { date: '2024-07-15', weight: 182 },
    { date: '2024-08-01', weight: 180 },
  ],
  appointments: [
    { date: '2024-08-15', time: '10:00 AM' },
    { date: '2024-09-01', time: '2:00 PM' },
  ],
};

function Schedule() {
  const [editing, setEditing] = useState(false);
  const [client, setClient] = useState(clientData);
  const [tabValue, setTabValue] = useState(0);
  const [user,setUser] = useState()
  const [userAppointments,setUserAppointments] = useState()
  const [error,setError] = useState()
  const [type,setType] = useState()
  const [service,setService] = useState()
  const [date,setDate] = useState('2024-07-20')
  const [time,setTime] = useState('09:30')
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
        if(auth?.accessToken) {
            const getAppointments= async() => {
                try{
                    const data = await axios.get('/user_appointments/'+user?.userId,{
                        signal:controller.signal,
                        withCredentials:true
                    })
                    setUserAppointments(data.data)
                    console.log(data.data)
                }catch(err) {
                    console.log(err)
                }
                
            }
            getAppointments()
        }
        return ()=>{
            mounted = false
            controller.abort()
        }
    },[user])
 console.log(user)
  const handleSave = async() => {
    try{
        const formatDate =new Date(date).toDateString() 
    const data = {type,service,date:formatDate,time,userId:user.userId,name:user.name}
     const res =await  axiosIntercepter.post('/appointments',data)
     console.log(res.data)

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
    
    // Here you would typically send an API request to update the client data
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
 console.log(date)
  return (
    <>
    {user 
        ? 
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
            <div className='goal'>
            <select name="goal" id="goal" defaultValue={0} onChange={(e)=> setService(e.target.value)}>
              <option value="">Select Client</option>
              {services.map(service =>(<option value={service.title} key={service.title}>{service.title}</option>))}
            </select> 
            </div>
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="h6">New Appointment</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Fullname"
              value={user?.name}
              onChange={handleChange}
              disabled
            />
            
            <div className='goal'>
            <select name="goal" id="goal" defaultValue={0} onChange={(e)=> setType(e.target.value)}>
              <option value="">Appointment Type</option>
              {['Physical','Online'].map(type =>(<option value={type} key={type}>{type}</option>))}
            </select> 
            </div>
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
              value={date}
              onChange={(e)=> setDate(e.target.value)}
            />
            <TextField
              fullWidth
              type='time'
              margin="normal"
              label="Appointment time"
              value={time}
              onChange={(e)=> setTime(e.target.value)}
            />
            {error && <p className='error'>{error}</p>}
            
           
              <Button
              variant="contained"
              color="primary"
              onClick={ handleSave}
              style={{ marginTop: '10px' }}
              disabled={!type || !service || !date || !time}
            >
              submit
            </Button> 
          </Grid>
          
          
          
        </Grid>
        :
        <p>No user</p>
    }
    </>
  );
    
    
}

export default Schedule;