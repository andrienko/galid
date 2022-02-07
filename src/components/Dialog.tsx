import classNames from 'classnames';
import React from 'react';
import { Classes } from '@blueprintjs/core';

export const DialogBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div {...props} className={classNames(props.className, Classes.DIALOG_BODY)} />
);

export const DialogFooterActions: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
  <div {...props} className={classNames(props.className, Classes.DIALOG_FOOTER)}>
    <div className={Classes.DIALOG_FOOTER_ACTIONS}>{props.children}</div>
  </div>
);
