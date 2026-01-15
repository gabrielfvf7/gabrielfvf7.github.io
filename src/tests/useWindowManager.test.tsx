import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWindowManager } from '../hooks/useWindowManager';

describe('useWindowManager', () => {
  it('initializes with empty windows array', () => {
    const { result } = renderHook(() => useWindowManager());
    
    expect(result.current.openWindows).toEqual([]);
  });

  it('opens a window', () => {
    const { result } = renderHook(() => useWindowManager());
    
    act(() => {
      result.current.openWindow('test');
    });

    expect(result.current.openWindows).toHaveLength(1);
    expect(result.current.openWindows[0]).toMatchObject({
      tab: 'test',
      isMinimized: false,
    });
  });

  it('closes a window', () => {
    const { result } = renderHook(() => useWindowManager());
    
    act(() => {
      result.current.openWindow('test');
    });
    
    expect(result.current.openWindows).toHaveLength(1);
    
    const windowId = result.current.openWindows[0].id;
    
    act(() => {
      result.current.closeWindow(windowId);
    });

    expect(result.current.openWindows).toHaveLength(0);
  });

  it('minimizes and restores a window', () => {
    const { result } = renderHook(() => useWindowManager());
    
    act(() => {
      result.current.openWindow('test');
    });

    const windowId = result.current.openWindows[0].id;

    act(() => {
      result.current.toggleMinimize(windowId);
    });

    expect(result.current.openWindows[0].isMinimized).toBe(true);

    act(() => {
      result.current.toggleMinimize(windowId);
    });

    expect(result.current.openWindows[0].isMinimized).toBe(false);
  });

  it('brings window to front', () => {
    const { result } = renderHook(() => useWindowManager());
    
    act(() => {
      result.current.openWindow('window1');
      result.current.openWindow('window2');
    });

    const firstWindowId = result.current.openWindows[0].id;
    const initialZIndex = result.current.openWindows[0].zIndex;

    act(() => {
      result.current.bringToFront(firstWindowId);
    });

    const updatedWindow = result.current.openWindows.find(w => w.id === firstWindowId);
    expect(updatedWindow?.zIndex).toBeGreaterThan(initialZIndex);
  });
});