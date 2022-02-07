export type EntryProps = Record<string, string>;

export type GameListField<N extends string | KnownField = string> = Readonly<{
  internalId: string;
  name: N;
  value: string;
  props: EntryProps;
}>;

export type GameListEntry = Readonly<{
  props: EntryProps;
  fields: GameListField[];
  internalId: string;
}>;

export type GameList = Readonly<{
  games: Array<GameListEntry>;
  fileName: string,
  path: string;
}>;

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
  Favorite = 'favorite',
}
