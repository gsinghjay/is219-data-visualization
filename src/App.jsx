import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faChartLine, faTimeline } from '@fortawesome/free-solid-svg-icons';
import Layout from './components/Layout';

// Placeholder components - we'll implement these next
const Home = () => (
  <div className="container-fluid h-100 d-flex align-items-center justify-content-center py-5" style={{ minHeight: '80vh' }}>
    <div className="text-center w-100">
      <h1 className="display-4 mb-4">Food Safety Regulation Analysis</h1>
      <p className="lead mb-5">
        Comparing food safety regulations between the US and EU, and examining their potential health implications.
      </p>
      <div className="row g-4 justify-content-center mx-0">
        <div className="col-md-4 px-4">
          <div className="card rounded-0 h-100" style={{ aspectRatio: '1/1' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <FontAwesomeIcon icon={faFlask} className="fa-3x mb-3" />
              <h5 className="card-title">Ingredients Comparison</h5>
              <p className="card-text text-center">
                Interactive table comparing banned and allowed ingredients in both regions.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 px-4">
          <div className="card rounded-0 h-100" style={{ aspectRatio: '1/1' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <FontAwesomeIcon icon={faChartLine} className="fa-3x mb-3" />
              <h5 className="card-title">Health Outcomes</h5>
              <p className="card-text text-center">
                Side-by-side bar charts comparing health outcomes between regions.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 px-4">
          <div className="card rounded-0 h-100" style={{ aspectRatio: '1/1' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <FontAwesomeIcon icon={faTimeline} className="fa-3x mb-3" />
              <h5 className="card-title">Regulatory Timeline</h5>
              <p className="card-text text-center">
                Timeline visualization of significant regulatory changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Create placeholder components for each visualization section
const Ingredients = () => (
  <div className="container py-4">
    <h2>Ingredients Comparison</h2>
    <p className="lead">
      Interactive table comparing banned and allowed ingredients between US and EU food regulations.
    </p>
    <div className="alert alert-info">
      Visualization coming soon. This section will feature an interactive table showing:
      <ul className="mb-0 mt-2">
        <li>Banned ingredients in each region</li>
        <li>Allowed ingredients with different restrictions</li>
        <li>Filtering and search capabilities</li>
      </ul>
    </div>
  </div>
);

const HealthOutcomes = () => (
  <div className="container py-4">
    <h2>Health Outcomes Analysis</h2>
    <p className="lead">
      Side-by-side bar charts comparing health statistics between US and EU populations.
    </p>
    <div className="alert alert-info">
      Visualization coming soon. This section will feature bar charts comparing:
      <ul className="mb-0 mt-2">
        <li>Key health metrics between regions</li>
        <li>Trends over time</li>
        <li>Statistical correlations with regulations</li>
      </ul>
    </div>
  </div>
);

const Timeline = () => (
  <div className="container py-4">
    <h2>Regulatory Timeline</h2>
    <p className="lead">
      Timeline of significant food safety regulatory changes in both regions.
    </p>
    <div className="alert alert-info">
      Visualization coming soon. This section will feature a timeline showing:
      <ul className="mb-0 mt-2">
        <li>Major regulatory changes</li>
        <li>Implementation dates</li>
        <li>Impact assessments</li>
      </ul>
    </div>
  </div>
);

/**
 * Main App component with routing configuration
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="health-outcomes" element={<HealthOutcomes />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
