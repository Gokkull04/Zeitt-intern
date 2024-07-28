import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminDashboard from './Admin/AdminDashboard';
import AddEmployee from './Components/AddEmployee';
import AddJobPost from './Components/AddJobPost';
import AdminLogin from './Admin/AdminLogin'
import ViewEmployees from './Components/ViewEmployees'
import ViewJobPosts from './Components/ViewJobPosts'
import EmployeeDashboard from './Employee/EmployeeDashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/add-job-post" element={<AddJobPost />} />
        <Route path="/view-employees" element={<ViewEmployees />} />
        <Route path="/view-job-posts" element={<ViewJobPosts />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
