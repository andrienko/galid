import React from 'react';
import { useUiContext } from 'context/ui';
import { Dialog, Classes, Button, Intent } from '@blueprintjs/core';
import { useTranslation } from 'translation';
import { version } from 'common/constants';

export const AboutWindow: React.FC = ({ children }) => {
  const { aboutDialog } = useUiContext();
  const { t } = useTranslation();

  return (
    <Dialog isOpen={aboutDialog.active} onClose={aboutDialog.disable}>
      <div className={Classes.DIALOG_BODY}>{t('message:ABOUT', { version })}</div>
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={aboutDialog.disable} intent={Intent.PRIMARY}>
            {t('button:CLOSE')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
