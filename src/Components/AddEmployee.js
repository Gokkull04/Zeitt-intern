import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await addDoc(collection(db, 'employees'), {
        firstName,
        lastName,
        department,
        email,
        phoneNumber,
        createdAt: new Date(),
      });

      alert('Employee added successfully');

      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">ZEITT</h1>
      </div>
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center" className="my-4">
        Add Employee
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Department"
              variant="outlined"
              fullWidth
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              variant="outlined"
              type="tel"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
        >
          Add Employee
        </Button>
      </form>
    </Container>
    </div>
  );
};

export default AddEmployee;
