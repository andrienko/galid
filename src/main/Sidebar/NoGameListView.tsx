import React from 'react';
import { useTranslation } from 'translation/translation';
import styled from 'styled-components';

const NoGamelistWrapper = styled.div`
  background: #ccc;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  .text {
    text-shadow: 0 1px #fff6;
  }
`;

export const NoGameListView: React.FC<{ className?: string }> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <NoGamelistWrapper className={className}>
      <div className="text">{t('message:NO_GAMELIST_LOADED')}</div>
    </NoGamelistWrapper>
  );
};
