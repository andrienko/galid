import React from 'react';

export type BooleanState = {
  active: boolean;
  enable: () => void;
  disable: () => void;
  toggle: () => void;
  set: React.SetStateAction<React.Dispatch<boolean>>;
};

export const useBooleanState = (defaultValue: boolean = false): BooleanState => {
  const [active, set] = React.useState<boolean>(defaultValue);
  const enable = React.useCallback(() => set(true), []);
  const disable = React.useCallback(() => set(false), []);
  const toggle = React.useCallback(() => set((s) => !s), []);
  return React.useMemo(
    () => ({
      active,
      enable,
      disable,
      toggle,
      set,
    }),
    [active, enable, disable, toggle]
  );
};
