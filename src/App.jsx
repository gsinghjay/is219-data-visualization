import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Placeholder components - we'll implement these next
const Home = () => (
  <div className="container h-100 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
    <div className="text-center">
      <h1 className="display-4 mb-4">Food Safety Regulation Analysis</h1>
      <p className="lead mb-5">
        Comparing food safety regulations between the US and EU, and examining their potential health implications.
      </p>
      <div className="row g-4 justify-content-center">
        <div className="col-md-4">
          <div className="card rounded-0 h-100" style={{ aspectRatio: '1/1' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h5 className="card-title">Ingredients Comparison</h5>
              <p className="card-text text-center">
                Analysis of banned and allowed ingredients in both regions.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card rounded-0 h-100" style={{ aspectRatio: '1/1' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h5 className="card-title">Health Outcomes</h5>
              <p className="card-text text-center">
                Comparative analysis of health statistics and their potential correlation with food regulations.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card rounded-0 h-100" style={{ aspectRatio: '1/1' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <h5 className="card-title">Regulatory Timeline</h5>
              <p className="card-text text-center">
                Timeline of significant regulatory changes and their impacts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Ingredients = () => <div>Ingredients Comparison (Coming Soon)</div>;
const HealthOutcomes = () => <div>Health Outcomes Analysis (Coming Soon)</div>;
const Timeline = () => <div>Regulatory Timeline (Coming Soon)</div>;

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
