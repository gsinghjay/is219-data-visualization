# Food Safety Regulation Analysis - US vs EU

## Overview
An analysis of food safety regulatory differences between the US and EU, examining potential health implications through data visualization. This project focuses on the relationship between allowed food ingredients and public health outcomes, particularly obesity rates, illness prevalence, and mortality rates.
- [View Project Details](PROJECT.md)
- [View the project on GitHub Pages](https://github.com/gsinghjay/is219-data-visualization)


## Essential Question
**How do food safety regulations differ between the US and EU, and what are the potential health implications of these differences?**

## Key Focus Areas
- Comparative Analysis of Allowed/Banned Food Ingredients
- Obesity Rate Trends and Correlations
- Public Health Outcomes and Mortality Rates
- Regulatory Impact Assessment

## Data Sources

### Primary Public Data Sources
- FDA Food Additive Database [`/public/data/raw/us-food-additives/`](/public/data/raw/us-food-additives/)
  - Complete list of allowed food additives in the US
  - GRAS (Generally Recognized as Safe) substances
  - Food contact substances

- EU Food Additives Database [`/public/data/raw/eu-food-additives/`](/public/data/raw/eu-food-additives/)
  - E-numbered food additives
  - Restricted and banned substances
  - Maximum usage levels
  - Processed data:
    - High-risk additives [`/public/data/processed/eu-food-additives/eu_high_risk_additives.csv`](/public/data/processed/eu-food-additives/eu_high_risk_additives.csv)
    - Banned substances [`/public/data/processed/eu-food-additives/eu_banned_additives.csv`](/public/data/processed/eu-food-additives/eu_banned_additives.csv)

### Comparative Analysis Data
- US-EU Comparison [`/public/data/processed/comparison/us_eu_comparison.csv`](/public/data/processed/comparison/us_eu_comparison.csv)
  - Substance categorization
  - CAS numbers
  - Usage restrictions
  - Maximum levels
  - Risk classifications

### Health Metrics Focus
- Obesity rates (adult and childhood)
- Cardiovascular disease prevalence
- Cancer rates (specific types linked to diet)
- Diabetes prevalence
- Food-related illness statistics
*Note: Health metrics data to be added in [`/public/data/raw/who-health-data/`](/public/data/raw/who-health-data/) and [`/public/data/raw/cdc-health-data/`](/public/data/raw/cdc-health-data/)*

### Regulatory Data
- Banned ingredients lists
- Ingredient approval timelines
- Usage restrictions and limits
- Policy implementation dates
*Note: Regulatory comparison data available in [`/public/data/processed/comparison/us_eu_comparison.csv`](/public/data/processed/comparison/us_eu_comparison.csv)*

## Visualizations

### Comparative Analysis
- Interactive table of ingredients (allowed vs banned)
- Side-by-side obesity and health outcome comparisons
- Regulatory timeline with health metric overlays

### Health Impact Analysis
- Trend analysis of obesity rates
- Correlation between ingredient policies and health outcomes
- Regional health outcome comparisons

### Regulatory Overview
- Timeline of significant policy changes
- Impact assessment visualizations
- Cross-regional policy comparison matrix

## Project Goals
1. Identify key differences in food safety regulations
2. Analyze correlation between regulations and public health
3. Visualize trends in obesity and related health outcomes
4. Examine potential causative relationships
5. Present findings through interactive visualizations
