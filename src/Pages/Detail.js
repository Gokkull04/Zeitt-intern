import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailApi, getDeleteApi } from '../Api';

const EmployeeDetail = ({ isAdmin }) => {
    const [empDetail, setEmpDetail] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const getEmpDetailData = async (param, subUrl) => {
        const response = await getDetailApi(param, subUrl);
        setEmpDetail(response?.data);
    };

    useEffect(() => {
        getEmpDetailData(id, "employeeList");
    }, [id]);

    const handleDelete = async () => {
        const response = await getDeleteApi(id, "employeeList");
        if (response.status === 200) {
            navigate("/employee");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <Button 
                    variant="outlined" 
                    className="mb-4" 
                    onClick={() => navigate("/employee")}
                >
                    Employee List
                </Button>

                <h2 className="text-2xl font-semibold mb-4 text-center">Employee Detail</h2>

                <div className="space-y-4 mb-4">
                    <div className="text-lg font-medium">Full Name: {empDetail.firstName} {empDetail.lastName}</div>
                    <div className="text-lg font-medium">Department: {empDetail.department}</div>
                    <div className="text-lg font-medium">Address: {empDetail.address}</div>
                    <div className="text-lg font-medium">Mobile Number: {empDetail.number}</div>
                    <div className="text-lg font-medium">Gender: {empDetail.gender}</div>
                    <div className="text-lg font-medium">Email: {empDetail.email}</div>
                </div>

                {isAdmin && (
                    <div className="flex justify-center space-x-4">
                        <Button 
                            variant="outlined" 
                            className="w-full max-w-xs"
                            onClick={() => navigate(`/edit/${empDetail._id}`)}
                        >
                            Edit
                        </Button>
                        <Button 
                            variant="outlined" 
                            className="w-full max-w-xs"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeDetail;
