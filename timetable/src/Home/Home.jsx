import React from 'react';
import { Grid, Paper, Typography, Button, Card, CardContent } from '@mui/material';
import { Icon } from '@mui/icons-material';
import { Box } from '@mui/system';
import styles from './Home.module.css';
import Sidebar from './Sidebar'; // Sidebar component
import Navbar from './Navbar';   // Navbar component
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Math', timetableCount: 10 },
  { name: 'English', timetableCount: 8 },
  { name: 'Science', timetableCount: 6 },
  { name: 'History', timetableCount: 4 },
];

// Analysis chart
const AnalysisChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="timetableCount" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

function HomePage (){
  return (
    <div className={styles.HomeBody}>
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Navbar />
        <Grid container spacing={3}>
          {/* Dashboard Cards */}
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Total Timetables</Typography>
                <Typography variant="h5">12</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Timetable Generation Rate</Typography>
                <Typography variant="h5">75%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Active Users</Typography>
                <Typography variant="h5">45</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ marginTop: 3 }}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>Timetable Analysis</Typography>
              <AnalysisChart />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </div>
    // <div className='HomeBody'>
    //   <Box sx={{ display: 'flex' }}>
    //     <h1>hello</h1>
    //   </Box>
    // </div>
  );
};

export default HomePage;
