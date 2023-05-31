import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme) => ({
 root: {
    flexGrow: 1,
    marginTop: theme.spacing(0),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
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
    marginTop: theme.spacing(-8),
    textAlign: 'center',
    padding: theme.spacing(13),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  description: {
    flexGrow: 1,
  },
  postJobButton: {
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(2),
  },
}));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const btnStyle = {backgroundColor:'#1976d2', color:'white'};

const Jobs = () => {
  const classes = useStyles();

  //display user log in
  const{users} = useParams();
  const userss = localStorage.getItem('users');

  // add job
  const [errors, setErrors] = useState('');
  const [job, setJob] = useState({
    position: '',
    company: '',
    location: '',
    details: '',
    link: '',
    requestedBy: userss,
  });

  const { position, company, location, details, link, requestedBy } = job;

  const onInputChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  async function add_job() {
    let result = await axios.post('http://localhost:8000/api/addjob', job);
    setErrors('Successfully Requested a Job Posting');
    setJob({ position: '', company: '', location: '', details: '', link: '', requestedBy: userss,});
  }

  // display job
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/view-job-listings');
        setJobListings(response.data);
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchJobListings();
  }, []);


  // add job modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  //api's
  const navigate = useNavigate();

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
          <Button color="yellow">SIGN OUT</Button>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
      
      <Typography variant="h4" gutterBottom>
        Job Listings
      </Typography>


      <Button
        variant="contained"
        color="primary"
        className={classes.postJobButton}
        onClick={handleOpen}
      >
        Post a Job
      </Button>

      {/* start of modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4">
            Post a Job Opportunity
          </Typography>
          <Typography id="modal-modal-description" variant="h8" sx={{ mt: 4 }}>
            Please be reminded that you need to wait for the admin approval before you post can be displayed.
          </Typography>

          <h3 style={{ color: 'green' }}>{errors}</h3>

          <br/>
          <TextField fullWidth 
            disabled
            id="filled-disabled"
            label="Requested By:" 
            value={requestedBy}
            name="requestedBy"
            size="small"
          /> <br/> <br/>
          
          <TextField fullWidth 
            id="outlined-helperText"
            label="Job Position"
            value={position}
            name="position"
            size="small"
            onChange={onInputChange}
          /> <br/> <br/>

          <TextField fullWidth 
            id="outlined-helperText"
            label="Company"
            value={company}
            name="company"
            size="small"
            onChange={onInputChange}
          /> <br/> <br/>

          <TextField fullWidth 
            id="outlined-helperText"
            label="Location"
            value={location}
            name="location"
            size="small"
            onChange={onInputChange}
          /> <br/> <br/>

          <TextField fullWidth 
            id="outlined-helperText"
            label="Details"
            value={details}
            name="details"
            size="small"
            onChange={onInputChange}
          /> <br/> <br/>

          <TextField fullWidth 
            id="outlined-helperText"
            label="Link"
            value={link}
            name="link"
            size="small"
            onChange={onInputChange}
          /> <br/> <br/>

            <Button type="submit" onClick={add_job}  fullWidth  variant="contained" style={btnStyle}  >
              Send Request
            </Button>
          
        </Box>
      </Modal>
      {/* end of modal */}

      {/* start of job listings */}
      <Grid container spacing={2}>
          {jobListings.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" className={classes.title}>
                    {job.position}
                  </Typography>
                  <Typography variant="subtitle1">{job.company}</Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {job.location}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.description}
                    color="textSecondary"
                  >
                    {job.details}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button color="primary" fullWidth variant="outlined" href={"/"+job.link}>Apply Now</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      {/* end of job listings */}
      </main>
    </div>
  );
};

export default Jobs;


