import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation Component', () => {
  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders all navigation links', () => {
    renderWithRouter(<Navigation />);
    
    // Check if all navigation links are present
    expect(screen.getByText('Food Safety Analysis')).toBeInTheDocument();
    expect(screen.getByText('Ingredients')).toBeInTheDocument();
    expect(screen.getByText('Health Outcomes')).toBeInTheDocument();
    expect(screen.getByText('Regulatory Timeline')).toBeInTheDocument();
  });

  it('has correct navigation links', () => {
    renderWithRouter(<Navigation />);
    
    // Check if links have correct href attributes
    expect(screen.getByText('Food Safety Analysis').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Ingredients').closest('a')).toHaveAttribute('href', '/ingredients');
    expect(screen.getByText('Health Outcomes').closest('a')).toHaveAttribute('href', '/health-outcomes');
    expect(screen.getByText('Regulatory Timeline').closest('a')).toHaveAttribute('href', '/timeline');
  });
}); 