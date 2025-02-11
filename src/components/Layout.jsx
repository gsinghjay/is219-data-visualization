import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/**
 * Layout component that provides the main structure for the application
 * Includes navigation and content area using Bootstrap 5
 */
const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navigation />
      <main className="container py-4 flex-grow-1">
        <Outlet />
      </main>
      <footer className="bg-white py-3 mt-auto border-top">
        <div className="container text-center text-muted">
          Food Safety Regulation Analysis - US vs EU
        </div>
      </footer>
    </div>
  );
};

export default Layout;
