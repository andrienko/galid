import * as dialog from '@tauri-apps/api/dialog';
import * as fs from '@tauri-apps/api/fs';
import * as window from '@tauri-apps/api/window';
import * as path from '@tauri-apps/api/path';
import { app } from '@tauri-apps/api/bundle';

export const selectGamelistToOpen = async (): Promise<string | null> => {
  const files = await dialog.open({
    // defaultPath: '.',
    multiple: false,
    filters: [{ extensions: ['xml'], name: 'XML file' }],
  });

  if (Array.isArray(files)) {
    return files[0];
  }
  return files;
};

export const setWindowTitle = async (title: string): Promise<void> => {
  if (document) {
    document.title = title;
  }
  const w = window.getCurrent();
  w.setTitle(title);
};

export const selectGameListToSave = async (): Promise<string | null> => {
  return await dialog.save({ filters: [{ extensions: ['xml'], name: 'XML file' }] });
};

// --- Reading/writing files

export const loadFile = async (fullPath: string): Promise<string | null> => {
  return fs.readTextFile(fullPath);
};

export const writeFile = async (fullPath: string, content: string): Promise<void> => {
  return fs.writeFile({ contents: content, path: fullPath });
};

// --- Options

const appDirName = 'GaLiD';
let appDir: string | undefined = undefined;

const getAppDir = async (): Promise<string> => {
  if (appDir) {
    return appDir;
  }
  const appDataDir = await path.dataDir();
  const pendingAppDir = await path.join(appDataDir, appDirName);

  const dirContents = await fs.readDir(appDataDir);
  if (!dirContents?.some((file) => file.name)) {
    await fs.createDir(pendingAppDir);
  }

  appDir = pendingAppDir;
  return pendingAppDir;
};

const getOptionsFileName = async (): Promise<string> => {
  const appDir = await getAppDir();
  const optionsFileName = appDir + path.sep + 'options.json';
  return optionsFileName;
};

export const loadOptions = async (): Promise<string | null> => {
  try {
    return await loadFile(await getOptionsFileName());
  } catch (e) {
    return null;
  }
};

export const writeOptions = async (contents: string) => {
  const path = await getOptionsFileName();
  return fs.writeFile({
    path,
    contents,
  });
};
