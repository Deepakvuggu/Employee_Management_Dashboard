# 🚀 EMS Pro - Employee Management System

A high-performance, professional dashboard for managing workforce data. This project features a clean "Google-inspired" user interface, secure authentication, and persistent local storage.



---

## 📖 Project Overview

**EMS Pro** is a comprehensive CRUD (Create, Read, Update, Delete) application designed for HR administrators. It streamlines the process of managing employee records, tracking employment status, and generating reports.

### Key Features:
* **Secure Access:** Protected routes ensure only authorized users can view sensitive data.
* **Real-time Analytics:** Summary cards that instantly update counts for Total, Active, and Inactive staff.
* **Dynamic Directory:** A searchable, filterable table for quick access to employee profiles.
* **Image Support:** Capability to upload and store employee profile pictures.
* **Data Persistence:** Uses Browser LocalStorage so data remains intact after refreshes or restarts.
* **Print Functionality:** Optimized CSS for printing professional employee lists.

---

## 🛠 Tech Stack

The project is built using modern web technologies focused on speed and maintainability:

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Frontend library for building the component-based UI. |
| **React Router 6** | Handles client-side routing and navigation guards. |
| **Context API** | Manages global state for both Authentication and Employee data. |
| **Local Storage** | Acts as the "Database" for client-side data persistence. |



---

## 🚀 Steps to Run Locally

Follow these instructions to set up the project on your local machine.

### 1. Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (LTS Version recommended)
* An IDE (like VS Code)

### 2. Installation
Clone the repository and install the necessary dependencies:

```bash
# Clone the repository
git clone [https://github.com/your-username/ems-pro.git](https://github.com/your-username/ems-pro.git)

# Navigate into the project folder
cd ems-pro

# Install dependencies
npm install

# Running the Project
npm run dev

# Credentials
Use the following credentials to access the protected dashboard:

Username: john@example.com

Password: password

#Project Structure
src/
├── context/         # AuthContext and EmployeeContext (Global State)
├── components/      # Reusable UI parts (Navbar, Sidebar, etc.)
├── pages/           # Main views: Login, Dashboard, EmployeeForm
├── css/             # External CSS for specialized styling
├── App.jsx          # Route definitions and Provider wrapping
└── main.jsx         # Application entry point


# SCREEN RECORDING
LINK - https://www.loom.com/share/bd615ce564b14040a5eb1a7b1a426120