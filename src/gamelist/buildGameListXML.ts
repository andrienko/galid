import { EntryProps, GameList, GameListEntry } from 'types';

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

const assignProps = (entry: HTMLElement, props: EntryProps) => {
  Object.entries(props).forEach(([prop, value]) => {
    entry.setAttribute(prop, value);
  });
};

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

export const buildGameListXML = (gameList: GameList): string => {
  const doc = document.implementation.createDocument('', '', null);
  const gameListElement = doc.createElement('gameList');
  gameList.games.forEach((game) => {
    const gameEntry = gameToXMLNode(game, doc);
    gameListElement.appendChild(gameEntry);
  });
  doc.appendChild(gameListElement);
  const xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltFormatterStylesheet);
  const prettyPrintedXML = xsltProcessor.transformToDocument(doc);

  const serializer = new XMLSerializer();
  return `<?xml version="1.0"?>\n` + serializer.serializeToString(prettyPrintedXML);
};
