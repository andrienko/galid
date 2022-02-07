import { ConfirmationPopup, PopupType, usePopupContext } from 'popup/popupContext';
import React from 'react';
import { generateRandomId } from 'helpers/generateRandomId';

export const useConfirmation = () => {
  const { setPopupQueue } = usePopupContext();
  return React.useCallback(
    (title: string, message: string) =>
      new Promise<boolean>((resolve) => {
        const popup: ConfirmationPopup = {
          title,
          message,
          id: generateRandomId(),
          onConfirm: () => resolve(true),
          onReject: () => resolve(false),
          type: PopupType.Confirmation,
        };
        setPopupQueue((queue) => [...queue, popup]);
      }),
    [setPopupQueue]
  );
};
