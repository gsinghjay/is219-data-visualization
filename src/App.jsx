import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faChartLine, faTimeline, faFileAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import React from 'react';
import Layout from './components/Layout';
import IngredientsVisuals from './components/visualizations/IngredientsVisuals';

// Add CSS styles for modal
const modalStyles = {
  modal: {
    zIndex: 1050,
  },
  backdrop: {
    zIndex: 1040,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
};

// Data Sources Modal Component
const DataSourcesModal = ({ show, onHide }) => {
  if (!show) return null;

  // Handle click outside modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onHide();
    }
  };
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [show]);
  
  return (
    <>
      <div 
        className={`modal ${show ? 'd-block' : ''}`} 
        tabIndex="-1" 
        role="dialog" 
        onClick={handleBackdropClick}
        style={modalStyles.modal}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Food Additives Data Sources</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onHide} 
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="list-group">
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <h6 className="mb-1">US Food Additives</h6>
                    <a 
                      href="/data/raw/us-food-additives/indirect-additives.csv" 
                      className="btn btn-sm btn-outline-primary" 
                      download
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                      Download CSV
                    </a>
                  </div>
                  <p className="mb-1 small text-muted">Comprehensive list of indirect food additives regulated by the FDA</p>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <h6 className="mb-1">EU High-Risk Additives</h6>
                    <a 
                      href="/data/processed/eu-food-additives/eu_high_risk_additives.csv" 
                      className="btn btn-sm btn-outline-primary" 
                      download
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                      Download CSV
                    </a>
                  </div>
                  <p className="mb-1 small text-muted">List of food additives considered high-risk in the EU with usage restrictions</p>
                </div>
                <div className="list-group-item">
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <h6 className="mb-1">US-EU Comparison Data</h6>
                    <a 
                      href="/data/processed/comparison/us_eu_comparison.csv" 
                      className="btn btn-sm btn-outline-primary" 
                      download
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                      Download CSV
                    </a>
                  </div>
                  <p className="mb-1 small text-muted">Comparative analysis of food additive regulations between US and EU</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <div 
          className="modal-backdrop"
          onClick={onHide}
          style={modalStyles.backdrop}
        ></div>
      )}
    </>
  );
};

// Placeholder components - we'll implement these next
const Home = () => {
  const [showDataSourcesModal, setShowDataSourcesModal] = useState(false);
  
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="text-center">
            <h1 className="display-4 mb-4">Food Safety Regulation Analysis</h1>
            <p className="lead mb-4">
              Analyzing the relationship between food regulations in the US and EU, focusing on allowed ingredients,
              obesity rates, and public health outcomes.
            </p>
            <div className="alert alert-primary border-0 bg-primary bg-opacity-10 mb-5 mx-auto" style={{ maxWidth: '800px' }}>
              <p className="mb-0 fw-bold">
                How do food safety regulations differ between the US and EU, and what are the potential health implications of these differences?
              </p>
            </div>
            
            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="card rounded-0 h-100 shadow-sm hover-shadow" style={{ aspectRatio: '1/1' }}>
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faFlask} className="fa-3x mb-3 text-primary" />
                    <h5 className="card-title">Ingredients Analysis</h5>
                    <p className="card-text text-center">
                      Interactive visualization of food additives regulations, comparing:
                    </p>
                    <ul className="text-start small">
                      <li>High-risk substances analysis</li>
                      <li>Category distribution comparison</li>
                      <li>Food category restrictions</li>
                      <li>Regulatory status tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card rounded-0 h-100 shadow-sm hover-shadow" style={{ aspectRatio: '1/1' }}>
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faChartLine} className="fa-3x mb-3 text-success" />
                    <h5 className="card-title">Health Outcomes</h5>
                    <p className="card-text text-center">
                      Comprehensive health metrics analysis:
                    </p>
                    <ul className="text-start small">
                      <li>Obesity trends analysis</li>
                      <li>Mortality rate comparisons</li>
                      <li>Disease prevalence data</li>
                      <li>Regional health disparities</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card rounded-0 h-100 shadow-sm hover-shadow" style={{ aspectRatio: '1/1' }}>
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faTimeline} className="fa-3x mb-3 text-warning" />
                    <h5 className="card-title">Regulatory Impact</h5>
                    <p className="card-text text-center">
                      Timeline-based analysis of:
                    </p>
                    <ul className="text-start small">
                      <li>Policy implementation dates</li>
                      <li>Health metric correlations</li>
                      <li>Cross-regional comparisons</li>
                      <li>Impact assessments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row mt-5 g-4 justify-content-center">
              <div className="col-md-8">
                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h5 className="mb-3">Data Sources</h5>
                    <div className="row g-3">
                      <div className="col-md-4">
                        <button 
                          className="btn btn-link text-decoration-none text-start p-0 d-flex align-items-center w-100"
                          onClick={() => setShowDataSourcesModal(true)}
                        >
                          <FontAwesomeIcon icon={faFlask} className="text-primary me-2" />
                          <span className="small">FDA & EU Food Additives</span>
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-2 small" />
                        </button>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faChartLine} className="text-success me-2" />
                          <small>WHO Health Statistics</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon icon={faTimeline} className="text-warning me-2" />
                          <small>Regulatory Databases</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataSourcesModal 
        show={showDataSourcesModal} 
        onHide={() => setShowDataSourcesModal(false)} 
      />
    </div>
  );
};

const Ingredients = () => (
  <div className="container py-4">
    <h2>Food Ingredients Analysis</h2>
    <p className="lead">
      Comprehensive comparison of food additives regulation between US and EU regions.
    </p>
    
    <div className="alert alert-primary border-0 bg-primary bg-opacity-10 mb-4">
      <h5 className="mb-2">Essential Question:</h5>
      <p className="mb-0 fw-bold">
        How do food safety regulations differ between the US and EU, and what are the potential health implications of these differences?
      </p>
    </div>
    
    <IngredientsVisuals />
    
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
    
    <div className="alert alert-primary border-0 bg-primary bg-opacity-10 mb-4">
      <h5 className="mb-2">Essential Question:</h5>
      <p className="mb-0 fw-bold">
        How do food safety regulations differ between the US and EU, and what are the potential health implications of these differences?
      </p>
    </div>

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
    
    <div className="alert alert-primary border-0 bg-primary bg-opacity-10 mb-4">
      <h5 className="mb-2">Essential Question:</h5>
      <p className="mb-0 fw-bold">
        How do food safety regulations differ between the US and EU, and what are the potential health implications of these differences?
      </p>
    </div>

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
