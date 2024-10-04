import { useState } from 'react';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import 'react-phone-number-input/style.css'
import PhoneInput,{
	isPossiblePhoneNumber,
	isValidPhoneNumber
} from 'react-phone-number-input'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
 
} from '@mui/material';
import { services } from '../../utils/services';
import Header from '../minicomponents/Header';
import Footer from '../minicomponents/Footer';
function Register() {
  
  const [username, seUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [status, setStatus] = useState('');
  const [plan, setPlan] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('')
    const data = {username,email,name,phone,age,height,weight,goal,dietaryRestrictions,password,gender,plan,address}
    try{
     const res = await axios.post('/register',data)
      const msg = res?.data
      setStatus(msg?.msg)
      console.log('submitted...')
    } catch(err){
      if (err.message==='Network Error') {
        setStatus('No Response From Server') 
      } else if(err?.response?.status===400 || err?.response?.status===409){
        setStatus(err?.response?.data) 
      } else{
        console.log(err.name)
        setStatus('Registration failed') 
      }
         
    }
    setTimeout(()=>setStatus(''),5000)
  };

 console.log(gender)
  return (
    <>
      <Header/>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="lg" style={{ margin: '20px 0' }}>
          <Paper style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Personal Information</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)} 
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)} 
               />
               <div style={{margin:'10px 0'}}>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry='LS'
                  international
                  value={phone}
                  onChange={setPhone}
                  style={{backgroundColor:'#fff'}}
                />
                <p style={{textAlign:'start',color:'red',margin:0}}>{phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'}</p>
               </div>
                
                <TextField
                  fullWidth
                  required
                  margin="normal"
                  label="Age"
                  name="age"
                  value={age}
                  onChange={(e)=>setAge(e.target.value)}
                  type='number'
                  
                />
                <FormLabel sx={{width:'100%',display:'block',textAlign:'start'}} id='gender'>Gender *</FormLabel>
                <RadioGroup
                  value={gender}
                  onChange={(e)=>setGender(e.target.value)}
                  row
                >
                  <FormControlLabel value={'Male'} control={<Radio/>} label={'Male'}/>
                  <FormControlLabel value={'Female'} control={<Radio/>} label={'Female'}/>
                  <FormControlLabel value={'Other'} control={<Radio/>} label={'Other'}/>
                </RadioGroup>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Height (m)"
                  name="height"
                  value={height}
                  onChange={(e)=>setHeight(e.target.value)}
                  type='number'
                  
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Weight (kg)"
                  name="weight"
                  value={weight}
                  onChange={(e)=>setWeight(e.target.value)}
                  type='number'
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Physical Address"
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
                  multiline
                  required
                  rows={4}
                />
              </Grid>
                <Grid item xs={12} md={6}>
                  <Grid item xs={12} md={12}>
                <Typography variant="h6">Nutrition Information</Typography>
                <div className='goal'>
                <select name="goal" id="goal" defaultValue={0} onChange={(e)=> setGoal(e.target.value)} required>
                  <option value="">Goal to Achieve for Joining</option>
                  {services.map(service =>(<option value={service.title} key={service.title}>{service.title}</option>))}
                </select> 
                </div>
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Goal"
                  name="goal"
                  required
                  value={goal}
                onChange={(e)=> setGoal(e.target.value)}
                  
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Dietary Restrictions"
                  name="dietaryRestrictions"
                  placeholder='With comma separated'
                  value={dietaryRestrictions}
                  onChange={(e)=> setDietaryRestrictions(e.target.value)}
                  
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nutrition Plan"
                  name="nutritionPlan"
                  value={plan}
                  onChange={(e)=>setPlan(e.target.value)}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">Login Information</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="goal"
                  value={username}
                  onChange={(e)=>seUsername(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type='password'
                  required
                  
                />
              </Grid>
                </Grid>
              
            </Grid>
            <div className='sign'>
              <Button 
              disabled={!username || !password || !age || !name || !address || !gender || !goal}
              type="submit" 
              variant="contained"
                color="primary"
                size="large">Register</Button>
            </div>
            
        {status && <p className={status==='Registered successfully'?'success':'error'}>{status}</p>}
          <div className='sign'>
          <span>Already have account?</span>
            <Link to={'/login'}>Login</Link>
          </div>
        </Paper>
        </Container>
      </form>
      <Footer/>
    </>
  );
}

export default Register