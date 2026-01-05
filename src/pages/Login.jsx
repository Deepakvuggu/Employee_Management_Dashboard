import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const demoEmployees = [
    { id: 'emp001', email: 'john.doe@example.com', password: 'password123' },
    { id: 'emp002', email: 'jane.smith@example.com', password: 'securepass' },
];

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple authentication check
        const employee = demoEmployees.find(
            (emp) =>
                (emp.id === username || emp.email === username) &&
                emp.password === password
        );

        if (employee) {
            // Optional: Save login state in localStorage
            localStorage.setItem('loggedInEmployee', JSON.stringify(employee));

            navigate('/dashboard');
        } else {
            setError('Invalid employee ID/email or password');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h2>Employee Login</h2>
                    <p>Sign in to access your employee dashboard</p>
                </div>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Employee ID / Email</label>
                        <input
                            type="text"
                            placeholder="Enter your employee ID or email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <div className="login-footer">
                    <p>© 2026 Employee Management System</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
