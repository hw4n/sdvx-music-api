import fs from 'fs';
import { IMusic } from '../models/Music';

function coverUrl(baseUrl, diff, diffcode) {
  if (diff === undefined) {
    return null;
  }
  const { difnum } = diff;
  return parseInt(difnum, 10) !== 0 ? {
    s: `${baseUrl}_${diffcode}_s.png`,
    m: `${baseUrl}_${diffcode}.png`,
    b: `${baseUrl}_${diffcode}_b.png`,
  } : null;
}

const coverdirs = fs.readdirSync('./cover');
function directoryByAscii(ascii: string) {
  return coverdirs.filter((dir) => dir.includes(ascii))[0];
}

export default function generateUrl(music: IMusic) {
  const { label, ascii } = music.info;
  const baseUrl = `/cover/${directoryByAscii(ascii)}/jk_${label}`;
  // eslint-disable-next-line object-curly-newline
  const { novice, advanced, exhaust, infinite, maximum } = music.difficulty;
  return {
    novice: coverUrl(baseUrl, novice, 1),
    advanced: coverUrl(baseUrl, advanced, 2),
    exhaust: coverUrl(baseUrl, exhaust, 3),
    infinite: coverUrl(baseUrl, infinite, 4),
    maximum: coverUrl(baseUrl, maximum, 5),
  };
}
