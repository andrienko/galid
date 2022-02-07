import React from 'react';
import { Dialog, Button, Intent } from '@blueprintjs/core';
import { DialogBody, DialogFooterActions } from 'components';
import { useTranslation } from 'translation';
import { version } from 'common/constants';
import { useOptionsContext } from 'options/context';

export const OptionsWindow: React.FC = ({ children }) => {
  const { optionsDialog } = useOptionsContext();
  const { t } = useTranslation();

  return (
    <Dialog isOpen={optionsDialog.active} onClose={optionsDialog.disable}>
      <DialogBody>{t('message:ABOUT', { version })}</DialogBody>
      <DialogFooterActions>
        <Button onClick={optionsDialog.disable} intent={Intent.PRIMARY}>
          {t('button:CLOSE')}
        </Button>
      </DialogFooterActions>
    </Dialog>
  );
};
