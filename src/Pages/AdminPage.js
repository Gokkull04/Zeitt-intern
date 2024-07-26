import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiCall } from '../Api';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import SearchBar from '../Helper/SearchBar';

const Adminpage = () => {
  const [empList, setEmpList] = useState([]);
  const [filteredEmpList, setFilteredEmpList] = useState([]);
  const navigate = useNavigate();

  const getEmpData = async (param) => {
    const response = await getApiCall(param);
    setEmpList(response?.data);
    setFilteredEmpList(response?.data);
  };

  useEffect(() => {
    getEmpData("employeeList");
  }, []);

  const handleSearch = (term) => {
    const filteredList = empList.filter(emp => 
      emp.firstName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredEmpList(filteredList);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-4 px-2 bg-gray-100">
      <div className="w-full max-w-screen-lg p-4">
        <div className="flex justify-center mb-4">
          <Button 
            variant="outlined" 
            onClick={() => navigate("/add")} 
            className="mb-4"
          >
            Add Employee
          </Button>
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="text-2xl font-semibold text-center mb-6">
          Employee Homepage
        </div>
        <Grid container spacing={4} justifyContent="center">
          {filteredEmpList?.map(emp =>
            <Grid item xs={12} sm={6} md={4} key={emp._id}>
              <Card 
                className="cursor-pointer max-w-xs mx-auto" 
                onClick={() => navigate(`/emp-detail/${emp._id}`)}
              >
                <CardMedia
                  className="h-36"
                  image={emp.gender === "Male" 
                    ? "https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg" 
                    : "https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-woman-avatar-profile-female-face-icon-vector-illustration-226594813.jpg"}
                  title="Profile Picture"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${emp.firstName} ${emp.lastName}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {emp.address}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Adminpage;
