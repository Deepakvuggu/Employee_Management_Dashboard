///This component checks if a user is logged in before rendering the dashboard - otherwise, it redirects them to login.

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;