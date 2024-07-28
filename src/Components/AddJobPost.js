import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

const JobPost = () => {

  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [vacancy, setVacancy] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await addDoc(collection(db, 'jobPosts'), {
        department,
        role,
        vacancy,
        createdAt: new Date(),
      });
      alert('Job post added successfully');
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
        Add Job Post
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Grid container spacing={2}>
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
              label="Role"
              variant="outlined"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Vacancy"
              variant="outlined"
              type="number"
              fullWidth
              value={vacancy}
              onChange={(e) => setVacancy(e.target.value)}
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
          Add Job Post
        </Button>
      </form>
    </Container>
    </div>
  );
};

export default JobPost;
