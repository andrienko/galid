export type AppSettings = {
  reopenLastFile: boolean;
};

export type AppOptions = {
  settings: AppSettings;
  lastOpenFile?: string;
};
