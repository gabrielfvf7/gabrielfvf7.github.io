import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../components/shared/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Loading data..." />);

    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('renders without text when text prop is empty', () => {
    render(<LoadingSpinner text="" />);

    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    const { container } = render(<LoadingSpinner size="large" />);

    const spinner = container.querySelector('.loading-spinner--large');
    expect(spinner).toBeInTheDocument();
  });

  it('has proper CSS classes', () => {
    const { container } = render(<LoadingSpinner />);

    const spinner = container.querySelector('.loading-spinner');
    const icon = container.querySelector('.spinner-icon');
    const text = container.querySelector('.spinner-text');

    expect(spinner).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});