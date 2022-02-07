import React from 'react';

export enum PopupType {
  Confirmation = 'confirmation',
}

export type ConfirmationPopup = {
  type: PopupType.Confirmation;
  title: string;
  id: string;
  message: string;
  onConfirm: () => void;
  onReject: () => void;
};

export type Popup = ConfirmationPopup;

type PopupContextValue = {
  popupQueue: Popup[];
  setPopupQueue: React.Dispatch<React.SetStateAction<Popup[]>>;
};

const PopupContext = React.createContext<PopupContextValue | undefined>(undefined);

export const usePopupContext = (): PopupContextValue => {
  const contextValue = React.useContext(PopupContext);
  if (!contextValue) {
    throw new Error('usePopupContext must be used inside PopupContextProvider');
  }
  return contextValue;
};

export const PopupContextProvider: React.FC = ({ children }) => {
  const [popupQueue, setPopupQueue] = React.useState<Popup[]>([]);
  const contextValue = React.useMemo<PopupContextValue>(
    () => ({ popupQueue, setPopupQueue }),
    [setPopupQueue, popupQueue]
  );
  return <PopupContext.Provider value={contextValue}>{children}</PopupContext.Provider>;
};
