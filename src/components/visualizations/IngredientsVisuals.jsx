import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

// Define color schemes for different data groups
const EU_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const US_COLORS = ['#8884d8', '#4CAF50'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const cleanString = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/^["'\s]+|["'\s]+$/g, '');
};

/**
 * Component for visualizing ingredients analysis data
 */
const IngredientsVisuals = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [highRiskData, setHighRiskData] = useState([]);
  const [foodCategoryData, setFoodCategoryData] = useState([]);
  const [usRegulationData, setUsRegulationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        // Load all data files
        const [comparisonResponse, highRiskResponse, usResponse] = await Promise.all([
          fetch(`${import.meta.env.BASE_URL}data/processed/comparison/us_eu_comparison.csv`),
          fetch(`${import.meta.env.BASE_URL}data/processed/eu-food-additives/eu_high_risk_additives.csv`),
          fetch(`${import.meta.env.BASE_URL}data/raw/us-food-additives/indirect-additives.csv`)
        ]);

        const comparisonText = await comparisonResponse.text();
        const highRiskText = await highRiskResponse.text();
        const usText = await usResponse.text();

        // Process comparison data
        const comparisonRows = comparisonText.split('\n')
          .filter(row => row.trim()) // Skip empty rows
          .map(row => {
            const [category, name, casNumber, details] = row.split(',').map(cleanString);
            return { category, name, casNumber, details };
          });
        const comparisonData = comparisonRows.slice(1); // Skip header

        // Process high risk data
        const highRiskRows = highRiskText.split('\n')
          .filter(row => row.trim()) // Skip empty rows
          .map(row => row.split(',').map(cleanString));
        const highRiskData = highRiskRows.slice(1); // Skip header

        // Process US data (skip first 4 lines of metadata)
        const usLines = usText.split('\n').slice(4);
        const usData = [];
        let currentLine = '';
        
        // Properly handle quoted CSV with commas inside fields
        for (const line of usLines) {
          if (line.trim()) { // Skip empty lines
            if (line.split('"').length % 2 === 0) {
              // Line has unclosed quotes, append to current line
              currentLine += line;
            } else {
              // Line completes the record
              const fullLine = currentLine + line;
              currentLine = '';
              
              const matches = fullLine.match(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g);
              if (matches) {
                const fields = matches.map(field => 
                  cleanString(field.replace(/^,/, ''))
                );
                usData.push(fields);
              }
            }
          }
        }
        
        // Skip header row and filter out any malformed rows
        const usDataRows = usData.slice(1).filter(row => Array.isArray(row) && row.length >= 30);

        // Process data for category distribution
        const categories = new Map();
        
        // Add EU categories
        comparisonData.forEach(row => {
          if (row.category) {
            const category = `EU: ${row.category}`;
            categories.set(category, (categories.get(category) || 0) + 1);
          }
        });

        // Add US categories from regulations
        let usAllowed = 0;
        let usProhibited = 0;
        usDataRows.forEach(row => {
          if (row.length >= 30) {
            const prohibited = cleanString(row[29]); // Reg prohibited189 column
            if (prohibited) {
              usProhibited++;
            } else {
              usAllowed++;
            }
          }
        });
        
        categories.set('US: Allowed', usAllowed);
        categories.set('US: Prohibited', usProhibited);

        const categoryChartData = Array.from(categories.entries())
          .map(([name, value]) => ({
            name,
            value,
            // Add color coding for US vs EU
            group: name.startsWith('US:') ? 'US' : 'EU'
          }))
          .sort((a, b) => {
            // Sort by group (US/EU) first, then by value
            if (a.group !== b.group) return a.group.localeCompare(b.group);
            return b.value - a.value;
          });

        // Process high-risk substances with details
        const highRiskSubstances = comparisonData
          .filter(row => row.category === 'High risk in EU')
          .map(row => ({
            name: cleanString(row.name),
            casNumber: cleanString(row.casNumber),
            details: row.details
          }));

        // Process US regulation data
        const usRegulations = new Map();
        usDataRows.forEach(row => {
          if (row.length >= 30) {
            const casNo = cleanString(row[0]);
            const substance = cleanString(row[1]);
            const prohibited = cleanString(row[29]); // Reg prohibited189 column
            
            if (casNo && substance) {
              const regulationType = prohibited ? 'Prohibited' : 'Allowed';
              usRegulations.set(casNo, {
                name: substance,
                status: regulationType,
                casNo
              });
            }
          }
        });

        // Cross-reference high-risk substances with US regulations
        const crossReferencedData = highRiskSubstances.map(substance => {
          const casNumber = cleanString(substance.casNumber);
          const usInfo = usRegulations.get(casNumber);
          
          // Try matching by name if CAS number doesn't match
          if (!usInfo) {
            const substanceName = substance.name.toLowerCase();
            const matchByName = Array.from(usRegulations.values())
              .find(us => us.name.toLowerCase() === substanceName);
            if (matchByName) {
              return {
                ...substance,
                usStatus: matchByName.status
              };
            }
          }
          
          return {
            ...substance,
            usStatus: usInfo ? usInfo.status : 'Not Listed'
          };
        });

        // Process food categories and restrictions
        const foodCategories = new Map();
        highRiskData.forEach(row => {
          if (row.length >= 5) {
            const category = cleanString(row[2]); // food category column
            const maxLevel = parseFloat(row[3]) || 0; // max level column
            const substanceName = cleanString(row[1]); // substance name
            
            if (!foodCategories.has(category)) {
              foodCategories.set(category, {
                count: 0,
                totalLimit: 0,
                substances: new Set(),
                usAllowed: 0,
                usProhibited: 0,
                notListed: 0
              });
            }
            
            const data = foodCategories.get(category);
            data.count++;
            data.totalLimit += maxLevel;
            data.substances.add(substanceName);

            // Find US status for this substance
            const matchingUS = Array.from(usRegulations.values())
              .find(us => 
                us.name.toLowerCase().includes(substanceName.toLowerCase()) ||
                substanceName.toLowerCase().includes(us.name.toLowerCase())
              );
            
            if (matchingUS) {
              if (matchingUS.status === 'Prohibited') {
                data.usProhibited++;
              } else {
                data.usAllowed++;
              }
            } else {
              data.notListed++;
            }
          }
        });

        const foodCategoryChartData = Array.from(foodCategories.entries())
          .map(([category, data]) => ({
            category: category.length > 40 ? category.substring(0, 40) + '...' : category,
            substanceCount: data.substances.size,
            averageLimit: Math.round(data.totalLimit / data.count * 100) / 100,
            usAllowed: data.usAllowed,
            usProhibited: data.usProhibited,
            notListed: data.notListed
          }))
          .filter(item => item.substanceCount > 1)
          .sort((a, b) => b.substanceCount - a.substanceCount)
          .slice(0, 10);

        setCategoryData(categoryChartData);
        setHighRiskData(crossReferencedData);
        setFoodCategoryData(foodCategoryChartData);
        setUsRegulationData(Array.from(usRegulations.values()));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError(error.message || 'Error loading data');
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

  if (error) {
    return (
      <div className="alert alert-danger m-3 rounded-0" role="alert">
        <h4 className="alert-heading">Error Loading Data</h4>
        <p>{error}</p>
        <hr />
        <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {/* Distribution Pie Chart */}
      <div className="col-md-6">
        <div className="card h-100 rounded-0">
          <div className="card-header rounded-0">
            <h5 className="mb-0">Substance Distribution by Category (US vs EU)</h5>
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
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.group === 'US' ? 
                        US_COLORS[index % US_COLORS.length] : 
                        EU_COLORS[index % EU_COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} substances`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-3">
              <small className="text-muted">
                Distribution of substances by regulatory category in US and EU
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Food Categories Bar Chart */}
      <div className="col-md-6">
        <div className="card h-100 rounded-0">
          <div className="card-header rounded-0">
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
                    name === 'substanceCount' ? 'Total Substances' :
                    name === 'usAllowed' ? 'US Allowed' :
                    name === 'usProhibited' ? 'US Prohibited' :
                    name === 'notListed' ? 'Not Listed in US' :
                    'Avg. Limit (mg/kg)'
                  ]}
                />
                <Legend />
                <Bar dataKey="substanceCount" fill="#8884d8" name="Total Substances" />
                <Bar dataKey="usAllowed" fill="#82ca9d" name="US Allowed" />
                <Bar dataKey="usProhibited" fill="#ff8042" name="US Prohibited" />
                <Bar dataKey="notListed" fill="#ffc658" name="Not Listed in US" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* High Risk Substances Table */}
      <div className="col-12">
        <div className="card rounded-0">
          <div className="card-header rounded-0">
            <h5 className="mb-0">High Risk Substances Details</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive rounded-0" style={{ maxHeight: '400px' }}>
              <table className="table table-hover table-sm rounded-0">
                <thead className="sticky-top bg-white rounded-0">
                  <tr>
                    <th>Substance</th>
                    <th>CAS Number</th>
                    <th>US Status</th>
                    <th>EU Restrictions</th>
                  </tr>
                </thead>
                <tbody>
                  {highRiskData.map((substance, index) => (
                    <tr key={index}>
                      <td>{substance.name}</td>
                      <td><code>{substance.casNumber}</code></td>
                      <td>
                        <span className={`badge bg-${
                          substance.usStatus === 'Allowed' ? 'success' :
                          substance.usStatus === 'Prohibited' ? 'danger' :
                          'secondary'
                        } rounded-0`}>
                          {substance.usStatus}
                        </span>
                      </td>
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
        <div className="card rounded-0">
          <div className="card-header rounded-0">
            <h5 className="mb-0">Key Findings</h5>
          </div>
          <div className="card-body">
            <div className="row g-4">
              <div className="col-md-3">
                <div className="border rounded-0 p-3 text-center">
                  <h6 className="text-muted mb-2">High Risk Substances</h6>
                  <h2 className="mb-0">{highRiskData.length}</h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded-0 p-3 text-center">
                  <h6 className="text-muted mb-2">US Allowed</h6>
                  <h2 className="mb-0">
                    {highRiskData.filter(s => s.usStatus === 'Allowed').length}
                  </h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded-0 p-3 text-center">
                  <h6 className="text-muted mb-2">US Prohibited</h6>
                  <h2 className="mb-0">
                    {highRiskData.filter(s => s.usStatus === 'Prohibited').length}
                  </h2>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded-0 p-3 text-center">
                  <h6 className="text-muted mb-2">Not Listed in US</h6>
                  <h2 className="mb-0">
                    {highRiskData.filter(s => s.usStatus === 'Not Listed').length}
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