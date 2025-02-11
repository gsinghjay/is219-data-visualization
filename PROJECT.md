## Food Safety Regulation Analysis - US vs EU

### Overview

This repository analyzes food safety regulations in the US and EU. It compares allowed food ingredients and examines potential health implications. The project visualizes data related to food regulations, obesity rates, and public health outcomes.

### Quick Start

1. **Installation:**
   ```bash
   npm install
   ```
2. **Development Server:**
   ```bash
   npm run dev
   ```
   This starts a local development server. Open your browser to view the application.
3. **Build for Production:**
   ```bash
   npm run build
   ```
   This builds the application for deployment in the `dist` folder.

### Project Structure

The project is structured as follows:

- `data-sources/`: Contains README for data sources.
- `public/`:  Contains public assets and data files.
- `scripts/`: Contains data processing scripts.
  - `data_processing/`: Scripts to process EU and US food additives data.
- `src/`: Contains the React application source code.
  - `assets/`:  Contains images and icons.
  - `components/`: React components.
    - `visualizations/`:  Components for data visualizations.
  - `App.jsx`: Main application component.
  - `main.jsx`: Entry point for the React application.
- Root directory files: Configuration files, documentation, and package information.

### Data Processing Scripts

#### `scripts/data_processing/process_eu_additives.py`

This script processes EU food additives data from a JSON file. It extracts information about food additives, restrictions, and regulatory status in the EU.

**Features:**

- Loads EU food additive data from JSON.
- Extracts banned additives.
- Extracts high-risk additives with strict usage limits.
- Saves processed data to CSV files in `data/processed/eu-food-additives/`.

**Usage:**

Run the script directly:

```bash
cd scripts/data_processing
./process_eu_additives.py
```

**Input:**

- `data/raw/eu-food-additives/food_additives.json`: JSON file containing EU food additives data.

**Outputs:**

- `data/processed/eu-food-additives/eu_banned_additives.csv`: CSV file listing banned EU additives.
- `data/processed/eu-food-additives/eu_high_risk_additives.csv`: CSV file listing high-risk EU additives.

#### `scripts/data_processing/process_us_additives.py`

This script processes US food additives data and compares it with EU regulations. It analyzes FDA indirect additives data and compares it to processed EU data.

**Features:**

- Loads US indirect additives data from CSV.
- Loads processed EU banned and high-risk additive data.
- Normalizes substance names for comparison.
- Finds common substances between US and EU datasets.
- Identifies substances banned or considered high-risk in the EU but allowed in the US.
- Saves comparison results to a CSV file in `data/processed/comparison/`.

**Usage:**

Run the script directly:

```bash
cd scripts/data_processing
./process_us_additives.py
```

**Inputs:**

- `data/raw/us-food-additives/indirect-additives.csv`: CSV file containing US indirect food additives data.
- `data/processed/eu-food-additives/eu_banned_additives.csv`: CSV file of EU banned additives (output of `process_eu_additives.py`).
- `data/processed/eu-food-additives/eu_high_risk_additives.csv`: CSV file of EU high-risk additives (output of `process_eu_additives.py`).

**Outputs:**

- `data/processed/comparison/us_eu_comparison.csv`: CSV file containing comparison of US and EU food additive regulations.

### React Components

#### `src/components/visualizations/IngredientsVisuals.jsx`

This component visualizes data related to ingredient analysis, comparing US and EU regulations.

**Visualizations:**

- **Substance Distribution by Category (US vs EU) Pie Chart:** Shows the distribution of substances by regulatory category in the US and EU.
- **Top Food Categories with Restrictions Bar Chart:** Displays top food categories with EU restrictions and US regulation status for substances in those categories.
- **High Risk Substances Table:**  Lists high-risk substances in the EU and their regulatory status in the US.
- **Key Findings Summary:**  Provides summary statistics on high-risk substances and US regulation status.

**Data Sources:**

- `public/data/processed/comparison/us_eu_comparison.csv`
- `public/data/processed/eu-food-additives/eu_high_risk_additives.csv`
- `public/data/raw/us-food-additives/indirect-additives.csv`

#### `src/components/Layout.jsx`

Provides the main layout structure for the application. It includes the `Navigation` component and the main content area.

**Features:**

- Includes `Navigation` component for site navigation.
- Uses Bootstrap for styling and layout.
- Includes a footer with author attribution.

#### `src/components/Navigation.jsx`

Provides navigation links for different sections of the application.

**Navigation Links:**

- **Ingredients:** `/ingredients` - Links to the Ingredients Analysis page.
- **Health Outcomes:** `/health-outcomes` - Placeholder for future Health Outcomes analysis.
- **Regulatory Timeline:** `/timeline` - Placeholder for future Regulatory Timeline analysis.

### `src/App.jsx`

Main application component that sets up routing and defines application pages.

**Features:**

- Uses `react-router-dom` for routing.
- Defines routes for:
    - Home (`/`)
    - Ingredients Analysis (`/ingredients`)
    - Health Outcomes (`/health-outcomes`)
    - Regulatory Timeline (`/timeline`)
- Includes a modal component (`DataSourcesModal`) to display data source information.

### Dependencies

**Dependencies:**

- `@fortawesome/fontawesome-svg-core`: For Font Awesome icons.
- `@fortawesome/free-regular-svg-icons`: For regular Font Awesome icons.
- `@fortawesome/free-solid-svg-icons`: For solid Font Awesome icons.
- `@fortawesome/react-fontawesome`: For using Font Awesome icons in React.
- `@popperjs/core`:  Required by Bootstrap.
- `bootstrap`: CSS framework for styling.
- `papaparse`: For parsing CSV files.
- `react`: React library.
- `react-dom`: React DOM library.
- `react-router-dom`: For routing in React applications.
- `recharts`: For creating charts and visualizations.

**Dev Dependencies:**

- `@browserbasehq/stagehand`: Browser automation tool (not directly used in the application, but in repository files).
- `@eslint/js`:  ESLint recommended rules.
- `@playwright/test`: End-to-end testing framework (not directly used in the application code).
- `@testing-library/jest-dom`:  Jest matchers for testing DOM elements.
- `@testing-library/react`: React testing utilities.
- `@types/react`: TypeScript types for React.
- `@types/react-dom`: TypeScript types for React DOM.
- `@vitejs/plugin-react`: Vite plugin for React.
- `eslint`: JavaScript linter.
- `eslint-plugin-react`: ESLint plugin for React.
- `eslint-plugin-react-hooks`: ESLint plugin for React Hooks.
- `eslint-plugin-react-refresh`: ESLint plugin for React Refresh.
- `gh-pages`: For deploying to GitHub Pages.
- `globals`:  Globals for ESLint.
- `jsdom`:  JavaScript implementation of DOM for testing.
- `vite`: Build tool.
- `vitest`: Test runner.

### Configuration

- **`vite.config.js`**: Configuration for Vite build tool, including base URL and plugins.
- **`eslint.config.js`**: Configuration for ESLint, defining linting rules for JavaScript and JSX files.
- **`package.json`**:  Project metadata, dependencies, and scripts.
- **`.gitignore`**: Specifies intentionally untracked files that Git should ignore.
- **`index.html`**: Main HTML file, including meta tags and script for GitHub Pages routing.

### Advanced Usage

- **Data Updates:** To update the data, download the latest datasets from the sources listed in `data-sources/README.md` and replace the files in the `public/data/raw/` directory.  Rerun the data processing scripts to update the processed CSV files.
- **Custom Visualizations:** Modify or create new components in `src/components/visualizations/` to create custom data visualizations. Update `src/App.jsx` to include new routes and components.
- **Deployment to GitHub Pages:**  The project is configured for deployment to GitHub Pages. Run `npm run deploy` to build and deploy the application to GitHub Pages. Ensure the `homepage` field in `package.json` is correctly set to your GitHub Pages URL.