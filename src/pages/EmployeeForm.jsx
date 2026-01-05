import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import './css/EmployeeForm.css';

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { employees, addEmployee, updateEmployee } = useEmployees();

    const [formData, setFormData] = useState({
        fullName: '',
        gender: 'Male',
        dob: '',
        state: '',
        active: true,
        image: null
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            const emp = employees.find(e => e.id === id);
            if (emp) setFormData(emp);
        }
    }, [id, employees]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setFormData({ ...formData, image: reader.result });
        reader.readAsDataURL(file);
    };

    const validate = () => {
        const temp = {};
        if (!formData.fullName) temp.fullName = 'Full Name is required';
        if (!formData.dob) temp.dob = 'Date of Birth is required';
        if (!formData.state) temp.state = 'State is required';
        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        id ? updateEmployee(formData) : addEmployee(formData);
        navigate('/dashboard');
    };

    return (
        <div className="form-page">
            <div className="form-card">
                <h2 className="form-title">
                    {id ? 'Edit Employee' : 'Add New Employee'}
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Image Upload */}
                    <div className="avatar-section">
                        <div className="avatar">
                            {formData.image
                                ? <img src={formData.image} alt="Preview" />
                                : <span>No Image</span>
                            }
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                        {errors.fullName && <p className="error">{errors.fullName}</p>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            />
                            {errors.dob && <p className="error">{errors.dob}</p>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <select
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        >
                            <option value="">Select State</option>
                            <option>Lagos</option>
                            <option>Abuja</option>
                            <option>Kano</option>
                            <option>Rivers</option>
                        </select>
                        {errors.state && <p className="error">{errors.state}</p>}
                    </div>

                    <div className="checkbox-row">
                        <input
                            type="checkbox"
                            checked={formData.active}
                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        />
                        <label>Active Employee</label>
                    </div>

                    <div className="button-row">
                        <button type="submit" className="btn-primary">
                            {id ? 'Save Changes' : 'Create Employee'}
                        </button>
                        <button type="button" className="btn-secondary" onClick={() => navigate('/dashboard')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
