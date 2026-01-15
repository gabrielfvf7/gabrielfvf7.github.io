import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTime } from '../hooks/useTime';

describe('useTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns current time on mount', () => {
    const mockDate = new Date('2024-01-01 12:30:45');
    vi.setSystemTime(mockDate);

    const { result } = renderHook(() => useTime());
    
    expect(typeof result.current).toBe('string');
    expect(result.current).toMatch(/\d{2}:\d{2}/);
  });

  it('updates time format correctly', async () => {
    const initialDate = new Date('2024-01-01 12:30:45');
    vi.setSystemTime(initialDate);

    const { result } = renderHook(() => useTime());
    
    expect(typeof result.current).toBe('string');
    expect(result.current).toMatch(/\d{2}:\d{2}/);
  });
});