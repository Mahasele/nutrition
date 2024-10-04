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
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Event as EventIcon,
  Star as StarIcon,
  Menu as MenuIcon,
  MedicalServices,
} from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { services } from '../../utils/services';
import Header from '../minicomponents/Header';
import Footer from '../minicomponents/Footer';
function HomePage() {
    
    const matches = useMediaQuery((useTheme().breakpoints.up('sm')))
    const route = useNavigate()
    const goToRegister =() => route('/register')
    const [open,setOpen] = useState()
    console.log('match',matches)
  return (
    <div style={{ width: '100%',overflowX:"hidden" }}>
      <Header/>
      <Container maxWidth="lg" style={{ marginTop: '40px' }}>
        {/* Hero Section */}
        <Paper style={{ padding: '15px 5px', marginBottom: '40px', backgroundColor: '#f0f8ff' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom style={!matches ?{fontSize:'32px'}:{}}>
                Empowering lives through nutrition
              </Typography>
              <Typography variant="h6" paragraph>
                Expert guidance to help you achieve your health and wellness goals.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<EventIcon />}
                onClick={goToRegister}
              >
                Book a Consultation
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img 
                src="assets/hero.jpeg"
                alt="Healthy Food"
                style={{ width: '100%', borderRadius: '8px' }}
                loading='lazy'
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Services Section */}
        <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
          Our Services
        </Typography>
        <Grid container spacing={3} style={{alignItems:'stretch'}}>
          {services.slice(0,5).map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} >
              <Card sx={{height:'100%'}}>
                <CardMedia
                  component="img"
                  height="140"
                  image={service?.image || `assets/download.jpeg`}
                  alt={service.title}
                  loading='lazy'
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {service.desc.length < 90 ? service.desc :index===open ?service.desc : service.desc.slice(0,90)+'...  '}
                    {!(service.desc.length < 90) && <Button onClick={ ()=>{
                        index===open ?setOpen():setOpen(index)
                    }} >{index===open?"Show less" :"See More"}</Button>}
                    
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            
          ))}
          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<MedicalServices />}
              onClick={()=>route('/services')}
            >
              See more services
            </Button>
          </Grid>
          
        </Grid>

        {/* Testimonials Section */}
        <Typography variant="h4" gutterBottom style={{ marginTop: '40px' }}>
          What Our Clients Say
        </Typography>
        <Grid container spacing={3}>
          {[
            { name: 'John D.', text: "I've never felt better! The personalized meal plan was a game-changer for me." },
            { name: 'Sarah M.', text: "The sports nutrition advice helped me achieve my personal best in my last marathon." },
            { name: 'Mike R.', text: "Finally, a sustainable approach to weight management that actually works!" },
          ].map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    "{testimonial.text}"
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <StarIcon color="primary" />
                    <StarIcon color="primary" />
                    <StarIcon color="primary" />
                    <StarIcon color="primary" />
                    <StarIcon color="primary" />
                    <Typography variant="subtitle2" style={{ marginLeft: '10px' }}>
                      {testimonial.name}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Call to Action */}
        <Paper style={{ padding: '40px', marginTop: '40px', backgroundColor: '#e8f5e9' }}>
          <Typography variant="h5" gutterBottom>
            Ready to Start Your Journey to Better Health?
          </Typography>
          <Typography variant="body1" paragraph>
            Book your consultation today and take the first step towards a healthier you.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<EventIcon />}
            onClick={goToRegister}
          >
            Schedule Your Consultation
          </Button>
        </Paper>
      </Container>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default HomePage;
