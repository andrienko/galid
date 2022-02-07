import React from 'react';

import { Alignment, Button, Navbar, ButtonGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { useTranslation } from 'translation';
import { useUiContext } from 'context/ui';
import { useActionsContext } from 'context/actions';
import styled from 'styled-components';
import { useOptionsContext } from 'options/context';

const MainMenuNavbar = styled(Navbar)`
  user-select: none;
  box-shadow: 0 2px 2px -2px;
  padding: 0 6px;

  &,
  .bp4-navbar-group {
    height: 38px;
  }
`;

export const MainMenu: React.FC = () => {
  const { t } = useTranslation();
  const { aboutDialog } = useUiContext();
  const { open, saveAs } = useActionsContext();
  const { optionsDialog } = useOptionsContext();

  return (
    <MainMenuNavbar>
      <Navbar.Group align={Alignment.LEFT}>
        <ButtonGroup>
          <Button icon={IconNames.FOLDER_OPEN} onClick={open} title={t('button:OPEN')}>
            {t('button:OPEN')}
          </Button>
          <Button icon={IconNames.FLOPPY_DISK} onClick={saveAs} title={t('button:SAVE_AS')}>
            {t('button:SAVE_AS')}
          </Button>
        </ButtonGroup>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <ButtonGroup>
          <Button icon={IconNames.HELP} onClick={aboutDialog.enable} title={t('button:ABOUT')} />
          <Button icon={IconNames.SETTINGS} onClick={optionsDialog.enable} title={t('button:SETTINGS')} />
        </ButtonGroup>
      </Navbar.Group>
    </MainMenuNavbar>
  );
};
