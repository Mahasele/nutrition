import { Facebook, WhatsApp } from '@mui/icons-material'
import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <Box bgcolor="primary.main" color="white" py={3} mt={5}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Mia's Nutrition Clinic Lesotho
              </Typography>
              <Typography variant="body2">
               Empowering lives through nutrition.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">
                Maseru Lesotho, Qoaling,<br />
                Phone: (+266) 5648-9324<br />
                Email: makoahopolang@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Typography variant="body2">
                <Link style={{fontSize:'12px !important',padding:0}} to={'https://www.facebook.com/hopolangameliah.makoa.9?mibextid=LQQJ4d'}><Facebook/></Link> | 
                <Link style={{fontSize:'12px !important',padding:0}} to={' https://www.tiktok.com/@mia9943?_r=1&_d=edbmj7hcg0178fsec_uid=MS4wLjABAAAAwwVIt9R46nNLTCnwlXuOYt67ej_kjzs-ncv2fvQ-3N0Ndx4a2gn609Kd8jhcpt&share_author_id=6792206978992653317&sharer_language=en&source=h5_m&u_code=daldmakmhik4d6&ug_btm=b8727,b0&social_share_type=4&utm_source=copy&sec_user_id=MS4wLjABAAAAwwVIt9R46nNLTCnwlXuOYt67ej_kjzs-ncv2fvQ-3N0Ndx4a2gnZW609Kd8jhcpt&tt_from=copy&utm_medium=ios&utm_campaign=client_share&enable_checksum=1&user_id=6792206978992653317&share_link_id=756505D9-E129-4FB7-BA7F-4C20AD83D3B9&share_app_id=1233'}><WhatsApp/></Link> | Whatsapp | Instagram | LinkedIn
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
  )
}
