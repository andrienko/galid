# Galid

GaLiD is yet another tool to edit EmulationStation's gamelist.xml files.

(https://github.com/Aloshi/EmulationStation/blob/master/GAMELISTS.md)

TODO: Write something here...

## Todos

- Settings dialog
- GameList should know its path (to be able to check ROMs and images, and to form paths)
- Checking rom file existence (highlight missing red maybe)
- Images (image, thumb, icon)
- Genre select (will need to get a list of those)
- File list scanning to generate an empty gamelist (will need to get filenames for each platform, yuk)
- Create, delete, clone and rearrange games
- Folders (at least in read-only mode, at least without contents)
- Create empty folders, move files and folders
- Bulk editing multiple games (folders?)
- Drag-n-drop images into image selectors (https://github.com/tauri-apps/wry/issues/87#issuecomment-915054980)

## Think about

- Think about reasonable file structure (current one is erratic)
- Less crappy approach to initializing
- Better approach to saving settings
- Tree list memoization (WeakMap sounds good? Should these be mutable maybe?)
- Passing setters as reducers
- Search for developers and publishers (any good catalog? make own catalog?)
- Some scraping. Most websites are greedy - so will need kind of an API.
