import React from 'react'
import {Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, } from "react-router-dom";
import {useState} from 'react';
import axios from 'axios';

const Index=()=>{

    const paperStyle = {padding: 20, height: '70vh', width:200, margin:"20px auto"}
    const avatarStyle = {backgroundColor: '#3370bd'}
    const btnStyle = {margin: '8px 0'}

    const[errors, setErrors] = useState('');
    const [users, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const {name, email, password} = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value});

    }

    async function Signup()
        {
            let result = await axios.post("https://localhost:8000/api/register", users);
            setErrors('Registration Successful')
            setUser({name:"", email:"", password:""})
        }
    
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign Up</h2>
                    <h3 style={{color:green}}>{errors}</h3>
                </Grid>

                <TextField label='Name' name="name" value={name} onChange={e => onInputChange(e)} placeholder='Enter Name'></TextField>
                <TextField label='Email' name="email" value={email} onChange={e => onInputChange(e)} placeholder='Enter Email'></TextField>
                <TextField label='Password' name="password" value={password} onChange={e => onInputChange(e)} placeholder='Enter Password'></TextField>

                <Button type='submit' onClick={Signup} colors='primary' variant="contained" style={btnStyle} fullWidth></Button>

                <Typography>
                    Click Here for
                    <Link to="/">
                        <span style={{marginLeft:"4px"}}>Login</span>
                    </Link>
                </Typography>

            </Paper>
        </Grid>
    )
}

export default Index;
