import React, { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import './css/Dashboard.css';

const Dashboard = () => {
    const { employees, deleteEmployee } = useEmployees();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender = genderFilter === 'All' || emp.gender === genderFilter;
        const matchesStatus =
            statusFilter === 'All' ||
            (statusFilter === 'Active' ? emp.active : !emp.active);

        return matchesSearch && matchesGender && matchesStatus;
    });

    const activeCount = employees.filter(e => e.active).length;

    return (
        <div className="dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <h1>Employee Dashboard</h1>
                <p>Manage employees, roles, and activity</p>
            </div>

            {/* Stats */}
            <div className="stats">
                <div className="stat-card blue">
                    <p>Total Employees</p>
                    <h3>{employees.length}</h3>
                </div>
                <div className="stat-card green">
                    <p>Active Employees</p>
                    <h3>{activeCount}</h3>
                </div>
                <div className="stat-card gray">
                    <p>Inactive Employees</p>
                    <h3>{employees.length - activeCount}</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="dashboard-filters">
                <input
                    type="text"
                    placeholder="Search employees…"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="dashboard-search-input"
                />

                <select
                    className="dashboard-filter-select"
                    onChange={(e) => setGenderFilter(e.target.value)}
                >
                    <option value="All">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <select
                    className="dashboard-filter-select"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                <div className="dashboard-filter-actions">
                    <button
                        onClick={() => navigate('/add-employee')}
                        className="dashboard-add-btn"
                    >
                        + Add Employee
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="dashboard-print-btn"
                    >
                        Print
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Profile</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>State</th>
                            <th>Status</th>
                            <th className="right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.length ? (
                            filteredEmployees.map(emp => (
                                <tr key={emp.id}>
                                    <td>
                                        <div className="avatar">
                                            {emp.image
                                                ? <img src={emp.image} alt={emp.fullName} />
                                                : emp.fullName[0]}
                                        </div>
                                    </td>
                                    <td className="name">{emp.fullName}</td>
                                    <td>{emp.gender}</td>
                                    <td>{emp.state}</td>
                                    <td>
                                        <span className={`status ${emp.active ? 'active' : 'inactive'}`}>
                                            {emp.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="right">
                                        <button
                                            className="link edit"
                                            onClick={() => navigate(`/edit-employee/${emp.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="link delete"
                                            onClick={() => {
                                                if (window.confirm(`Delete ${emp.fullName}?`)) {
                                                    deleteEmployee(emp.id);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="empty">
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
