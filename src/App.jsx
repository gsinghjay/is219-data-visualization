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
        Analyzing the relationship between food regulations in the US and EU, focusing on allowed ingredients,
        obesity rates, and public health outcomes.
      </p>
      <div className="row g-4 justify-content-center mx-0">
        <div className="col-md-4 px-4">
          <div className="card rounded-0 h-100" style={{ aspectRatio: '1/1' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <FontAwesomeIcon icon={faFlask} className="fa-3x mb-3" />
              <h5 className="card-title">Ingredients Analysis</h5>
              <p className="card-text text-center">
                Compare allowed and banned food additives between regions, including GRAS substances and E-numbers.
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
                Visualize obesity trends, mortality rates, and chronic disease prevalence across regions.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 px-4">
          <div className="card rounded-0 h-100" style={{ aspectRatio: '1/1' }}>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <FontAwesomeIcon icon={faTimeline} className="fa-3x mb-3" />
              <h5 className="card-title">Regulatory Impact</h5>
              <p className="card-text text-center">
                Track policy changes and their correlation with public health metrics over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Ingredients = () => (
  <div className="container py-4">
    <h2>Food Ingredients Analysis</h2>
    <p className="lead">
      Comprehensive comparison of food additives regulation between US and EU regions.
    </p>
    
    <div className="row mt-4">
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-header bg-warning text-dark">
            <h5 className="mb-0">High-Risk Substances</h5>
          </div>
          <div className="card-body">
            <p>Found 46 substances that are allowed in the US but are considered high-risk in the EU, with strict usage limits.</p>
            <h6 className="mt-3">Notable Examples:</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>Hydroxypropyl methyl cellulose</strong> (CAS: 9004-65-3)
                <br />
                <small className="text-muted">Limited to 10 mg/kg in fresh fruits and vegetables in the EU</small>
              </li>
              <li className="list-group-item">
                <strong>Silicon dioxide</strong> (CAS: 7631-86-9)
                <br />
                <small className="text-muted">Limited to 30 mg/kg in seasonings and condiments in the EU</small>
              </li>
              <li className="list-group-item">
                <strong>Dimethyl polysiloxane</strong> (CAS: 9016-00-6)
                <br />
                <small className="text-muted">Limited to 10 mg/kg/l in various categories:</small>
                <ul className="mt-1 small">
                  <li>Fruit juices</li>
                  <li>Confectionery</li>
                  <li>Fruit/vegetable spreads</li>
                  <li>Fats and oils</li>
                  <li>Decorations and coatings</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-header bg-info text-dark">
            <h5 className="mb-0">Regulatory Differences</h5>
          </div>
          <div className="card-body">
            <h6>Banned Substances</h6>
            <p>No direct matches found between banned substances in both regions, likely due to:</p>
            <ul>
              <li>Different naming conventions between regulatory bodies</li>
              <li>Different approaches to regulation (outright bans vs. usage restrictions)</li>
              <li>Specific subset of data (indirect additives vs. all additives)</li>
            </ul>
            
            <h6 className="mt-4">Data Structure Differences</h6>
            <ul>
              <li>US data uses CAS Registry Numbers as unique chemical identifiers</li>
              <li>EU data uses E-numbers and focuses on usage restrictions by category</li>
              <li>Both datasets include various synonyms and alternative names</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="alert alert-info mt-4">
      <h5>Data Sources:</h5>
      <ul className="mb-0 mt-2">
        <li>FDA Food Additive Database</li>
        <li>EU Food Additives Database (E-numbers)</li>
        <li>GRAS (Generally Recognized as Safe) Substances</li>
      </ul>
    </div>
    
    <div className="mt-4">
      <h5>Upcoming Visualizations:</h5>
      <ul>
        <li>Interactive comparison table of allowed vs banned ingredients</li>
        <li>Usage restrictions and limits visualization</li>
        <li>Approval timeline comparison</li>
      </ul>
    </div>
  </div>
);

const HealthOutcomes = () => (
  <div className="container py-4">
    <h2>Health Outcomes Analysis</h2>
    <p className="lead">
      Analysis of public health metrics and their potential correlation with food regulations.
    </p>
    <div className="alert alert-info">
      <h5>Key Metrics:</h5>
      <ul className="mb-0 mt-2">
        <li>Obesity rates (adult and childhood)</li>
        <li>Cardiovascular disease prevalence</li>
        <li>Cancer rates (diet-related)</li>
        <li>Diabetes prevalence</li>
      </ul>
    </div>
    <div className="mt-4">
      <h5>Data Sources:</h5>
      <ul>
        <li>WHO Global Health Observatory</li>
        <li>CDC National Center for Health Statistics</li>
        <li>Regional health databases</li>
      </ul>
    </div>
  </div>
);

const Timeline = () => (
  <div className="container py-4">
    <h2>Regulatory Impact Assessment</h2>
    <p className="lead">
      Timeline analysis of regulatory changes and corresponding health outcomes.
    </p>
    <div className="alert alert-info">
      <h5>Analysis Focus:</h5>
      <ul className="mb-0 mt-2">
        <li>Major policy implementation dates</li>
        <li>Changes in health metrics following regulatory changes</li>
        <li>Cross-regional policy comparison</li>
      </ul>
    </div>
    <div className="mt-4">
      <h5>Visualization Features:</h5>
      <ul>
        <li>Interactive timeline of policy changes</li>
        <li>Health metric overlays</li>
        <li>Impact assessment indicators</li>
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
