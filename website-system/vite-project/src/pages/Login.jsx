import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';


import cecIcon from '../assets/images/csd_logo.png';
import { FormatBold } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  cecIcon: {
    width: 200,
    height: 200,
    marginBottom: 10,
  }
}));

const Login = () => {

  useEffect(() => {
    window.onpopstate = () => {
      window.location.replace('/');
    };
  }, []);

  const classes = useStyles();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      alert('Email Address Field is empty');
      return; 
    } else if (password === '') {
      alert('Password Field is empty');
      return; 
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
      
    
      console.log(response.data); // Handle the response data 
    
      const { role } = response.data; // Get the role from the response
      // localStorage.setItem("users", response.data);

    
      if (role === 'admin') {
        navigate('/dashboard');        
      } else {
        sessionStorage.setItem("id", response.data.id)
        sessionStorage.setItem("name", response.data.name)
        sessionStorage.setItem("email", response.data.email)
        sessionStorage.setItem("location", response.data.location)
        sessionStorage.setItem("linkedin", response.data.linkedin)
        sessionStorage.setItem("work", response.data.work)
        sessionStorage.setItem("bio", response.data.bio)
        sessionStorage.setItem("batch", response.data.batch)
        sessionStorage.setItem("journal", response.data.journal)
        navigate('/AlumniDashboard'); 
        
      }
    
    } catch (error) {
      if (error.response && error.response.data) {
        //display an error alert
        window.alert(error.response.data.message); // Display the error message from the response
      } else {
        window.alert('An error occurred during login.'); // Fallback error message
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
      csrf
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={cecIcon} alt="Logo" className={classes.cecIcon}/>

        <Typography component="h1" variant="h5" style={{ marginTop: '10px'}}>
          Computer Studies Department
        </Typography>
        <Typography variant="h5" style={{fontWeight: 'bold' }}>
          Alumni Information System
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onInputChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button type="submit" onClick={handleSubmit} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;


  // const [msg, setMsg] = useState('');

  // const [username, setUsername] = useState("");
  // const [pass, setPass] = useState("");

  // const [user, setUser] = useState({
  //   email: "",
  //   password: ""
  // });

  // let navigate = useNavigate();

  // const {email,password} = user;
  // const onInputChange = e => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  // const signIn = () =>
  // {
  //   const users = { username};
  //   if(user.email === '')
  //   {
  //     alert('Email field is empty')
  //   }
  //   else if(user.password === '')
  //   {
  //     alert('Pass Field is empty')
  //   }

  //   axios.post("http://localhost:8000/api/login", user)
  //   .then(response => {
  //     setMsg(response.data);
  //     localStorage.setItem("users", response.data);
  //       if (role === 'admin') {
  //         navigate('/Dashboard');        
  //       } else {
  //         navigate('/AlumniDashboard'); 
  //       }
  //   });

  // }