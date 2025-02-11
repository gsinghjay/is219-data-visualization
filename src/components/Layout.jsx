import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

/**
 * Layout component that provides the main structure for the application
 * Includes navigation and content area using Bootstrap 5
 */
const Layout = () => {
  return (
    <div className="min-vh-100">
      <Navigation />
      <main className="h-100">
        <div className="container-fluid px-0 rounded-0">
          <div className="container rounded-0">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="bg-white py-3 border-top rounded-0">
        <div className="container text-center text-muted">
          Food Safety Regulation Analysis - US vs EU by <a href="https://github.com/gsinghjay/is219-data-visualization">Jay Singh (js426)</a>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 