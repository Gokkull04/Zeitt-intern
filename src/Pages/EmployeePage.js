import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiCall } from '../Api';
import SearchBar from '../Helper/SearchBar';

const EmployeePage = () => {
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />

        <div className="text-center text-2xl font-semibold mb-6">Employee List</div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredEmpList?.map(emp => (
            <div
              key={emp._id}
              className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(`/emp-detail/${emp._id}`)}
            >
              <img
                className="w-full h-40 object-cover"
                src={emp.gender === "Male"
                  ? "https://cdn4.vectorstock.com/i/1000x1000/06/18/male-avatar-profile-picture-vector-10210618.jpg"
                  : "https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-woman-avatar-profile-female-face-icon-vector-illustration-226594813.jpg"}
                alt="Profile"
              />
              <div className="p-4">
                <div className="text-xl font-semibold text-gray-800">
                  {`${emp.firstName} ${emp.lastName}`}
                </div>
                <div className="text-gray-600 mt-1">{emp.address}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
