import React from 'react';
import { ConfirmationPopup } from 'popup/popupContext';
import { Button, Dialog } from '@blueprintjs/core';
import { DialogBody, DialogFooterActions } from 'components';
import { useTranslation } from 'translation';

interface ConfirmationDialogProps {
  popupData: ConfirmationPopup;
  onClose: (popupData: ConfirmationPopup) => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = React.memo(({ popupData, onClose }) => {
  const { t } = useTranslation();

  const closeAndReject = React.useCallback(() => {
    popupData.onReject();
    onClose(popupData);
  }, [popupData, onClose]);

  const closeAndAccept = React.useCallback(() => {
    popupData.onConfirm();
    onClose(popupData);
  }, [popupData, onClose]);

  return (
    <Dialog onClose={closeAndReject} isOpen>
      <DialogBody>{popupData.message}</DialogBody>
      <DialogFooterActions>
        <Button onClick={closeAndAccept}>{t('button:YES')}</Button>
        <Button onClick={closeAndReject}>{t('button:NO')}</Button>
      </DialogFooterActions>
    </Dialog>
  );
});
