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
  Box,
  TextField,
} from '@mui/material';
import { 
    Add,
  Delete,
  Event as EventIcon,
  Search,
} from '@mui/icons-material';
import useFetchData from '../../hooks/useFetchData';
import { services } from '../../utils/services';
import useAxiosIntercepters from '../../hooks/useAxiosIntercepters';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function AdminServices() {
  const {data} = useFetchData('/users');
  const [page, setPage] = useState(0);
  const [rpg, setRpg] = useState(10);
  const [add, setAdd] = useState(false);
  const axios = useAxiosIntercepters()
  const [image,setImage] = useState()
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const matches = useMediaQuery((useTheme().breakpoints.up('sm')))

 const handleSubmit = async () => {
  const formData = new FormData();
    formData.append('title',title);
    formData.append('desc',desc);
    formData.append('file',image);
  try {
    
    const res = await axios.post('/services',formData,{
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    console.log(res.data)
  } catch(err) {
    console.log(err)
  }
  
 }

  return (
    
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={12}>
            <Box style={{ padding: '0 0 20px', textAlign: 'end' }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Add />}
                onClick={()=>setAdd(!add)}
              >
                Add Service
              </Button>
            </Box>
            {
                add &&<Grid item xs={12} md={8}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <TextField
              fullWidth
              margin="normal"
              label="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              value={desc}
              multiline
              rows={5}
              onChange={(e)=>setDesc(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              type='file'
              inputProps={{accept:"image/png, image/jpg, image/jpeg"}}
              onChange={(e)=>setImage(e.target.files[0])}
            />
            <Button 
                variant="contained" 
                color="primary" 
                size='large'
                onClick={handleSubmit}
              >
                Add
              </Button>
            </Paper>
          </Grid>
            }
            
          </Grid>

          <Grid item xs={12} md={12}>
            <Box style={{ padding: '0', textAlign: 'start',display:'flex',alignItems:'start' }}>
            <TextField
              fullWidth
              margin="none"
              label="Search by id or title"
              value={''}
            />
              <Button
              sx={ {padding:matches ?'15px 15px':'8px 1rem',borderTopLeftRadius:'0',borderBottomLeftRadius:'0',marginLeft:'-8px'}} 
              size='large'
                variant="contained" 
                color="primary" 
                startIcon={<Search/>}
              >
                {matches && 'Search'}
                
              </Button>
            </Box>
          </Grid>
          {/* Appointments List */}
          <Grid item xs={12} md={12}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">Services</Typography>
              <div style={{ overflowX:'auto' }}>
              <Table>
                <TableHead>
                    <TableRow>
                    <TableCell sx={{fontWeight:700}}>Id</TableCell>    
                {Object.keys(services[0]).filter(service=>service ==='title' || service==='desc').map(key =>(<TableCell sx={{fontWeight:700}} key={key} padding='normal'>{key[0].toLocaleUpperCase()+key.slice(1)}</TableCell>))}   
                <TableCell sx={{fontWeight:700}}>Actions</TableCell>   
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.slice(page*rpg,page*rpg+rpg).map((service,i) => (
                  <TableRow sx={{verticalAlign:'top'}} key={i}>
                    <TableCell>{i+1}</TableCell> 
                    <TableCell>{service.title}</TableCell> 
                    <TableCell>{service.desc}</TableCell> 
                    <TableCell>
                        <Button 
                variant="contained" 
                sx={{backgroundColor:'red'}}
                startIcon={<Delete/>}
              >
                Delete
              </Button>
                    </TableCell>   
                    </TableRow>
                ))}
                    
                </TableBody>
              </Table>  
              </div>
              
              <TablePagination
              component={'div'}
               page={page} rowsPerPageOptions={[5,10,20,50]} count={services.length} rowsPerPage={rpg} onPageChange={(e,npg)=>setPage(npg)} onRowsPerPageChange={(e)=>{
                setRpg(e.target.value)
                setPage(0)
                }
                }>
                
              </TablePagination>
            </Paper>
          </Grid>
          
        </Grid>
  );
}

export default AdminServices;