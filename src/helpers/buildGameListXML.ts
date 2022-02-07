import { EntryProps, GameList, GameListEntry, KnownField } from 'common/types';

// Removing empty Field before XML export
const transformGameBeforeExport = (game: GameListEntry): GameListEntry => {
  const fields = game.fields.filter((field) => {
    if (Object.keys(field.props).length) {
      return true;
    }
    if (field.value.trim() === '') {
      return false;
    }
    if (field.name === KnownField.Players && field.value === '1') {
      return false;
    }
    return true;
  });
  return { ...game, fields };
};

// Assign attributes to XML node from key-value object of props
const assignProps = (entry: HTMLElement, props: EntryProps) => {
  Object.entries(props).forEach(([prop, value]) => {
    entry.setAttribute(prop, value);
  });
};

// Transform a single game to XML node of given XML document
const gameToXMLNode = (game: GameListEntry, doc: XMLDocument): HTMLElement => {
  const gameEntry = doc.createElement('game');
  assignProps(gameEntry, game.props);
  game.fields.forEach((field) => {
    const fieldEntry = doc.createElement(field.name);
    assignProps(fieldEntry, field.props);
    fieldEntry.textContent = field.value;
    gameEntry.appendChild(fieldEntry);
  });
  return gameEntry;
};

// Used to add indents to XML nodes (so the exported document looks nice)
// Origin: https://stackoverflow.com/a/47317538/1115664
const addXMLIndents = (doc: XMLDocument) => {
  const xsltFormatterStylesheet = new DOMParser().parseFromString(
    `<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
      <xsl:strip-space elements="*"/>
      <xsl:template match="para[content-style][not(text())]">
        <xsl:value-of select="normalize-space(.)"/>
      </xsl:template>
      <xsl:template match="node()|@*">
        <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>
      </xsl:template>
      <xsl:output indent="yes"/>
    </xsl:stylesheet>`,
    'application/xml'
  );
  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltFormatterStylesheet);
  return xsltProcessor.transformToDocument(doc);
};

const XMLDocumentToString = (doc: XMLDocument): string => {
  const serializer = new XMLSerializer();
  return `<?xml version="1.0"?>\n` + serializer.serializeToString(doc);
};

// Transform entire helpers to
export const buildGameListXML = (gameList: GameList): string => {
  const doc = document.implementation.createDocument('', '', null);
  const gameListElement = doc.createElement('gameList');
  gameList.games.forEach((game) => {
    const gameEntry = gameToXMLNode(transformGameBeforeExport(game), doc);
    gameListElement.appendChild(gameEntry);
  });
  doc.appendChild(gameListElement);

  return XMLDocumentToString(addXMLIndents(doc));
};
