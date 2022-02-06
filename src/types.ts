export type EntryProps = Record<string, string>;

export type GameListField = {
  internalId: string;
  name: string;
  value: string;
  props: EntryProps;
};

export type GameListEntry = {
  props: EntryProps;
  fields: GameListField[];
  internalId: string;
};

export type GameList = {
  games: Array<GameListEntry>;
  path: string;
};

export enum KnownField {
  Name = 'name',
  Desc = 'desc',
  Image = 'image',
  Thumbnail = 'thumbnail',
  Rating = 'rating',
  ReleaseDate = 'releasedate',
  Developer = 'developer',
  Publisher = 'publisher',
  Genre = 'genre',
  Players = 'players',
  PlayCount = 'playcount',
  LastPlayed = 'lastplayed',
  Path = 'path',
}
