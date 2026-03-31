import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg shadow-sm mb-4">
      <div className="container">
        {/* 1. Changed <a> to <Link> to avoid page reloads */}
        <Link className="navbar-brand fw-bold" to="/">
          🎓 Student Manager
        </Link>

        {/* 2. Standard navigation container */}
        <div className="d-flex">
          <Link className="btn btn-outline-light me-3" to="/">
            View List
          </Link>
          
          {/* 3. Ensure 'to' matches your route name (e.g., /add-student or /create) */}
          <Link className="btn btn-success  me-3" to="/add-student">
            + New Student
          </Link>
    
          <Link className="btn btn-success me-3" to="/self-check">
            Self Check
          </Link>
          <Link className="btn btn-success me-3" to="/test">Test</Link>

          <Link className="btn btn-success me-3" to="/final-test">Final Test</Link>
       
        </div>
      </div>
    </nav>
  );
}

export default Header;
