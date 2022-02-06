import { Translations } from 'logic/translationContext';
import { KnownField } from 'common/types';

export const translations: Translations = {
  en: {
    default: {},
    button: {
      SAVE: 'Save',
      SAVE_AS: 'Save As...',
      OPEN: 'Open',
      ABOUT: 'About App',
    },
    message: {
      GAME_NOT_SELECTED: 'Select a game first',
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
