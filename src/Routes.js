import {
    createBrowserRouter,
} from "react-router-dom";
import Detail from "./Pages/Detail";
import EmployeeForm from "./Pages/EmployeeForm";
import AdminPage from "./Pages/AdminPage";
import AdminLogin from "./Pages/AdminLogin"
import Home from "./Pages/Home"; 
import EmployeePage from "./Pages/EmployeePage";


export const router = createBrowserRouter([
    {
        path: "*",
        element: <div>No page found</div>,
    },
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/login",
        element: <AdminLogin />
    },
    {
        path: "/employee",
        element: <EmployeePage />
    },
    {
        path: "/admin",
        element: <AdminPage />
    },
    {
        path: "/add",
        element: <EmployeeForm />
    },
    {
        path: "/emp-detail/:id",
        element: <Detail />
    },
    {
        path: "/edit/:id",
        element: <EmployeeForm />
    },
]);