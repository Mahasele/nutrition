import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { 
  Menu as MenuIcon,
  PersonAdd as PersonAddIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

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

function Dash() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Nutritionist Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Total Clients</Typography>
              <Typography variant="h4">50</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Appointments Today</Typography>
              <Typography variant="h4">5</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: '20px', textAlign: 'center' }}>
              <Typography variant="h6">Revenue This Month</Typography>
              <Typography variant="h4">$5,000</Typography>
            </Paper>
          </Grid>

          {/* Appointments List */}
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">Today's Appointments</Typography>
              <List>
                {appointments.map((appointment) => (
                  <ListItem key={appointment.id}>
                    <ListItemText 
                      primary={appointment.name} 
                      secondary={appointment.time} 
                    />
                  </ListItem>
                ))}
              </List>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<EventIcon />}
              >
                Schedule Appointment
              </Button>
            </Paper>
          </Grid>

          {/* Clients List */}
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">Recent Clients</Typography>
              <List>
                {clients.map((client) => (
                  <ListItem key={client.id}>
                    <ListItemText 
                      primary={client.name} 
                      secondary={`Plan: ${client.plan}`} 
                    />
                  </ListItem>
                ))}
              </List>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<PersonAddIcon />}
              >
                Add New Client
              </Button>
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6">Quick Actions</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<AssessmentIcon />}
                style={{ marginRight: '10px' }}
              >
                Generate Report
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<EventIcon />}
              >
                View Calendar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Dash;