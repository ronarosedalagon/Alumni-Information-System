import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import axios from 'axios';


import cecIcon from '../assets/images/csd_logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  cecIcon: {
    width: 100,
    height: 100,
    marginBottom: -10,
  },
}));


const Signup = () => {
  const classes = useStyles();

  const paperStyle = { padding: 20, height: '80vh', width: 1100, margin: '50px auto' };
  const avatarStyle = { backgroundColor: '#3370bd' };
  const btnStyle = {width: 500, backgroundColor:'#1976d2', color:'white'};
  const textfieldStyle = {width: 400,  margin: '8px 0', paddingRight: '50px'};

  const [errors, setErrors] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    work: '',
    location: '',
    linkedin: '',
    bio: '',
  });

  const { name, email, password, work, location, linkedin, bio  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function signup() {
    let result = await axios.post('http://localhost:8000/api/register', user);
    setErrors('Registration Successful');
    setUser({ name: '', email: '', password: '', work: '', location: '', linkedin: '', bio: '' });
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>


        <Grid align="center">
          <img src={cecIcon} alt="Logo" className={classes.cecIcon}/>
          <h1>Registration Form</h1>
          <h3 style={{ color: 'green' }}>{errors}</h3>
        </Grid>

        <Grid align="center">
          <TextField label="Name" name="name" style={textfieldStyle}  value={name} onChange={onInputChange} placeholder="Enter Name" />
          <TextField label="Email" name="email" style={textfieldStyle} value={email} onChange={onInputChange} placeholder="Enter Email" />
          <TextField label="Present Work" name="work" style={textfieldStyle} value={work} onChange={onInputChange} placeholder="Your Present Role at Work" />
          <TextField label="Location" name="location" style={textfieldStyle} value={location} onChange={onInputChange} placeholder="Where are you located right now?" />
          <TextField label="Linkedin Account" name="linkedin" style={textfieldStyle} value={linkedin} onChange={onInputChange} placeholder="Connect more" />
          <TextField label="Bio" name="bio" style={textfieldStyle} value={bio} onChange={onInputChange} placeholder="Brief description about you" />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={onInputChange}
            placeholder="Enter Password"
            style={textfieldStyle}
          />

        <br/>
        <Button type="submit" onClick={signup} variant="contained" style={btnStyle} >
          Sign Up
        </Button>

        <Typography>
          Click Here for
          <Link to="/">
            <span style={{ marginLeft: '4px' }}>Login</span>
          </Link>
        </Typography>
        </Grid>

        


        
      </Paper>
    </Grid>
  );
};

export default Signup;
