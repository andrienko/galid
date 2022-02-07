import React from 'react';
import { Popup, PopupType, usePopupContext } from 'popup/popupContext';
import { ConfirmationDialog } from './ConfirmationDialog';

interface DialogsProps {}

export const Dialogs: React.FC<DialogsProps> = React.memo(() => {
  const { popupQueue, setPopupQueue } = usePopupContext();

  const closePopup = React.useCallback(
    (popup: Popup) => setPopupQueue((q) => q.filter((p) => p.id !== popup.id)),
    [setPopupQueue]
  );

  return (
    <>
      {popupQueue.map((popup) => {
        if (popup.type === PopupType.Confirmation) {
          return <ConfirmationDialog popupData={popup} key={popup.id} onClose={closePopup} />;
        }
        return null;
      })}
    </>
  );
});
