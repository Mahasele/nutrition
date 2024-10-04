import {useState} from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { services } from '../../utils/services';
import Header from '../minicomponents/Header';
import Footer from '../minicomponents/Footer';
function ServicesPage() {
    
    const matches = useMediaQuery((useTheme().breakpoints.up('sm')))
    const route = useNavigate()
    const [open,setOpen] = useState()
  return (
    <div style={{ width: '100%',overflowX:"hidden" }}>
      <Header/>
      <Container maxWidth="lg" style={{ marginTop: '40px' }}>
        {/* Hero Section */}
        <Paper style={{ padding: '15px 5px', marginBottom: '40px', backgroundImage: "url('src/assets/hero.jpeg') ",backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={12}>
              <Typography variant="h3" gutterBottom style={!matches ?{fontSize:'32px',padding:'40px 0',fontWeight:700}:{}}>
                Our Services
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Services Section */}
        <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
          
        </Typography>
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{height:'100%'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={service.image || `src/assets/download.jpeg`}
                  alt={service.title}
                  loading='lazy'
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.desc.length < 90 ? service.desc :index===open ?service.desc : service.desc.slice(0,90)+'...  '}
                    {
                    service.desc.length > 90 && <Button onClick={ ()=>{
                        index===open ?setOpen():setOpen(index)
                    }} >{index===open?"Show less" :"See More"}</Button>
                    }
                    
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default ServicesPage;