import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  // Helper to highlight the active button
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg shadow-sm mb-4">
      <div className="container">
        {/* 1. Added icon and consistent naming */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <i className="bi bi-people-fill me-2 text-success"></i>
          Employee Manager
        </Link>

        {/* 2. Grouped buttons for better spacing */}
        <div className="d-flex gap-2">
          <Link 
            className={`btn btn-sm btn-outline-light ${isActive('/')}`} 
            to="/"
          >
            <i className="bi bi-list-ul me-1"></i> View List
          </Link>
          
          <Link 
            className={`btn btn-sm btn-success ${isActive('/add-employee')}`} 
            to="/add-employee"
          >
            <i className="bi bi-plus-circle me-1"></i> New Employee
          </Link>

          <Link 
            className={`btn btn-sm btn-success ${isActive('/crud')}`} 
            to="/crud"
          >
            <i className="bi bi-plus-circle me-1"></i> CRUD
          </Link>
          <Link 
            className={`btn btn-sm btn-success ${isActive('/task-list')}`} 
            to="/task-list"
          >
            <i className="bi bi-plus-circle me-1"></i> Task List
          </Link>
          <Link 
            className={`btn btn-sm btn-outline-light ${isActive('/add-task')}`} 
            to="/add-task"
          >
            <i className="bi bi-list-ul me-1"></i> Create Task
          </Link>
         
        </div>
      </div>
    </nav>
  );
}

export default Header;
