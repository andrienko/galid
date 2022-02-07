import { KnownField } from 'common/types';

// Used to distinguish non-standard Field from supported ones (used by scrapers and whatever)
// Also order of this list affects the order of Field when rendering form.
// Should be rendered using <UnknownField/>
export const knownFields = [
  KnownField.Name,
  KnownField.Desc,
  KnownField.Path,
  KnownField.Image,
  KnownField.Thumbnail,
  KnownField.Genre,
  KnownField.ReleaseDate,
  KnownField.Developer,
  KnownField.Publisher,
  KnownField.Rating,
  KnownField.Players,
  KnownField.PlayCount,
  KnownField.LastPlayed,
  KnownField.Favorite,
];

export const version = `0.0.1`;
