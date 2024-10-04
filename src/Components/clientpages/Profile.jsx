
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
import Skeletons from '../minicomponents/Skeleton';



function Profile() {
  const [editing, setEditing] = useState(false);
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
  const [goal, setGoal] = useState();
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');

  const handleEdit = () => {
    setEditing(true);
  };
  const changePassword = async ()=>{
    try{
      const res = await axios.put('/change_password/',{userId:user.userId,password,newPassword})
      console.log(res.data)
      setNewPassword('')
      setPassword('')
    } catch(err) {
      console.log(err)
    }
    
  }
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
        setPlan(user?.plan)
        setGoal(user?.goal)
        
    },[user])
 console.log(user)
  const handleSave = async() => {
    
    // Here you would typically send an API request to update the client data
    try {
      const res  = await axios.put('/update_profile',{userId:user.userId,username,email,phone,age:user.age,height,weight,dietaryRestrictions,address:'Qoaling',gender:'Male',plan,goal})
      console.log(res.data)
      setEditing(false);
    } catch(err){
      console.log(err?.response?.data || err)
    }
  };

  return (
    <>
    {user 
        ? 
        <Container maxWidth="lg" style={{ margin: '20px 0',padding:'0px' }}>
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
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Height"
              name="height"
              value={height}
              onChange={(e)=>setHeight(e.target.value)}
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Weight"
              name="weight"
              value={weight}
              onChange={(e)=>setWeight(e.target.value)}
              disabled={!editing}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Nutrition Information</Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Goal"
              name="goal"
              value={goal || user?.goal}
              onChange={(e)=>setGoal(e.target.value)}
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              value={dietaryRestrictions}
              onChange={(e)=>setDietaryRestrictions(e.target.value)}
              disabled={!editing}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Nutrition Plan"
              name="nutritionPlan"
              value={plan}
              onChange={(e)=>setPlan(e.target.value)}
              disabled={!editing}
              multiline
              rows={4}
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
              onClick={changePassword}
              disabled={!password || !newPassword}
            >Save Password</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
        :
        <Skeletons/>
    }
    </>
  );
    
    
}


export default Profile;