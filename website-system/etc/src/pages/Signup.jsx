import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const paperStyle = { padding: 20, height: '70vh', width: 500, margin: '20px auto' };
  const avatarStyle = { backgroundColor: '#3370bd' };
  const btnStyle = { margin: '8px 0' , width: 400, backgroundColor:'#1976d2', color:'white'};
  const textfieldStyle = {width: 400,  margin: '8px 0'};

  const [errors, setErrors] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function signup() {
    let result = await axios.post('http://localhost:8000/api/register', user);
    setErrors('Registration Successful');
    setUser({ name: '', email: '', password: '' });
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
          <h3 style={{ color: 'green' }}>{errors}</h3>
        </Grid>






        <TextField label="Name" name="name" style={textfieldStyle}  value={name} onChange={onInputChange} placeholder="Enter Name" />
        <TextField label="Email" name="email" style={textfieldStyle} value={email} onChange={onInputChange} placeholder="Enter Email" />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={onInputChange}
          placeholder="Enter Password"
          style={textfieldStyle}
        />

        

        <Button type="submit" onClick={signup} variant="contained" style={btnStyle} >
          Sign Up
        </Button>

        <Typography>
          Click Here for
          <Link to="/">
            <span style={{ marginLeft: '4px' }}>Login</span>
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
