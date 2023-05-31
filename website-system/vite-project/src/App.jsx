import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Index';
import Dashboard from './pages/Dashboard';
import AlumniDashboard from './pages/AlumniDashboard';
import Profile from './pages/userdashboard/Profile';
import Jobs from './pages/userdashboard/Jobs';
import Forum from './pages/userdashboard/Forum';

import DashboardAdmin from './pages/admindashboard/admin_dashboard'
import AlumniList from './pages/admindashboard/admin_alumni'
import JobsList from './pages/admindashboard/admin_jobs'
import ForumList from './pages/admindashboard/admin_forum'




function App() {
  return (
    <Router>
        <Routes>
          
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/Home" element={<Home/>}/>
          <Route exact path="/Signup" element={<Signup/>}/>
          {/* <Route exact path="/Dashboard" element={<Dashboard/>}/> */}

          {/* user */}
          <Route exact path="/AlumniDashboard" element={<AlumniDashboard/>}/>
          <Route exact path="/AlumniDashboard/Profile" element={<Profile/>}/>
          <Route exact path="/AlumniDashboard/Jobs" element={<Jobs/>}/>
          <Route exact path="/AlumniDashboard/Forum" element={<Forum/>}/>


          {/* admin */}
          <Route exact path="/Dashboard/Admin" element={<DashboardAdmin/>}/>
          <Route exact path="/Dashboard/AlumniList" element={<AlumniList/>}/>
          <Route exact path="/Dashboard/JobsList" element={<JobsList/>}/>
          <Route exact path="/Dashboard/ForumList" element={<ForumList/>}/>

        </Routes>
    </Router>
  );
}

export default App;
