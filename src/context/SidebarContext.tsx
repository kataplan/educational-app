'use client';

import React, { createContext, useContext, useState, FC, PropsWithChildren } from 'react';

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarProvider: FC<PropsWithChildren> = ({ children }): React.ReactElement => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
} 

export { SidebarProvider, useSidebar };