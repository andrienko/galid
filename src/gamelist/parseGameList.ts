import { GameList, GameListEntry, EntryProps, GameListField, KnownField } from 'types';
import { find, sortBy } from 'lodash';
import { knownFields } from 'const';

export const ignoredNodes = ['#text'];

let idCounter = 0;
const generateRandomId = (): string => `${(idCounter++).toString(16)}${Math.random().toString(16).slice(2)}`;

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

const sortFields = (fields: GameListField[]): GameListField[] => {
  return sortBy(fields, (a) => {
    const index = knownFields.indexOf(a.name as KnownField);
    if (index >= 0) {
      return index;
    }
    return Infinity;
  });
};

export const parseGameList = (xmlData: string): GameList => {
  const gameList: GameList = { games: [], path: '' };
  const parser = new DOMParser();
  const document = parser.parseFromString(xmlData, 'application/xml');
  const games = document.querySelectorAll('gameList game');

  if (games.length) {
    [].forEach.call(games, (gameNode: HTMLElement) => {
      const game: GameListEntry = {
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
      game.fields = sortFields(game.fields);
      if (Object.entries(game).length) {
        gameList.games.push(game);
      }
    });
  }
  return gameList;
};
