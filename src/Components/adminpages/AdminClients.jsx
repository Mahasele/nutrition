import { useEffect, useState } from 'react';
import { 
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
  Event as EventIcon,
} from '@mui/icons-material';
import useFetchData from '../../hooks/useFetchData';

// Dummy data
const appointments = [
  { id: 1, name: 'John Doe', time: '09:00 AM' },
  { id: 2, name: 'Jane Smith', time: '11:00 AM' },
  { id: 3, name: 'Alice Johnson', time: '02:00 PM' },
];

const clients = [
  { id: 1, name: 'John Doe', plan: 'Weight Loss' },
  { id: 2, name: 'Jane Smith', plan: 'Muscle Gain' },
  { id: 3, name: 'Alice Johnson', plan: 'Balanced Diet' },
];

function AdminClients() {
  const {data} = useFetchData('/users');
  const [page, setPage] = useState(0);
  const [rpg, setRpg] = useState(2);
    
 
console.log(data)
  return (
    
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Total Clients </Typography>
              <Typography variant="h4">50</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">New Clients</Typography>
              <Typography variant="h4">5</Typography>
            </Paper>
          </Grid>


          {/* Appointments List */}
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">Total Clients</Typography>
              <Table>
                <TableHead>
                    <TableRow>
                        
                {Object.keys(appointments[0]).map(key =>(<TableCell key={key} padding='normal'>{key[0].toLocaleUpperCase()+key.slice(1)}</TableCell>))}   
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.slice(page*rpg,page*rpg+rpg).map((appointment,i) => (
                  <TableRow key={i}>{Object.values(appointment).map(val => (<TableCell key={val}>{val}</TableCell>))}</TableRow>
                ))}
                    
                </TableBody>
              </Table>
              <TablePagination
              component={'div'}
               page={page} rowsPerPageOptions={[2,5,10]} count={appointments.length} rowsPerPage={rpg} onPageChange={(e,npg)=>setPage(npg)} onRowsPerPageChange={(e)=>{
                setRpg(e.target.value)
                setPage(0)
                }
                }>
                
              </TablePagination>
              
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<EventIcon />}
              >
                Schedule Appointment
              </Button>
            </Paper>
          </Grid>
          
        </Grid>
  );
}

export default AdminClients;