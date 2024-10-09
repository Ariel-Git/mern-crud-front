import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LastVisitedPageContextType {
  lastVisitedPage: string | null;
  setLastVisitedPage: (page: string | null) => void;
}

interface LastVisitedPageProviderProps {
  children: ReactNode;
}

const LastVisitedPageContext = createContext<
  LastVisitedPageContextType | undefined
>(undefined);

export const LastVisitedPageProvider: React.FC<
  LastVisitedPageProviderProps
> = ({ children }) => {
  const [lastVisitedPage, setLastVisitedPage] = useState<string | null>(null);

  return (
    <LastVisitedPageContext.Provider
      value={{ lastVisitedPage, setLastVisitedPage }}
    >
      {children}
    </LastVisitedPageContext.Provider>
  );
};

export const useLastVisitedPage = () => {
  const context = useContext(LastVisitedPageContext);
  if (context === undefined) {
    throw new Error(
      'useLastVisitedPage must be used within a LastVisitedPageProvider',
    );
  }
  return context;
};
