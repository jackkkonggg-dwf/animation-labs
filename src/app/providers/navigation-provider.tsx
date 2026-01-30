'use client';

import { createContext, use, useState, useCallback, type ReactNode } from 'react';

// ============================================================================
// NAVIGATION CONTEXT INTERFACE
// ============================================================================

interface NavigationState {
  isMenuOpen: boolean;
}

interface NavigationActions {
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

interface NavigationContextValue extends NavigationState, NavigationActions {}

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

// ============================================================================
// NAVIGATION HOOK (React 19 - using use() pattern)
// ============================================================================

/**
 * useNavigation - Access navigation state and actions
 *
 * Uses React 19's use() hook for context consumption.
 * Can be called conditionally, unlike useContext.
 *
 * @throws Error if used outside NavigationProvider
 */
export function useNavigation(): NavigationContextValue {
  const context = use(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

// ============================================================================
// NAVIGATION PROVIDER COMPONENT
// ============================================================================

interface NavigationProviderProps {
  children: ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  return (
    <NavigationContext.Provider
      value={{
        isMenuOpen,
        openMenu,
        closeMenu,
        toggleMenu,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}
