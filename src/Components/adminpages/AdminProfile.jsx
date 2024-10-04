
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useState,useEffect } from "react"
import useAxiosIntercepters from "../../hooks/useAxiosIntercepters"
import useAuth from "../../hooks/use-auth"

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

function AdminProfile() {
  const [editing, setEditing] = useState(false);
  const [client, setClient] = useState(clientData);
  const [user,setUser] = useState()
  const {auth} = useAuth()
  const axios = useAxiosIntercepters()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [plan, setPlan] = useState();
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const handleEdit = () => {
    setEditing(true);
  };
  useEffect(()=>{
        let mounted = true;
        const controller = new AbortController()
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
        setEmail(user?.email)
        setUsername(user?.username)
        setPhone(user?.phone)
        setHeight(user?.height)
        setWeight(user?.weight)
        setDietaryRestrictions(user?.dietaryRestrictions)
        
    },[user])
 console.log(user)
  const handleSave = () => {
    setEditing(false);
    // Here you would typically send an API request to update the client data
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
    {user 
        ? 
        
      <Paper style={{ padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">{user?.name}</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={editing ? <SaveIcon /> : <EditIcon />}
              onClick={editing ? handleSave : handleEdit}
              style={{ marginTop: '10px' }}
            >
              {editing ? 'Save' : 'Edit'}
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Personal Information</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Age"
              name="age"
              value={user?.age}
              onChange={handleChange}
              disabled={!editing}
            />
           
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Change Password</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Old Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              disabled={!editing}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
            >Save Password</Button>
          </Grid>
        </Grid>
      </Paper>
  
        :
        <p>No user</p>
    }
    </>
  );
    
    
}


export default AdminProfile;