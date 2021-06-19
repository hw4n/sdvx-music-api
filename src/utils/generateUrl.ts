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
  const dirname = coverdirs.filter((dir) => dir.includes(ascii))[0];
  const newlabel = dirname.slice(0, 4);
  return [dirname, newlabel];
}

export default function generateUrl(music: IMusic) {
  const { ascii } = music.info;
  const [dirname, newlabel] = directoryByAscii(ascii);
  const baseUrl = `/cover/${dirname}/jk_${newlabel}`;
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
