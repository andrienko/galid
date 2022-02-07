import { EntryProps, GameList, GameListEntry, GameListField, KnownField } from 'common/types';
import { sortBy } from 'lodash';
import { knownFields } from 'common/constants';
import * as path from '@tauri-apps/api/path';
import { generateRandomId } from './generateRandomId';

export const ignoredNodes = ['#text'];

// Get all the attributes of XML node as a key-value object
const getNodeProps = (node: HTMLElement): EntryProps => {
  const foundProps: EntryProps = {};
  if (node.attributes.length) {
    for (let i = 0; i < node.attributes.length; i++) {
      const attr: Attr = node.attributes[i];
      const propName = attr.nodeName.trim();
      const propValue = attr.nodeValue?.trim() || '';
      if (propName && propValue) {
        foundProps[propName] = propValue;
      }
    }
  }
  return foundProps;
};

// Adding mandatory Field to game object after import
const transformGameAfterImport = (game: GameListEntry): GameListEntry => {
  let fields = game.fields;

  // Adding favorite field (if empty)
  if (!fields.some((field) => field.name === KnownField.Favorite)) {
    const favoriteField: GameListField<KnownField.Favorite> = {
      name: KnownField.Favorite,
      value: 'false',
      props: {},
      internalId: generateRandomId(),
    };
    fields = [...fields, favoriteField];
  }

  if (!fields.some((field) => field.name === KnownField.Players)) {
    const playersField: GameListField<KnownField.Players> = {
      name: KnownField.Players,
      value: '1',
      props: {},
      internalId: generateRandomId(),
    };
    fields = [...fields, playersField];
  }

  // Sorting Field, so known Field are on top and are ordered according to their order in knownFields constant
  fields = sortBy(fields, (a) => {
    const index = knownFields.indexOf(a.name as KnownField);
    return ~index ? index : Infinity;
  });

  return { ...game, fields };
};

export const buildGameList = async (xmlData: string, fileName: string): Promise<GameList> => {
  const gameList: GameList = { games: [], path: await path.basename(fileName), fileName };
  const parser = new DOMParser();
  const document = parser.parseFromString(xmlData, 'application/xml');
  const games = document.querySelectorAll('gameList game');

  if (games.length) {
    [].forEach.call(games, (gameNode: HTMLElement) => {
      let game: GameListEntry = {
        fields: [],
        props: getNodeProps(gameNode),
        internalId: generateRandomId(),
      };

      [].forEach.call(gameNode.childNodes, (fieldNode: HTMLElement) => {
        const fieldName = fieldNode.nodeName.toLowerCase();
        const fieldValue = fieldNode.textContent?.trim() || '';
        if (!ignoredNodes.includes(fieldName)) {
          game.fields.push({
            name: fieldName.trim(),
            props: getNodeProps(fieldNode),
            value: fieldValue.trim(),
            internalId: generateRandomId(),
          });
        }
      });

      game = transformGameAfterImport(game);

      if (Object.entries(game).length) {
        gameList.games.push(game);
      }
    });
  }
  return gameList;
};
