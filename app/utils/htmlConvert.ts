import { convert } from 'html-to-text';

export function convertComment(htmlText: string) {
  const converted = convert(htmlText);
  return converted;
}
