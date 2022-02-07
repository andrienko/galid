import React from 'react';
import { setWindowTitle as setOsWindowTitle } from 'osSpecific';
import { BooleanState, useBooleanState } from 'hooks/useBooleanState';

type UiContextValue = {
  aboutDialog: BooleanState;
  setWindowTitle: (newTitle: string) => void;
};

const UiContext = React.createContext<UiContextValue | undefined>(undefined);

export const useUiContext = (): UiContextValue => {
  const contextValue = React.useContext(UiContext);
  if (!contextValue) {
    throw new Error('useUiContext must be used inside UiContextProvider');
  }
  return contextValue;
};

export const UiContextProvider: React.FC = ({ children }) => {
  const aboutDialog = useBooleanState();
  const setWindowTitle = React.useCallback(
    (newTitle: string) => setOsWindowTitle(newTitle ? `${newTitle} - GaLiD` : 'GaLiD'),
    []
  );
  const contextValue = React.useMemo<UiContextValue>(
    () => ({ aboutDialog, setWindowTitle }),
    [aboutDialog, setWindowTitle]
  );
  return <UiContext.Provider value={contextValue}>{children}</UiContext.Provider>;
};
