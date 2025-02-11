#!/usr/bin/env python3
"""
Process EU food additives data from the downloaded JSON file.
This script extracts and organizes information about food additives,
their restrictions, and regulatory status in the EU.
"""

import json
import csv
from pathlib import Path
from typing import Dict, List, Any
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class EUAdditivesProcessor:
    """Process and analyze EU food additives data."""
    
    def __init__(self, input_file: str, output_dir: str):
        """
        Initialize the processor with input and output paths.
        
        Args:
            input_file: Path to the input JSON file
            output_dir: Directory for output files
        """
        self.input_file = Path(input_file)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.data = []
        
    def load_data(self) -> None:
        """Load and parse the JSON data file."""
        try:
            with open(self.input_file, 'r', encoding='utf-8') as f:
                self.data = json.load(f)
            logging.info(f"Loaded {len(self.data)} records from {self.input_file}")
        except Exception as e:
            logging.error(f"Error loading data: {str(e)}")
            raise
            
    def extract_banned_additives(self) -> List[Dict[str, Any]]:
        """
        Extract information about banned or restricted additives.
        
        Returns:
            List of dictionaries containing banned additive information
        """
        banned = []
        for item in self.data:
            if (
                'restriction_type' in item 
                and item['restriction_type'] == 'ML' 
                and item['restriction_value'] == 0
            ):
                banned.append({
                    'e_code': item['additive_e_code'],
                    'name': item['additive_name'],
                    'category': item['food_category'],
                    'legislation': item['legislation_short'],
                    'note': item['restriction_note']
                })
        return banned
    
    def extract_high_risk_additives(self) -> List[Dict[str, Any]]:
        """
        Extract additives with strict usage limits or special restrictions.
        
        Returns:
            List of dictionaries containing high-risk additive information
        """
        high_risk = []
        for item in self.data:
            # Consider additives with very low maximum limits or specific warnings
            if (
                'restriction_type' in item 
                and item['restriction_type'] == 'ML'
                and item['restriction_value'] is not None
                and item['restriction_value'] < 50  # Threshold for "high risk"
            ):
                high_risk.append({
                    'e_code': item['additive_e_code'],
                    'name': item['additive_name'],
                    'max_level': item['restriction_value'],
                    'unit': item['restriction_unit'],
                    'category': item['food_category'],
                    'note': item['restriction_note']
                })
        return high_risk
    
    def save_to_csv(self, data: List[Dict[str, Any]], filename: str) -> None:
        """
        Save processed data to a CSV file.
        
        Args:
            data: List of dictionaries to save
            filename: Output filename
        """
        if not data:
            logging.warning(f"No data to save to {filename}")
            return
            
        output_path = self.output_dir / filename
        try:
            with open(output_path, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=data[0].keys())
                writer.writeheader()
                writer.writerows(data)
            logging.info(f"Saved {len(data)} records to {output_path}")
        except Exception as e:
            logging.error(f"Error saving data to {filename}: {str(e)}")
            raise
            
    def process(self) -> None:
        """Process the data and save results."""
        self.load_data()
        
        # Process and save banned additives
        banned = self.extract_banned_additives()
        self.save_to_csv(banned, 'eu_banned_additives.csv')
        
        # Process and save high-risk additives
        high_risk = self.extract_high_risk_additives()
        self.save_to_csv(high_risk, 'eu_high_risk_additives.csv')
        
def main():
    """Main entry point for the script."""
    processor = EUAdditivesProcessor(
        input_file='data/raw/eu-food-additives/food_additives.json',
        output_dir='data/processed/eu-food-additives'
    )
    processor.process()

if __name__ == '__main__':
    main() 