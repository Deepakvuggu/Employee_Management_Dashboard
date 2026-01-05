import React, { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    // Initial Mock Data
    const [employees, setEmployees] = useState(() => {
        const saved = localStorage.getItem('employees');
        return saved ? JSON.parse(saved) : [
            { id: '1', fullName: 'John Doe', gender: 'Male', dob: '1990-05-15', state: 'Lagos', active: true, image: null },
            { id: '2', fullName: 'Jane Smith', gender: 'Female', dob: '1992-08-20', state: 'Abuja', active: false, image: null }
        ];
    });

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    const addEmployee = (emp) => setEmployees([...employees, { ...emp, id: Date.now().toString() }]);

    const updateEmployee = (updatedEmp) => {
        setEmployees(employees.map(emp => emp.id === updatedEmp.id ? updatedEmp : emp));
    };

    const deleteEmployee = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeeContext);