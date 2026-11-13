/**
 * Splits the text of an article into paragraphs: an empty line ends a paragraph.
 * Single line breaks stay inside their paragraph.
 */
export const splitParagraphs = (content: string): string[] =>
  content
    .replaceAll("\r\n", "\n")
    .split(/\n[ \t]*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
