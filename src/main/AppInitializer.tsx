import React from 'react';
import { Layout } from './Layout';
import { loadOptions } from 'osSpecific';
import { useOptionsContext } from 'options/context';
import { parseJson } from 'helpers/json';
import { AppOptions } from 'options/types';
import { useActionsContext } from 'context/actions';

// Used to run UseEffect only once, immediately. TODO: Figure a better way of doing this...
let triedToInitialize: boolean = false;

// Actions that happen before showing the UI
export const AppInitializer: React.FC = () => {
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);
  const { setOptions, options } = useOptionsContext();
  const { openXMLFile } = useActionsContext();

  React.useEffect(() => {

    if (!triedToInitialize) {
      triedToInitialize = true;
      (async () => {
        const loadedOptions = parseJson<AppOptions>((await loadOptions()) || undefined);
        if (loadedOptions) {
          setOptions(loadedOptions, false);
        }
        const usedOptions = loadedOptions || options;
        if (usedOptions?.settings?.reopenLastFile && usedOptions.lastOpenFile) {
          openXMLFile(usedOptions.lastOpenFile);
        }
        setIsInitialized(true);
      })();
    }
  }, [openXMLFile, isInitialized, setOptions, options]);

  if (isInitialized) {
    return <Layout />;
  } else {
    return <div>Loading...</div>;
  }
};
