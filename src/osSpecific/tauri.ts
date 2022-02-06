import * as dialog from '@tauri-apps/api/dialog';
import * as fs from '@tauri-apps/api/fs';
import * as window from '@tauri-apps/api/window';

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

export const loadFile = async (fullPath: string): Promise<string | null> => {
  return fs.readTextFile(fullPath);
};

export const writeFile = async (fullPath: string, content: string): Promise<void> => {
  return fs.writeFile({ contents: content, path: fullPath });
};
