import { useState } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/use-auth';
import { useNavigate,redirect, Link } from 'react-router-dom';
import { Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import Header from '../minicomponents/Header';
import Footer from '../minicomponents/Footer';

export const LoginForm = ()=>{
  const [username, seUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {setAuth} = useAuth()
  const route = useNavigate()
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try{
     const res = axios.post('/login',{username,password},{
        withCredentials:true,
        headers:{
            "Content-Type": 'application/json'
        }
     })
      const msg = (await res).data
      setAuth(msg)
      console.log('result', msg)
      route('/dashboard/appointments',{replace:true})
    } catch(err){
      if (err.message==='Network Error') {
        setError('No Response From Server') 
      } else if(err?.response?.status===400){
        setError(err?.response?.data) 
      }else{
        setError("Login Failed")
      }
      
      //console.log('Error:',)
    }
    
    
    // Handle login logic here
    
  };

 
  return (
    <section className='login'>

    <Header/>
    <form onSubmit={handleSubmit} style={{marginTop:'50px'}}>
     <Container maxWidth="lg" style={{textAlign:'center',height:'100%' }}>
         
            <Grid container spacing={3} style={{ justifyContent:'center',width:'100%',padding:'0',margin:'0',height:'100%',alignItems:'center' }}> 
              <Paper style={{ padding: '20px' }}>
              <Grid item xs={12} md={12}>
                <Typography variant="h5" sx={{fontWeight:700}}>Login</Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="goal"
                  value={username}
                  onChange={(e)=>seUsername(e.target.value)}
                  
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type='password'
                  
                />
                <div className='sign'>
              <Button
              disabled={!username ||  !password}
              type="submit" 
              variant="contained"
                color="primary"
                size="large">Login</Button>
            </div>
            {error && <p className='error'>{error}</p>}
          <div className='sign'>
            <span>Have not registered yet?</span>
            <Link to={'/register'}>Register</Link>
          </div>
              </Grid></Paper>
            </Grid>
            
        
      </Container>
    </form>
    <Footer/>
    </section>
    
  );
}
