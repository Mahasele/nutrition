import { Box,Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TablePagination,} from '@mui/material';
import React, { useState } from 'react'

function TabPanel({tabValue,userAppointments,index}) {
    const [page, setPage] = useState(0);
    const [rpg, setRpg] = useState(2);
  return (
    <TabPanel1 value={tabValue} index={index}>
       {
        userAppointments?.length ?
<div style={{overflowX:'auto'}}>
         <Table stickyHeader style={{overflowX:'auto'}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:'700'}}>No:</TableCell>
                        <TableCell sx={{fontWeight:'700'}}>Type</TableCell>
                        <TableCell sx={{fontWeight:'700'}}>Service</TableCell>
                        <TableCell sx={{fontWeight:'700'}}>Date</TableCell>
                        <TableCell sx={{fontWeight:'700'}}>Time</TableCell>
                        <TableCell sx={{fontWeight:'700'}}>Status</TableCell>
                        <TableCell sx={{fontWeight:'700'}}>Mode</TableCell>
                        <TableCell sx={{fontWeight:'700'}}>Id</TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userAppointments?.slice(page*rpg,page*rpg+rpg)?.map((appointment,i) => (
                  <TableRow key={appointment.$id}>
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell style={appointment.status==='Approved'?{color:'green'}:appointment.status==='Pending'?{color:'orangered'}:{color:'red'}}>{appointment.status}</TableCell>
                    <TableCell>{appointment.mode}</TableCell>
                    <TableCell>{appointment.$id}</TableCell>
                    </TableRow>
                ))}
                    
                </TableBody>
        </Table>   
        <TablePagination
              component={'div'}
               page={page} rowsPerPageOptions={[2,5,10]} count={userAppointments?.length || 0} rowsPerPage={rpg} onPageChange={(e,npg)=>setPage(npg)} onRowsPerPageChange={(e)=>{
                setRpg(e.target.value)
                setPage(0)
                }
                }>
                
              </TablePagination>
        </div>
        : <Typography variant='h6'>No Appointments</Typography>
       }
        
    </TabPanel1>
  )
}


function TabPanel1(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
export default TabPanel