#!/usr/bin/env python3
"""
Process US food additives data and compare with EU regulations.
This script analyzes FDA indirect additives data and compares it with EU regulations.
"""

import csv
import json
from pathlib import Path
from typing import Dict, List, Any, Set
import logging
from collections import defaultdict

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class USAdditivesProcessor:
    """Process and analyze US food additives data."""
    
    def __init__(self, us_input_file: str, eu_data_dir: str, output_dir: str):
        """
        Initialize the processor with input and output paths.
        
        Args:
            us_input_file: Path to the US additives CSV file
            eu_data_dir: Directory containing EU processed data
            output_dir: Directory for output files
        """
        self.us_input_file = Path(us_input_file)
        self.eu_data_dir = Path(eu_data_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.us_data = []
        self.eu_banned = []
        self.eu_high_risk = []
        
    def load_data(self) -> None:
        """Load US and EU data files."""
        try:
            # Load US data with different encoding
            with open(self.us_input_file, 'r', encoding='latin-1') as f:
                # Skip the first 4 lines (header information)
                for _ in range(4):
                    next(f)
                reader = csv.DictReader(f)
                self.us_data = list(reader)
            logging.info(f"Loaded {len(self.us_data)} records from US data")
            
            # Load EU banned additives
            eu_banned_file = self.eu_data_dir / 'eu_banned_additives.csv'
            with open(eu_banned_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                self.eu_banned = list(reader)
            logging.info(f"Loaded {len(self.eu_banned)} EU banned additives")
            
            # Load EU high-risk additives
            eu_high_risk_file = self.eu_data_dir / 'eu_high_risk_additives.csv'
            with open(eu_high_risk_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                self.eu_high_risk = list(reader)
            logging.info(f"Loaded {len(self.eu_high_risk)} EU high-risk additives")
            
        except Exception as e:
            logging.error(f"Error loading data: {str(e)}")
            raise
            
    def normalize_name(self, name: str) -> str:
        """
        Normalize substance names for comparison.
        
        Args:
            name: The substance name to normalize
            
        Returns:
            Normalized name string
        """
        # Remove common prefixes/suffixes and standardize format
        normalized = name.lower().strip()
        normalized = normalized.replace('-', ' ')
        normalized = normalized.replace(',', ' ')
        normalized = normalized.replace('(', ' ')
        normalized = normalized.replace(')', ' ')
        normalized = normalized.replace('  ', ' ')
        
        # Remove common chemical name variations
        prefixes_to_remove = ['e ', 'l-', 'd-', 'dl-', 'alpha-', 'beta-', 'gamma-']
        for prefix in prefixes_to_remove:
            if normalized.startswith(prefix):
                normalized = normalized[len(prefix):]
        
        return normalized.strip()
    
    def get_all_names(self, us_item: Dict[str, str]) -> Set[str]:
        """
        Get all possible names for a US substance including synonyms.
        
        Args:
            us_item: Dictionary containing US substance data
            
        Returns:
            Set of normalized substance names
        """
        names = set()
        # Add main substance name
        names.add(self.normalize_name(us_item['Substance']))
        
        # Add other names
        if us_item.get('Other Names'):
            names.add(self.normalize_name(us_item['Other Names']))
        
        # Add synonyms
        for i in range(1, 20):
            syn_key = f'SYN{i:02d}'
            if us_item.get(syn_key):
                names.add(self.normalize_name(us_item[syn_key]))
        
        return names
    
    def find_common_substances(self) -> Dict[str, List[Dict[str, Any]]]:
        """
        Find substances that appear in both US and EU datasets.
        
        Returns:
            Dictionary containing substances found in both datasets
        """
        common = {
            'banned_in_both': [],
            'banned_in_eu_only': [],
            'high_risk_in_eu': []
        }
        
        # Create dictionaries for US substances with all their possible names
        us_prohibited_names = {}
        us_allowed_names = {}
        
        for item in self.us_data:
            all_names = self.get_all_names(item)
            if item['Reg prohibited189'].strip():
                for name in all_names:
                    us_prohibited_names[name] = item
            else:
                for name in all_names:
                    us_allowed_names[name] = item
        
        # Check EU banned substances
        for eu_item in self.eu_banned:
            eu_name = self.normalize_name(eu_item['name'])
            
            if eu_name in us_prohibited_names:
                common['banned_in_both'].append({
                    'name': eu_item['name'],
                    'eu_category': eu_item['category'],
                    'eu_legislation': eu_item['legislation'],
                    'us_cas': us_prohibited_names[eu_name]['CAS Registry No. (or other ID)']
                })
            elif eu_name in us_allowed_names:
                common['banned_in_eu_only'].append({
                    'name': eu_item['name'],
                    'eu_category': eu_item['category'],
                    'eu_legislation': eu_item['legislation'],
                    'us_cas': us_allowed_names[eu_name]['CAS Registry No. (or other ID)']
                })
        
        # Check EU high-risk substances
        for eu_item in self.eu_high_risk:
            eu_name = self.normalize_name(eu_item['name'])
            if eu_name in us_allowed_names:
                common['high_risk_in_eu'].append({
                    'name': eu_item['name'],
                    'eu_category': eu_item['category'],
                    'max_level': eu_item['max_level'],
                    'unit': eu_item['unit'],
                    'us_cas': us_allowed_names[eu_name]['CAS Registry No. (or other ID)']
                })
        
        return common
    
    def save_comparison(self, data: Dict[str, List[Dict[str, Any]]], filename: str) -> None:
        """
        Save comparison results to a CSV file.
        
        Args:
            data: Dictionary of comparison results
            filename: Output filename
        """
        output_path = self.output_dir / filename
        
        try:
            with open(output_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                
                # Write header
                writer.writerow(['Category', 'Substance Name', 'US CAS Number', 'Details'])
                
                # Write banned in both
                for item in data['banned_in_both']:
                    writer.writerow([
                        'Banned in both US and EU',
                        item['name'],
                        item['us_cas'],
                        f"EU Category: {item['eu_category']}, Legislation: {item['eu_legislation']}"
                    ])
                    
                # Write banned in EU only
                for item in data['banned_in_eu_only']:
                    writer.writerow([
                        'Banned in EU only',
                        item['name'],
                        item['us_cas'],
                        f"EU Category: {item['eu_category']}, Legislation: {item['eu_legislation']}"
                    ])
                    
                # Write high risk in EU
                for item in data['high_risk_in_eu']:
                    writer.writerow([
                        'High risk in EU',
                        item['name'],
                        item['us_cas'],
                        f"Category: {item['eu_category']}, Max Level: {item['max_level']} {item['unit']}"
                    ])
                    
            logging.info(f"Saved comparison results to {output_path}")
            
        except Exception as e:
            logging.error(f"Error saving comparison results: {str(e)}")
            raise
            
    def process(self) -> None:
        """Process the data and generate comparison."""
        self.load_data()
        
        # Find common substances and regulatory differences
        comparison = self.find_common_substances()
        
        # Save comparison results
        self.save_comparison(comparison, 'us_eu_comparison.csv')
        
        # Log summary statistics
        logging.info(f"Found {len(comparison['banned_in_both'])} substances banned in both US and EU")
        logging.info(f"Found {len(comparison['banned_in_eu_only'])} substances banned in EU but allowed in US")
        logging.info(f"Found {len(comparison['high_risk_in_eu'])} US-allowed substances considered high-risk in EU")
        
def main():
    """Main entry point for the script."""
    processor = USAdditivesProcessor(
        us_input_file='data/raw/us-food-additives/indirect-additives.csv',
        eu_data_dir='data/processed/eu-food-additives',
        output_dir='data/processed/comparison'
    )
    processor.process()

if __name__ == '__main__':
    main() 