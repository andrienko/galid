import React from 'react';
import { BooleanState, useBooleanState } from 'hooks/useBooleanState';
import { AppOptions } from './types';
import { defaultOptions } from 'options/defaultOptions';
import { debounce } from 'lodash';
import { writeOptions } from 'osSpecific';
import { formatJson } from 'helpers/json';

const debouncedWriteOptions = debounce(writeOptions, 5000);

type OptionsContextValue = {
  optionsDialog: BooleanState;
  options: AppOptions;
  setOptions: (newValue: AppOptions, save?: boolean) => void;
};

const OptionsContext = React.createContext<OptionsContextValue | undefined>(undefined);

export const useOptionsContext = (): OptionsContextValue => {
  const contextValue = React.useContext(OptionsContext);
  if (!contextValue) {
    throw new Error('useOptionsContext must be used inside OptionsContextProvider');
  }
  return contextValue;
};

export const useOptions = (): AppOptions => useOptionsContext().options;

export const OptionsContextProvider: React.FC = ({ children }) => {
  const optionsDialog = useBooleanState();
  const [options, setOptionsState] = React.useState<AppOptions>(defaultOptions);

  const setOptions = React.useCallback((newOptions: AppOptions, save: boolean = true) => {
    setOptionsState(newOptions);
    if (save) {
      const optionsAsString = formatJson(newOptions);
      if (optionsAsString) {
        debouncedWriteOptions(optionsAsString);
      }
    }
  }, []);

  const contextValue = React.useMemo<OptionsContextValue>(
    () => ({ optionsDialog, options, setOptions }),
    [optionsDialog, options, setOptions]
  );
  return <OptionsContext.Provider value={contextValue}>{children}</OptionsContext.Provider>;
};
