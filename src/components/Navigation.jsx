import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faChartLine, faTimeline, faUtensils } from '@fortawesome/free-solid-svg-icons';

/**
 * Navigation component providing links to different sections of the application
 * Using Bootstrap 5's navbar component with enhanced styling and active states
 */
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <FontAwesomeIcon icon={faUtensils} className="me-2 text-primary" />
          <span className="fw-bold">Food Safety Analysis</span>
        </NavLink>
        
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <NavLink
                to="/ingredients"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${isActive ? 'active bg-primary bg-opacity-10' : ''}`
                }
              >
                <FontAwesomeIcon icon={faFlask} className="me-2 text-primary" />
                <span>Ingredients</span>
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="/health-outcomes"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${isActive ? 'active bg-success bg-opacity-10' : ''}`
                }
              >
                <FontAwesomeIcon icon={faChartLine} className="me-2 text-success" />
                <span>Health Outcomes</span>
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                to="/timeline"
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill ${isActive ? 'active bg-warning bg-opacity-10' : ''}`
                }
              >
                <FontAwesomeIcon icon={faTimeline} className="me-2 text-warning" />
                <span>Regulatory Timeline</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
