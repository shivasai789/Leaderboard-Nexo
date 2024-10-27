import React from "react";
import { Navigate } from "react-router-dom"; 

function ProtectedRoute({ element, ...rest }) {
    const token = localStorage.getItem('token')
    
    if (token) {
        return element;
    }
    
    return <Navigate to="/login" />;
}

export default ProtectedRoute;
