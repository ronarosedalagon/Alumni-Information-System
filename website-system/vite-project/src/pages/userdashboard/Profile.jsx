import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Paper,
  IconButton,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
} from '@material-ui/core';


import {
  LocationOnOutlined,
  LinkOutlined,
  DescriptionOutlined,
  EditOutlined,
} from '@material-ui/icons';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginLeft: '15px'
  },
  infoContainer: {
    padding: theme.spacing(2),
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  infoText: {
    marginLeft: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  aboutSection: {
    padding: theme.spacing(2),
  },
  appBar: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: theme.spacing(1),
    textAlign: 'center',
    padding:50,
  },
  button: {
    margin: theme.spacing(1),
  },
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const Profile = () => {

  const classes = useStyles();

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


 //api's
 const [loggedInUserName, setLoggedInUserName] = useState("");
 const [loggedInName, setLoggedInName] = useState("");
 const [loggedInLoc, setLoggedInLoc] = useState("");

 useEffect(() => {
   const fetchUserData = () => {

     const emaily = sessionStorage.getItem('email');
     setLoggedInUserName(emaily);

     const name = sessionStorage.getItem('name');
     setLoggedInName(name);

     const location = sessionStorage.getItem('location');
     setLoggedInLoc(location);
   };

   fetchUserData();
 }, []);
  

  async function home() {
    navigate('/AlumniDashboard');
  }

  async function profile() {
    navigate('/AlumniDashboard/Profile');
  }

  async function jobs() {
    navigate('/AlumniDashboard/Jobs');
  }

  async function forum() {
    navigate('/AlumniDashboard/Forum');
  }
  

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>

          <Button
            type="submit"
            onClick={home}
          >
            Home
          </Button>

          <Button
            type="submit"
            onClick={profile}
          >
            Profile
          </Button>

          <Button
            type="submit"
            onClick={jobs}
          >
            Jobs
          </Button>

          <Button
            type="submit"
          >
            Forum
          </Button>
          <Button>SIGN OUT</Button>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
      <div maxWidth="md" className={classes.root}>
      <Paper>
        <div className={classes.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt="Profile Picture"
              className={classes.avatar}
            />
            <div style={{ marginLeft: '30px'}}>

              <Typography variant="h4">{loggedInName}</Typography>
              <Typography variant="body2" color="textSecondary">
                Software Engineer at Company XYZ
              </Typography>
            </div>
          </div>
          <IconButton>
            
            <Button onClick={handleOpen}><EditOutlined /></Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <form onSubmit={""}>
              <Box sx={style}>
                 <br/>
                 <TextField fullWidth 
                    id="outlined-helperText"
                    label="Name"
                    value={loggedInName}
                    name="name"
                  /> <br/> <br/>
                  <TextField fullWidth 
                    id="outlined-helperText"
                    label="Work"
                    value="Undefined"
                    name="work"
                  /> <br/> <br/>
                  <TextField fullWidth 
                    id="outlined-helperText"
                    label="Location"
                    value={loggedInLoc}
                    name="location"
                  /> <br/> <br/>
                  <TextField fullWidth 
                    id="outlined-helperText"
                    label="LinkedIn"
                    value="Undefined"
                    name="linkedin"
                  /> <br/> <br/>
                  <TextField fullWidth 
                    id="outlined-helperText"
                    label="Bio"
                    value="Undefined"
                    name="bio"
                  /> <br/> <br/>
                  <Button variant="contained" fullWidth>
                    UPDATE DETAILS
                  </Button>              
                  </Box>
              </form>
              
            </Modal>
          </IconButton>
        </div>
        <Divider />
        <div className={classes.infoContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className={classes.infoItem}>
                <LocationOnOutlined />
                <Typography className={classes.infoText}>
                  {loggedInLoc}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.infoItem}>
                <LinkOutlined />
                <Typography className={classes.infoText}>
                  www.linkedin.com/in/johndoe
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.infoItem}>
                <MailOutlineIcon/>
                <Typography className={classes.infoText}>
                  {loggedInUserName}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.infoItem}>
                <AccessTimeIcon/>
                <Typography className={classes.infoText}>
                  BATCH 2020
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.infoItem}>
                <DescriptionOutlined />
                <Typography className={classes.infoText}>
                  Software Engineer with expertise in JavaScript, React.js, and
                  Node.js.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.aboutSection}>
          <Typography variant="h6">Life at Computer Studies Department</Typography> <br/>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            elementum nulla ut lorem aliquet fermentum. Nam auctor felis ut ex
            elementum, a pharetra enim dictum. Donec cursus, metus sit amet
            lobortis interdum, ligula est luctus velit, sit amet luctus ligula
            elit at elit. Praesent feugiat augue vel augue fermentum, eget
            blandit enim ultricies. Aliquam erat volutpat. Nunc malesuada
            efficitur tincidunt.
          </Typography>
        </div>
      </Paper>
    </div>
      </main>
    </div>
  );
};

export default Profile;



