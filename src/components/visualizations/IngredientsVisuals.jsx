import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

/**
 * Component for visualizing ingredients analysis data
 */
const IngredientsVisuals = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [highRiskData, setHighRiskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load the comparison data
        const response = await fetch('/data/processed/comparison/us_eu_comparison.csv');
        const text = await response.text();
        const rows = text.split('\n').map(row => row.split(','));
        
        // Skip header row
        const data = rows.slice(1);
        
        // Process data for category distribution
        const categories = new Map();
        data.forEach(row => {
          if (row.length >= 4) {
            const category = row[0];
            categories.set(category, (categories.get(category) || 0) + 1);
          }
        });
        
        const categoryChartData = Array.from(categories.entries()).map(([name, value]) => ({
          name,
          value
        }));
        
        // Process high-risk substances by category
        const highRiskSubstances = data.filter(row => 
          row[0] === 'High risk in EU' && row.length >= 4
        ).map(row => ({
          name: row[1],
          casNumber: row[2],
          details: row[3]
        }));
        
        setCategoryData(categoryChartData);
        setHighRiskData(highRiskSubstances);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {/* Distribution Pie Chart */}
      <div className="col-md-6">
        <div className="card h-100">
          <div className="card-header">
            <h5 className="mb-0">Substance Distribution by Category</h5>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* High Risk Substances Table */}
      <div className="col-md-6">
        <div className="card h-100">
          <div className="card-header">
            <h5 className="mb-0">High Risk Substances Details</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: '300px' }}>
              <table className="table table-hover table-sm">
                <thead className="sticky-top bg-white">
                  <tr>
                    <th>Substance</th>
                    <th>CAS Number</th>
                    <th>Restrictions</th>
                  </tr>
                </thead>
                <tbody>
                  {highRiskData.map((substance, index) => (
                    <tr key={index}>
                      <td>{substance.name}</td>
                      <td><code>{substance.casNumber}</code></td>
                      <td><small>{substance.details}</small></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Key Findings</h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="border rounded p-3 text-center">
                  <h6 className="text-muted mb-2">High Risk Substances</h6>
                  <h2 className="mb-0">{highRiskData.length}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border rounded p-3 text-center">
                  <h6 className="text-muted mb-2">Categories Analyzed</h6>
                  <h2 className="mb-0">{categoryData.length}</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="border rounded p-3 text-center">
                  <h6 className="text-muted mb-2">Total Substances</h6>
                  <h2 className="mb-0">
                    {categoryData.reduce((sum, item) => sum + item.value, 0)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsVisuals; 