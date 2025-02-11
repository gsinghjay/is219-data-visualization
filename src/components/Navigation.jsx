import { NavLink } from 'react-router-dom';

/**
 * Navigation component providing links to different sections of the application
 * Using Bootstrap 5's navbar component
 */
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold">
          Food Safety Analysis
        </NavLink>
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/ingredients"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Ingredients
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/health-outcomes"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Health Outcomes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/timeline"
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                Regulatory Timeline
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
