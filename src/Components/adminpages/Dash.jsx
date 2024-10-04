import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import { 
  Delete,
} from '@mui/icons-material';
import useFetchData from '../../hooks/useFetchData';

function Dash() {
  const {data,loading,error} = useFetchData('/appointments')
   const [page, setPage] = useState(0);
   const [header, setHeader] = useState('');
   const [title, setTitle] = useState('all');
   const [apps, setApps] = useState([]);

    const [rpg, setRpg] = useState(2);
  console.log(data)
  useEffect(()=>{
    
     switch (title) {
            case 'all':
                setHeader('All Appointments')
                setApps(data?.appointments)
                break;
            case 'today':
                setHeader('Today\'s Appointments')
                setApps(data?.todayAppointments)
                break;
            case 'pending':
                setHeader('Pending Appointments')
                setApps(data?.upcomingAppointments)
                break;
            case 'approved':
                setHeader('Approved Appointments')
                setApps(data?.approvedAppointments)
                break;
            case 'cancelled':
                setHeader('Today\'s Appointments')
                setApps(data?.todayAppointments)
                break;
            default:
                setHeader('All Appointments')
                setApps(data?.appointments)
                break;
        }
        console.log(apps)
  },[title])
  return (
    <>
      {
          loading ? <p>loading...</p>
         : data ?
         <>
          <Grid container spacing={3}>
            {/* Summary Cards */}
            <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center',backgroundColor:title==='today' && '#bbb'}} onClick={()=>setTitle('today')}>
              <Typography variant="h6">Today Appointments </Typography>
              <Typography variant="h4">{data?.todayAppointments?.length || 0}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center',backgroundColor:title==='pending' && '#bbb' }} onClick={()=>setTitle('pending')}>
              <Typography variant="h6">Pending Appointments</Typography>
              <Typography variant="h4">{data?.upcomingAppointments?.length || 0}</Typography>
            </Paper>
          </Grid>  
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center',backgroundColor:title==='approved' && '#bbb' }} onClick={()=>setTitle('approved')}>
              <Typography variant="h6">Approved Appointments</Typography>
              <Typography variant="h4">{data?.approvedAppointments?.length || 0}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center',backgroundColor:title==='all' && '#bbb' }} onClick={()=>setTitle('all')}>
              <Typography variant="h6">All Appointments</Typography>
              <Typography variant="h4">{data?.appointments?.length || 0}</Typography>
            </Paper>
          </Grid>
        

            {/* Appointments List */}
            
            
          </Grid> 
          <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={12}>
              <Paper style={{ padding: '20px',textAlign: 'center' }}>
                <Typography variant="h6">{header}</Typography>
                <div style={{overflowX:'auto'}}>
                 <Table>
                  <TableHead>
                      <TableRow>
                          
                  {['No:','Type','Service','Date','Time','Name','Mode','Status','App_Id']?.map(key =>(<TableCell sx={{fontWeight:'700'}} key={key} padding='normal'>{key}</TableCell>))} 
                  <TableCell colSpan={3} sx={{textAlign:'center',fontWeight:700}}>
                        Actions
                    </TableCell>    
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {apps?.slice(page*rpg,page*rpg+rpg)?.map((appointment,i) => (
                    <TableRow key={appointment?.$id}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>{appointment.name}</TableCell>
                    <TableCell>{appointment.mode}</TableCell>
                    <TableCell style={appointment.status==='Approved'?{color:'green'}:appointment.status==='Pending'?{color:'orangered'}:{color:'red'}}>{appointment.status}</TableCell>
                    <TableCell>{appointment.$id}</TableCell>
                    <TableCell>
                        <Button 
                variant="contained" 
                sx={{backgroundColor:'green'}}
                startIcon={<Delete/>}
              >
                Approve
              </Button>
                    </TableCell>  <TableCell>
                        <Button 
                variant="contained" 
                sx={{backgroundColor:'grey'}}
                startIcon={<Delete/>}
              >
                Schedule
              </Button>
                    </TableCell>  
                    <TableCell>
                        <Button 
                variant="contained" 
                sx={{backgroundColor:'red'}}
                startIcon={<Delete/>}
              >
                Cancel
              </Button>
                    </TableCell>  
                    </TableRow>
                  ))}
                      
                  </TableBody>
                </Table> 
                </div>
                
                <TablePagination
                component={'div'}
                page={page} rowsPerPageOptions={[2,5,10]} count={apps?.length || 0} rowsPerPage={rpg} onPageChange={(e,npg)=>setPage(npg)} onRowsPerPageChange={(e)=>{
                  setRpg(e.target.value)
                  setPage(0)
                  }
                  }>
                  
                </TablePagination>
              </Paper>
            </Grid>
          </Grid>
          </>
          : <p>No Appointments</p>
        } 
    </>    
  );
}

export default Dash;