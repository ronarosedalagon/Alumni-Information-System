import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
  Paper,
} from '@material-ui/core';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WorkIcon from '@mui/icons-material/Work';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import cecIcon from '/src/assets/images/cec-logo.png';


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'#1976d2'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  fadeEnter: {
    opacity: 0,
  },
  fadeEnterActive: {
    opacity: 1,
    transition: 'opacity 300ms',
  },
  fadeExit: {
    opacity: 1,
  },
  fadeExitActive: {
    opacity: 0,
    transition: 'opacity 300ms',
  },
  graphContainer: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cecIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  }
}));

const JobsList = () => {
    const classes = useStyles();

  
//api's
let navigate = useNavigate();


async function dashboard() {
  navigate('/Dashboard/Admin');
}

async function alumniList() {
  navigate('/Dashboard/AlumniList');
}

async function jobsList() {
  navigate('/Dashboard/JobsList');
}

async function forumList() {
  navigate('/Dashboard/ForumList');
}

// display job
const [jobListings, setJobListings] = useState([]);

useEffect(() => {
  const fetchJobListings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/job-listings');
      setJobListings(response.data);
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  fetchJobListings();
}, []);

//table
// table
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'position', headerName: 'Position', width: 200 },
  { field: 'company', headerName: 'Company', width: 200 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'requestedBy', headerName: 'Requested By', width: 150 },

  {
    field: 'action',
    headerName: 'Action',
    width: 400,
    renderCell: (params) => {

      // Approved requests
      const handleApproveClick = async () => {
        const rowId = params.row.id;
        console.log('Approve button clicked for row ID:', rowId);
      
        try {
          // API
          await axios.put(`http://localhost:8000/api/job-listings/approve/${rowId}`, { status: 'Approved' });
      
          // If the update is successful,
          console.log('Job status updated successfully');
      
          // Refresh the job listings after the status update
          fetchJobListings();
        } catch (error) {
          console.error('Error updating job status:', error);
        }
      };

      // Decline requests
      const handleDeclineClick = async () => {
        const rowId = params.row.id;
        console.log('Decline button clicked for row ID:', rowId);
      
        try {
          // API
          await axios.put(`http://localhost:8000/api/job-listings/decline/${rowId}`, { status: 'Declined' });
      
          // If the update is successful,
          console.log('Job status updated successfully');
      
          // Refresh the job listings after the status update
          fetchJobListings();
        } catch (error) {
          console.error('Error updating job status:', error);
        }
      };

      

      return (
        <div>
          <Button variant="contained" color="primary" onClick={handleApproveClick}>
            Approve
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" color="secondary" onClick={handleDeclineClick}>
            Decline
          </Button>
        </div>
      );
    },
  },
  // Add more fields as needed
];



  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <noWrap>
            <img src={cecIcon} alt="Logo" className={classes.cecIcon}/>
            </noWrap>
            <Typography variant="h6" noWrap>
            Alumni Information System
            </Typography>

        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {/* Dashboard */}
            <ListItem
              button
              type="submit"
              onClick={dashboard}
            >
              <ListItemIcon>
                <StackedBarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          

            {/* Alumni List */}
            <ListItem
              button
              type="submit"
              onClick={alumniList}
            >
              <ListItemIcon>
                <Inventory2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Alumni List" />
            </ListItem>

            {/* Course */}
            <ListItem
              button
              type="submit"
              onClick={jobsList}
              selected={true}
            >
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItem>

            {/* Forum */}
            <ListItem
              button
              type="submit"
              onClick={forumList}
            >
              <ListItemIcon>
                <SmsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Forum" />
            </ListItem>
          </List>

          <Divider/>

          {/* Forum */}
          <ListItem
            button
            type="submit"
            onClick={forumList}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>

          {/* Forum */}
          <ListItem
            button
            type="submit"
            onClick={forumList}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>

        </div>
      </Drawer>
        <div style={{ marginTop: 100, height: 400, width: '100%' }}>
          <DataGrid
            rows={jobListings}
            columns={columns}
            
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
    </div>
    
  );
};

export default JobsList;


{/* <Divider />
<List>

  <ListItem
    button
    onClick={logout}
  >
    <ListItemIcon>
      <PeopleAltOutlinedIcon />
    </ListItemIcon>
    <ListItemText primary="Users" />
  </ListItem>

  <ListItem
    button
    onClick={logout}
  >
    <ListItemIcon>
      <SettingsIcon />
    </ListItemIcon>
    <ListItemText primary="System Settings" />
  </ListItem>

</List> */}