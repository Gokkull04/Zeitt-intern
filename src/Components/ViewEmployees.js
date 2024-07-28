import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid, TextField, Box } from '@mui/material';
import SearchBar from '../Helper/SearchBar';

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    firstName: '',
    lastName: '',
    department: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'employees'));
        const employeesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEmployees(employeesList);
        setFilteredEmployees(employeesList);
      } catch (error) {
        console.error('Error fetching employees: ', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setEditEmployeeId(employee.id);
    setEditedEmployee(employee);
  };

  const handleCancelEdit = () => {
    setEditEmployeeId(null);
    setEditedEmployee({
      firstName: '',
      lastName: '',
      department: '',
      email: '',
      phoneNumber: ''
    });
  };

  const handleChange = (e) => {
    setEditedEmployee({
      ...editedEmployee,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const employeeRef = doc(db, 'employees', editEmployeeId);
      await updateDoc(employeeRef, editedEmployee);
      setEmployees(employees.map(emp =>
        emp.id === editEmployeeId ? { ...emp, ...editedEmployee } : emp
      ));
      handleCancelEdit();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'employees', id));
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const handleSearch = (term) => {
    const filteredList = employees.filter(emp =>
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(term.toLowerCase()) ||
      emp.department.toLowerCase().includes(term.toLowerCase()) ||
      emp.email.toLowerCase().includes(term.toLowerCase()) ||
      emp.phoneNumber.includes(term)
    );
    setFilteredEmployees(filteredList);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
 
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">ZEITT</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom align="center" className="my-4">
          View Employees
        </Typography>
        <Grid container spacing={4}>
          {filteredEmployees.map(emp => (
            <Grid item xs={12} sm={6} md={4} key={emp.id}>
              <Card>
                <CardContent>
                  {editEmployeeId === emp.id ? (
                    <div>
                      <TextField
                        label="First Name"
                        name="firstName"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedEmployee.firstName}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Last Name"
                        name="lastName"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedEmployee.lastName}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Department"
                        name="department"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={editedEmployee.department}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={editedEmployee.email}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        variant="outlined"
                        type="tel"
                        fullWidth
                        margin="normal"
                        value={editedEmployee.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  ) : (
                    <div>
                      <Typography variant="h5">
                        {`${emp.firstName} ${emp.lastName}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Department: ${emp.department}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Email: ${emp.email}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Phone: ${emp.phoneNumber}`}
                      </Typography>
                    </div>
                  )}
                </CardContent>
                <CardActions>
                  {editEmployeeId === emp.id ? (
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
                      <Button size="small" color="primary" onClick={() => handleEditClick(emp)}>
                        Edit
                      </Button>
                      <Button size="small" color="error" onClick={() => handleDelete(emp.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
    </div>
  );
};

export default ViewEmployees;
