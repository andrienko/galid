import React from 'react';

export type StateObject<S> = {
  value: S;
  set: React.Dispatch<React.SetStateAction<S>>;
};

export const useStateObject = <S = undefined>(defaultValue: S): StateObject<S> => {
  const [value, set] = React.useState<S>(defaultValue);
  return React.useMemo<StateObject<S>>(() => ({ value, set }), [set, value]);
};
