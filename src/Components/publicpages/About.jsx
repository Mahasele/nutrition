import {useState} from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import Header from '../minicomponents/Header';
import Footer from '../minicomponents/Footer';
function AboutPage() {
    
    const matches = useMediaQuery((useTheme().breakpoints.up('sm')))
    const matches2 = useMediaQuery((useTheme().breakpoints.up('md')))
  return (
    <div style={{ width: '100%',overflowX:"hidden" }}>
      <Header/>
      <Container maxWidth="lg" style={{ marginTop: '40px' }}>
        {/* Hero Section */}
        <Paper style={{ padding: '15px 5px', marginBottom: '40px', backgroundColor: '#f0f8ff' }}>
          <Grid container spacing={3} alignItems="center" style={!matches2 ? {flexDirection:" column-reverse"}:{}}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom style={!matches ?{fontSize:'32px'}:{}}>
                Empowering lives through nutrition
              </Typography>
              <Typography variant="h6" paragraph>
                Expert guidance to help you achieve your health and wellness goals.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img 
                src="src/assets/file.png"
                alt="Healthy Food"
                style={{ width: '200px', borderRadius: '8px' }}
                loading='lazy'
                height={200}
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper style={{ padding: '15px 5px', marginBottom: '40px', backgroundColor: '#f0f8ff' }}>
          <Grid container spacing={3} alignItems="start">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom style={!matches ?{fontSize:'32px'}:{}}>
                ABOUT NUTRITION CONSULTATION
              </Typography>
              <Typography variant="h6" paragraph>
                Mia's heal at home clinic, aims for a world where medical nutrition is an intergrated part of the treatment across the continum of core, achieve better care through better nutrition across all ages and healthcare settings.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom style={!matches ?{fontSize:'32px'}:{}}>
               MISSION
              </Typography>
              <Typography variant="h6" paragraph>
                Our mission is to provide one-on-one nutrition consultation and counselling sessions equiping clients with accurate science based information, toilored guidance and support on their journey forward a healthier diet and lifestyle for overall well being. <br/> <br/>MHAH Clinic strive to put nutrition at the heart of patient care. Aim to create an environment that provides fair access to medical nutrition therapies throughout the universe. <br/> <br/>MHAH Clinic's core value are forged by its commitment to the highest ethical standards and it drives its priorities, commitments and organizational decisions. Our reputation is the ultimate asset and these core values guide its behavior, judgements and how it accomplishes its mission.
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default AboutPage;