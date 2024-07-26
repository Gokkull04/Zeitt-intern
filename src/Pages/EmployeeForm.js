import { useEffect, useState } from 'react';
import { TextField, Box, Container, CssBaseline, InputLabel, MenuItem, FormHelperText, FormControl, Select, Radio, RadioGroup, FormControlLabel, FormLabel, Button } from '@mui/material';
import { emptyValidation, validateEmail, validateMobileNumber } from '../Helper/Validation';
import { GENDER, DEPARTMENT } from '../Helper/Constant';
import { getDetailApi, postApiCall, putApiCall } from '../Api';
import { useNavigate, useParams } from 'react-router-dom';


const EmployeeForm = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [firstName, setFirstName] = useState({
        name: "firstName",
        label: "First Name",
        id: "firstName",
        value: null,
        error: false,
        placeholder: "First Name",
    })

    const [lastName, setLastName] = useState({
        name: "lastName",
        label: "Last Name",
        id: "lastName",
        value: null,
        error: false,
        placeholder: "Enter Last Name",
    })

    const [department, setDepartment] = useState({
        name: "department",
        label: "Department",
        id: "department",
        labelId: "departmentLabel",
        value: null,
        error: false,
    })

    const [email, setEmail] = useState({
        name: "email",
        label: "Email Id",
        id: "email",
        value: null,
        error: false,
        placeholder: "Enter Email Id",
    })

    const [number, setNumber] = useState({
        name: "number",
        label: "Mobile Number",
        id: "number",
        value: null,
        error: false,
        placeholder: "Enter mobile number",
        type: "number"
    })

    const [gender, setGender] = useState({
        name: "gender",
        label: "Gender",
        id: "gender",
        "aria-labelledby": "gender",
        value: "Male",
        error: false,
        row: true
    })
    const [address, setAddress] = useState({
        name: "address",
        label: "Address",
        id: "address",
        value: null,
        error: false,
        placeholder: "Enter Address",
        multiline: true,
        rows: 4
    })

    const getEmpDetailData = async (param, subUrl) => {
        const response = await getDetailApi(param, subUrl)
        console.log(response?.data)

        setFirstName({ ...firstName, value: response?.data.firstName })
        setLastName({ ...lastName, value: response?.data.lastName })
        setDepartment({ ...department, value: response?.data.department })
        setEmail({ ...email, value: response?.data.email })
        setNumber({ ...number, value: response?.data.number })
        setAddress({ ...address, value: response?.data.address })
        setGender({ ...gender, value: response?.data?.gender })
    }


    useEffect(() => {
        if (id) {
            getEmpDetailData(id, "employeeList")
        }
    }, [])

    const onChangeHandle = (e) => {
        const { name, value } = e.target

        if (name === firstName.name) {
            setFirstName({
                ...firstName,
                value,
                error: emptyValidation(value)

            })
        }
        else if (name === lastName.name) {
            setLastName({
                ...lastName,
                value,
                error: emptyValidation(value)

            })
        }
        else if (name === department.name) {
            setDepartment({
                ...department,
                value,
                error: emptyValidation(value)

            })
        }
        else if (name === email.name) {
            setEmail({
                ...email,
                value,
                error: validateEmail(value)
            })
        }
        else if (name === number.name) {
            setNumber({
                ...number,
                value,
                error: validateMobileNumber(value)
            })
        }
        else if (name === gender.name) {
            setGender({
                ...gender,
                value,
                error: validateMobileNumber(value)
            })
        }
        else if (name === address.name) {
            setAddress({
                ...address,
                value,
                error: emptyValidation(value)
            })
        }
    }
    const sumbitData = async (param) => {
        const response = id ? await putApiCall(id, "employeeList", param) : await postApiCall(param, "employeeList")
        if (response) {
            navigate("/")
            alert(id ? "Employee Detail updated" : "Employee Added")
        }
    }

    const handleSubmit = () => {
        if (firstName.value && !firstName.error && lastName.value && !lastName.error && department.value && !department.error && gender.value && email.value && !email.error && address.value && !address.error && number.value && !number.error) {
            console.log("passed,we can call API");
            const payload = {
                firstName: firstName.value,
                lastName: lastName.value,
                department: department.value,
                address: address.value,
                email: email.value,
                number: number.value,
                gender: gender.value
            }
            console.log("payload=>", payload);
            sumbitData(payload)
        } else {
            if (!firstName.value) {
                setFirstName({ ...firstName, error: "This field is required" })
            }
            if (!lastName.value) {
                setLastName({ ...lastName, error: "This field is required" })
            }
            if (!department.value) {
                setDepartment({ ...department, error: "This field is required" })
            }
            if (!number.value) {
                setNumber({ ...number, error: "This field is required" })
            }
            if (!email.value) {
                setEmail({ ...email, error: "This field is required" })
            }
            if (!address.value) {
                setAddress({ ...address, error: "This field is required" })
            }

            console.log("fail");

        }

    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width: "100%", padding: "30px" }} >
                    <div style={{ textAlign: "center" }}>Add Employee Form</div>
                    <Box component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        autoComplete="off">
                        <TextField
                            {...firstName}
                            helperText={firstName.error}
                            onChange={onChangeHandle}
                        />
                        <TextField
                            {...lastName}
                            helperText={lastName.error}
                            onChange={onChangeHandle}
                        />
                        <FormControl sx={{ m: 1, minWidth: 225 }} error={department.error}>
                            <InputLabel id={department.labelId}>{department.label}</InputLabel>
                            <Select
                                {...department}
                                onChange={onChangeHandle}
                            >
                                <MenuItem value={null} disabled>Select Department</MenuItem>
                                {DEPARTMENT.map(item => <MenuItem value={item}>{item}</MenuItem>)}

                            </Select>
                            <FormHelperText>{department.error}</FormHelperText>
                        </FormControl>

                        <TextField
                            {...email}
                            helperText={email.error}
                            onChange={onChangeHandle}
                        />

                        <TextField
                            {...number}
                            helperText={number.error}
                            onChange={onChangeHandle}
                        />
                        <TextField
                            {...address}
                            helperText={address.error}
                            onChange={onChangeHandle}
                        />

                        <FormControl>
                            <FormLabel id={gender.id}>{gender.label}</FormLabel>
                            <RadioGroup
                                {...gender}
                                onChange={onChangeHandle}
                            >
                                {GENDER.map(item => <FormControlLabel value={item} control={<Radio />} label={item} />)}
                            </RadioGroup>
                        </FormControl>

                    </Box>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>

            </Container>
        </>
    )
}

export default EmployeeForm