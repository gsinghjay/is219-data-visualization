import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

/**
 * Component for visualizing ingredients analysis data
 */
const IngredientsVisuals = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [highRiskData, setHighRiskData] = useState([]);
  const [foodCategoryData, setFoodCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load all data files
        const [comparisonResponse, highRiskResponse] = await Promise.all([
          fetch('/data/processed/comparison/us_eu_comparison.csv'),
          fetch('/data/processed/eu-food-additives/eu_high_risk_additives.csv')
        ]);

        const comparisonText = await comparisonResponse.text();
        const highRiskText = await highRiskResponse.text();

        // Process comparison data
        const comparisonRows = comparisonText.split('\n').map(row => row.split(','));
        const comparisonData = comparisonRows.slice(1); // Skip header

        // Process high risk data
        const highRiskRows = highRiskText.split('\n').map(row => row.split(','));
        const highRiskData = highRiskRows.slice(1); // Skip header

        // Process data for category distribution
        const categories = new Map();
        comparisonData.forEach(row => {
          if (row.length >= 4) {
            const category = row[0];
            categories.set(category, (categories.get(category) || 0) + 1);
          }
        });

        const categoryChartData = Array.from(categories.entries()).map(([name, value]) => ({
          name,
          value
        }));

        // Process high-risk substances with details
        const highRiskSubstances = comparisonData
          .filter(row => row[0] === 'High risk in EU' && row.length >= 4)
          .map(row => ({
            name: row[1],
            casNumber: row[2],
            details: row[3]
          }));

        // Process food categories and restrictions
        const foodCategories = new Map();
        highRiskData.forEach(row => {
          if (row.length >= 5) {
            const category = row[2]; // food category column
            const maxLevel = parseFloat(row[3]) || 0; // max level column
            
            if (!foodCategories.has(category)) {
              foodCategories.set(category, {
                count: 0,
                totalLimit: 0,
                substances: new Set()
              });
            }
            
            const data = foodCategories.get(category);
            data.count++;
            data.totalLimit += maxLevel;
            data.substances.add(row[1]); // substance name
          }
        });

        const foodCategoryChartData = Array.from(foodCategories.entries())
          .map(([category, data]) => ({
            category,
            substanceCount: data.substances.size,
            averageLimit: data.totalLimit / data.count,
          }))
          .filter(item => item.substanceCount > 1) // Filter out categories with only one substance
          .sort((a, b) => b.substanceCount - a.substanceCount)
          .slice(0, 10); // Top 10 categories

        setCategoryData(categoryChartData);
        setHighRiskData(highRiskSubstances);
        setFoodCategoryData(foodCategoryChartData);
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

      {/* Food Categories Bar Chart */}
      <div className="col-md-6">
        <div className="card h-100">
          <div className="card-header">
            <h5 className="mb-0">Top Food Categories with Restrictions</h5>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={foodCategoryData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="category" 
                  type="category" 
                  width={150}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    value, 
                    name === 'substanceCount' ? 'Substances' : 'Avg. Limit (mg/kg)'
                  ]}
                />
                <Legend />
                <Bar dataKey="substanceCount" fill="#8884d8" name="Number of Substances" />
                <Bar dataKey="averageLimit" fill="#82ca9d" name="Average Limit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* High Risk Substances Table */}
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">High Risk Substances Details</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive" style={{ maxHeight: '400px' }}>
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
              <div className="col-md-3">
                <div className="border rounded p-3 text-center">
                  <h6 className="text-muted mb-2">High Risk Substances</h6>
                  <h2 className="mb-0">{highRiskData.length}</h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded p-3 text-center">
                  <h6 className="text-muted mb-2">Categories Analyzed</h6>
                  <h2 className="mb-0">{categoryData.length}</h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded p-3 text-center">
                  <h6 className="text-muted mb-2">Food Categories</h6>
                  <h2 className="mb-0">{foodCategoryData.length}</h2>
                </div>
              </div>
              <div className="col-md-3">
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