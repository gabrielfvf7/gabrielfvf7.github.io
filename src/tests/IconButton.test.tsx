import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from '../components/shared/IconButton';

describe('IconButton', () => {
  it('renders button with children', () => {
    render(
      <IconButton onClick={() => {}}>
        <span>X</span>
      </IconButton>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(
      <IconButton onClick={handleClick}>
        <span>Click</span>
      </IconButton>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('applies variant classes', () => {
    const { container } = render(
      <IconButton onClick={() => {}} variant="close">
        X
      </IconButton>
    );

    const button = container.querySelector('.icon-button--close');
    expect(button).toBeInTheDocument();
  });

  it('disables button when disabled', () => {
    render(
      <IconButton onClick={() => {}} disabled>
        Disabled
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('sets title attribute', () => {
    render(
      <IconButton onClick={() => {}} title="Test tooltip">
        Button
      </IconButton>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'Test tooltip');
  });
});