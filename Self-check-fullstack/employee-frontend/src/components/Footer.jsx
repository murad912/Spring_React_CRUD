function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <p className="mb-0 opacity-75">
            <i className="bi bi-people-fill me-2"></i>
            Employee Management System &copy; {currentYear}
          </p>
          <small className="text-secondary">Efficiently managing your workforce</small>
        </div>
      </footer>
    );
  }
  
  export default Footer;