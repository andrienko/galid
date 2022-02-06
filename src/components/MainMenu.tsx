import React from 'react';
import { useActionsContext } from 'logic/actionsContext';
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import 'styled-components/macro';
import { useGameListContext } from 'logic/gameListContext';
import { useTranslation } from 'logic/translationContext';

export const MainMenu: React.FC = () => {
  const { gameList } = useGameListContext();
  const { t } = useTranslation();
  const { openXMLFile, showHelp, saveAs, save } = useActionsContext();

  return (
    <Navbar className="thin mainMenu">
      <Navbar.Group align={Alignment.LEFT}>
        <Button small icon={IconNames.FOLDER_OPEN} onClick={openXMLFile} title={t('OPEN')} />
        <Button small icon={IconNames.FLOPPY_DISK} onClick={saveAs} title={t('SAVE_AS')} />
        <Button
          small
          css="svg{ filter: drop-shadow(0 0 20px #1b5e20);}"
          icon={IconNames.FLOPPY_DISK}
          disabled
          onClick={save}
          title={t('SAVE')}
        />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button small icon={IconNames.HELP} onClick={showHelp} title={t('ABOUT')} />
      </Navbar.Group>
    </Navbar>
  );
};
