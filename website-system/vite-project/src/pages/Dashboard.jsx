import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


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


// Dashboard Graphs
const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 20 },
  { name: 'Apr', value: 30 },
  { name: 'May', value: 50 },
];
const Graph = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.graphContainer}>
      <Typography variant="h6">Number of Users</Typography>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </Paper>
  );
};



const Dashboard = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState('Inbox');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
              onClick={() => handlePageChange('Dashboard')}
              selected={currentPage === 'Dashboard'}
            >
              <ListItemIcon>
                <StackedBarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          

            {/* Alumni List */}
            <ListItem
              button
              onClick={() => handlePageChange('Alumni')}
              selected={currentPage === 'Alumni'}
            >
              <ListItemIcon>
                <Inventory2OutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Alumni List" />
            </ListItem>

            {/* Course */}
            <ListItem
              button
              onClick={() => handlePageChange('Jobs')}
              selected={currentPage === 'Jobs'}
            >
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItem>

            {/* Forum */}
            <ListItem
              button
              onClick={() => handlePageChange('Forum')}
              selected={currentPage === 'Forum'}
            >
              <ListItemIcon>
                <SmsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Forum" />
            </ListItem>
          </List>


          <Divider />
          <List>
            {/* Users */}
            <ListItem
              button
              onClick={() => handlePageChange('Users')}
              selected={currentPage === 'Users'}
            >
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
            {/* System */}
            <ListItem
              button
              onClick={() => handlePageChange('Settings')}
              selected={currentPage === 'Settings'}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="System Settings" />
            </ListItem>

          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <TransitionGroup>
  <CSSTransition
    key={currentPage}
    timeout={300}
    classNames={{
      enter: classes.fadeEnter,
      enterActive: classes.fadeEnterActive,
      exit: classes.fadeExit,
      exitActive: classes.fadeExitActive,
    }}
  >
    <div>
      {currentPage === 'Dashboard' && (
        <Typography paragraph>
          <Graph />
        </Typography>
      )}
      {currentPage === 'Course' && (
        <Typography paragraph>
          This is the Course page.
        </Typography>
      )}
      {currentPage === 'Alumni' && (
        <Typography paragraph>
          This is the Alumni page.
        </Typography>
      )}
      {currentPage === 'Jobs' && (
        <Typography paragraph>
          This is the Jobs page.
        </Typography>
      )}
      {currentPage === 'Forum' && (
        <Typography paragraph>
          This is the Forum page.
        </Typography>
      )}
      {currentPage === 'Users' && (
        <Typography paragraph>
          This is the Users page.
        </Typography>
      )}
      {currentPage === 'Settings' && (
        <Typography paragraph>
          This is the Settings page.
        </Typography>
      )}
    </div>
  </CSSTransition>
</TransitionGroup>
      </main>
    </div>
  );
};

export default Dashboard;
