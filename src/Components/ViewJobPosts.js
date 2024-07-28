import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, TextField } from '@mui/material';
import SearchBar from '../Helper/SearchBar';

const ViewJobPosts = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [filteredJobPosts, setFilteredJobPosts] = useState([]);
  const [editJobPostId, setEditJobPostId] = useState(null);
  const [editedJobPost, setEditedJobPost] = useState({
    department: '',
    role: '',
    vacancy: ''
  });

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

  const handleEditClick = (jobPost) => {
    setEditJobPostId(jobPost.id);
    setEditedJobPost(jobPost);
  };

  const handleCancelEdit = () => {
    setEditJobPostId(null);
    setEditedJobPost({
      department: '',
      role: '',
      vacancy: ''
    });
  };

  const handleChange = (e) => {
    setEditedJobPost({
      ...editedJobPost,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const jobPostRef = doc(db, 'jobPosts', editJobPostId);
      await updateDoc(jobPostRef, editedJobPost);
      setJobPosts(jobPosts.map(post =>
        post.id === editJobPostId ? { ...post, ...editedJobPost } : post
      ));
      handleCancelEdit();
      alert('Job post updated successfully');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'jobPosts', id));
      setJobPosts(jobPosts.filter(post => post.id !== id));
      alert('Job post deleted successfully');
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleSearch = (term) => {
    const filteredList = jobPosts.filter(post =>
      post.department.toLowerCase().includes(term.toLowerCase()) ||
      post.role.toLowerCase().includes(term.toLowerCase()) ||
      post.vacancy.toString().includes(term)
    );
    setFilteredJobPosts(filteredList);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">

      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">ZEITT</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center" className="my-4">
        View Job Posts
      </Typography>
      <Grid container spacing={4}>
        {filteredJobPosts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardContent>
                {editJobPostId === post.id ? (
                  <div>
                    <TextField
                      label="Department"
                      name="department"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={editedJobPost.department}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Role"
                      name="role"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={editedJobPost.role}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Vacancy"
                      name="vacancy"
                      variant="outlined"
                      type="number"
                      fullWidth
                      margin="normal"
                      value={editedJobPost.vacancy}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div>
                    <Typography variant="h5">
                      {post.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Department: ${post.department}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Vacancy: ${post.vacancy}`}
                    </Typography>
                  </div>
                )}
              </CardContent>
              <CardActions>
                {editJobPostId === post.id ? (
                  <>
                    <Button size="small" color="primary" onClick={handleSave}>
                      Save
                    </Button>
                    <Button size="small" color="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="small" color="primary" onClick={() => handleEditClick(post)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(post.id)}>
                      Delete
                    </Button>
                  </>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
};

export default ViewJobPosts;
