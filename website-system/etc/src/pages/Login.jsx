import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.email === "") {
      alert("Email Address Field is empty");
      return; // Stop form submission
    } else if (user.password === "") {
      alert("Password Field is empty");
      return; // Stop form submission
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      console.log(response.data); // Handle the response data as needed

      // If login is successful, redirect to a new page
      history.push("/dashboard"); // Replace '/dashboard' with your desired route
    } catch (error) {
      if (error.response && error.response.data) {
        // If login fails, display an error alert
        window.alert("Incorrect username or password"); // Assuming the error message is returned as 'message' property in the response
      } else {
        window.alert("An error occurred during login."); // Fallback error message
      }
    }
  };
      
      // Inside your component

    return (
        
      <Container component="main" maxWidth="xs">
        <Box
        
          sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Typography component="h1" variant="h5">
            
            Alumni Information System
            <h4 style={{color:"green"}}></h4>

          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              onChange={e => onInputChange(e)}
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
              onChange={e => onInputChange(e)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}

export default Login;
