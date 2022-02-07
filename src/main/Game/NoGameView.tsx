import React from 'react';
import { useTranslation } from 'translation';
import styled from 'styled-components';

const NoGameWrapper = styled.div`
  background: #bbb;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  .text{
    text-shadow: 0 1px #fff6;
  }
`;

export const NoGameView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <NoGameWrapper>
      <div className="text">{t('message:GAME_NOT_SELECTED')}</div>
    </NoGameWrapper>
  );
};
