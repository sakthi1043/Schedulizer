import React from 'react';
import { Grid, Paper, Typography, Button, Card, CardContent } from '@mui/material';
import { Icon } from '@mui/icons-material';
import { Box } from '@mui/system';
import styles from './Home.module.css';
import Sidebar from './Sidebar'; // Sidebar component
import Navbar from './Navbar';   // Navbar component
import Dashboard from './Dashboard'; // Dashboard component
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
      <Dashboard window={() => window}/>
    </div>
    // <div className='HomeBody'>
    //   <Box sx={{ display: 'flex' }}>
    //     <h1>hello</h1>
    //   </Box>
    // </div>
  );
};

export default HomePage;
