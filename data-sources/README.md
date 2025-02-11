# Data Sources for Food Safety Analysis

This document contains links to public datasets and resources used in our food safety analysis project.

## Primary Data Sources

### Food Additives and Ingredients

1. **FDA Unsafe Food Additives Inventory**
   - Source: FDA CFSAN
   - URL: https://www.fda.gov/food/cfsan-constituent-updates/fda-releases-public-inventory-certain-food-ingredients-determined-be-unsafe
   - Format: Web-based inventory
   - Notes: Manual extraction may be required

2. **EU Food Additives Database**
   - Source: European Union Open Data Portal
   - URL: https://data.europa.eu/data/datasets/food-additives
   - Direct CSV: https://webgate.ec.europa.eu/foods_system/main/?event=display&format=csv
   - Format: CSV
   - Notes: Contains comprehensive E-number listings and approval status

3. **GRAS (Generally Recognized as Safe) Substances**
   - Source: FDA SCOGS Database
   - URL: https://www.fda.gov/food/generally-recognized-safe-gras/gras-substances-scogs-database
   - Format: CSV
   - Notes: Complete list of substances recognized as safe by FDA

### Health Metrics

1. **Global Obesity Data**
   - Source: World Obesity Federation
   - URL: https://data.worldobesity.org/downloads/
   - Direct CSV: https://data.worldobesity.org/site_media/uploads/country-level-data.csv
   - Format: CSV
   - Notes: Country-level obesity prevalence data

2. **CDC Mortality Statistics**
   - Source: CDC NCHS
   - URL: https://www.cdc.gov/nchs/data_access/vitalstatsonline.htm
   - Direct CSV: https://ftp.cdc.gov/pub/Health_Statistics/NCHS/Datasets/DVS/mortality/mort2021us.zip
   - Format: Compressed CSV
   - Notes: Contains detailed mortality data including food-related causes

3. **Global Foodborne Disease Burden**
   - Source: WHO Global Health Observatory
   - URL: https://www.who.int/data/gho/data/themes/who-estimates-of-the-global-burden-of-foodborne-diseases
   - Format: CSV
   - Notes: Estimates of disease burden related to food safety

### Regulatory Information

1. **US Food Policy Timeline**
   - Source: University of Wisconsin
   - URL: https://gobigread.wisc.edu/2019/05/americas-food-policy-timeline
   - Format: Web content
   - Notes: Historical timeline of US food policy changes

2. **EU Food Regulations Changes**
   - Source: BioSafe
   - URL: https://www.biosafe.fi/insight/navigating-a-decade-of-evolving-eu-food-regulations
   - Format: Web content
   - Notes: Summary of EU regulatory changes

## Data Processing Notes

1. **Data Integration Requirements**
   - Cross-reference ingredients between FDA and EU databases
   - Standardize country names across different datasets
   - Normalize time periods for temporal analysis

2. **Missing Data Considerations**
   - Historical policy changes require manual compilation
   - Some regulatory information may need web scraping
   - Regular updates needed for mortality and obesity data

3. **Data Quality Checks**
   - Verify data consistency across sources
   - Check for outdated regulations
   - Validate country-level statistics

## Update Schedule

- Obesity Data: Annual updates from World Obesity Federation
- Mortality Statistics: Annual updates from CDC
- Regulatory Information: Quarterly manual reviews
- Food Additives Lists: Monthly checks for updates

## Usage Guidelines

1. Download all CSV files to a local `data` directory
2. Maintain original files and create working copies
3. Document any data cleaning or transformation steps
4. Version control all data processing scripts
5. Regular backup of downloaded datasets 