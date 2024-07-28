import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import SearchBar from '../Helper/SearchBar';

const JobVacancy = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'jobPosts'));
        const jobPostsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobPosts(jobPostsList);
        setFilteredJobPosts(jobPostsList);
      } catch (error) {
        console.error('Error fetching job posts: ', error);
      }
    };

    fetchJobPosts();
  }, []);

  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filteredList = jobPosts.filter(post =>
      post.role.toLowerCase().includes(lowerCaseTerm) ||
      post.department.toLowerCase().includes(lowerCaseTerm) ||
      post.vacancy.toString().includes(lowerCaseTerm)
    );
    setFilteredJobPosts(filteredList);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">ZEITT</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <Container maxWidth="md" className="flex-grow p-4">
        <Typography variant="h4" gutterBottom align="center" className="my-4">
          Job Vacancies
        </Typography>
        <Grid container spacing={4}>
          {filteredJobPosts.map(post => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">
                    {post.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Department: ${post.department}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Vacancy: ${post.vacancy}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default JobVacancy;
