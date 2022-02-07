import { Translations } from './translation';
import { KnownField } from 'common/types';

export const translations: Translations = {
  en: {
    default: {},
    button: {
      SAVE: 'Save',
      SAVE_AS: 'Save As...',
      OPEN: 'Open',
      ABOUT: 'About Index',
      CLOSE: 'Close',
      SETTINGS: 'Settings',
      YES: 'Yes',
      NO: 'No',
    },
    message: {
      NO_GAMELIST_LOADED: 'Open a game list first',
      GAME_NOT_SELECTED: 'Select a game first',
      ABOUT: 'GaLiD ver.{{version}} - in development',
      DELETE_GAME: 'Delete game',
      DELETE_GAME_CONFIRMATION: 'Are you sure you want to delete the game? This cannot be undone.',
    },
    field: {
      [KnownField.Name.toUpperCase()]: 'Game Name',
      [KnownField.Desc.toUpperCase()]: 'Game Description',
      [KnownField.Path.toUpperCase()]: 'File path',
      [KnownField.LastPlayed.toUpperCase()]: 'Last time played',
      [KnownField.Players.toUpperCase()]: 'Players count',
      [KnownField.Publisher.toUpperCase()]: 'Publisher',
      [KnownField.Developer.toUpperCase()]: 'Developer',
      [KnownField.PlayCount.toUpperCase()]: 'How many times played',
      [KnownField.Genre.toUpperCase()]: 'Genre',
      [KnownField.ReleaseDate.toUpperCase()]: 'Release date',
      [KnownField.Rating.toUpperCase()]: 'Rating',
      [KnownField.Thumbnail.toUpperCase()]: 'Thumbnail',
      [KnownField.Image.toUpperCase()]: 'Image',
    },
  },
};
