import React from 'react';

export type Payload<PL> = {
  content: PL | undefined;
  hasContent: boolean;
  clear: () => void;
  set: React.Dispatch<React.SetStateAction<PL | undefined>>;
};

export const usePayload = <PL>(defaultValue: PL | undefined = undefined): Payload<PL> => {
  const [content, set] = React.useState<PL | undefined>(defaultValue);
  const clear = React.useCallback(() => set(undefined), []);
  return React.useMemo(
    () => ({
      content,
      hasContent: content !== undefined,
      clear: clear,
      set,
    }),
    [content, clear]
  );
};
