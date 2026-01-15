import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoading } from '../hooks/useLoading';

describe('useLoading', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useLoading());
    
    expect(result.current.isLoading).toBe(false);
  });

  it('initializes with custom initial state', () => {
    const { result } = renderHook(() => useLoading(true));
    
    expect(result.current.isLoading).toBe(true);
  });

  it('starts loading', () => {
    const { result } = renderHook(() => useLoading());
    
    act(() => {
      result.current.startLoading();
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('stops loading', () => {
    const { result } = renderHook(() => useLoading(true));
    
    act(() => {
      result.current.stopLoading();
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('manages loading state with async function', async () => {
    const { result } = renderHook(() => useLoading());
    
    const mockAsyncFn = vi.fn().mockResolvedValue('success');

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      const resultValue = await result.current.withLoading(mockAsyncFn);
      expect(mockAsyncFn).toHaveBeenCalledOnce();
      expect(resultValue).toBe('success');
    });
    
    expect(result.current.isLoading).toBe(false);
  });

  it('handles async function errors correctly', async () => {
    const { result } = renderHook(() => useLoading());
    
    const mockError = new Error('Test error');
    const mockAsyncFn = vi.fn().mockRejectedValue(mockError);

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      try {
        await result.current.withLoading(mockAsyncFn);
      } catch (error) {
        expect(error).toBe(mockError);
      }
    });

    expect(result.current.isLoading).toBe(false);
  });
});