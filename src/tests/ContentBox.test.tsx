import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContentBox from '../components/shared/ContentBox';

describe('ContentBox', () => {
  it('renders with title and children', () => {
    render(
      <ContentBox title="Test Title">
        <div>Test content</div>
      </ContentBox>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders without title when not provided', () => {
    render(
      <ContentBox>
        <div>Test content</div>
      </ContentBox>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const { container } = render(
      <ContentBox title="Test">Content</ContentBox>
    );

    const contentBox = container.querySelector('.content-box');
    expect(contentBox).toBeInTheDocument();
    
    const title = container.querySelector('.box-title');
    expect(title).toBeInTheDocument();
  });
});