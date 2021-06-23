import fs from 'fs';
import { IMusic } from '../models/Music';

function coverUrl(baseUrl, diff, diffcode) {
  if (diff === undefined) {
    return null;
  }
  const filename = `${baseUrl}_${diffcode}`;
  return fs.existsSync(`.${filename}.png`) ? {
    s: `${filename}_s.png`,
    m: `${filename}.png`,
    b: `${filename}_b.png`,
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
  const nov = coverUrl(baseUrl, novice, 1);
  const adv = coverUrl(baseUrl, advanced, 2);
  const exh = coverUrl(baseUrl, exhaust, 3);
  const inf = coverUrl(baseUrl, infinite, 4);
  const mxm = coverUrl(baseUrl, maximum, 5);
  return {
    novice: novice && novice.difnum > 0 ? nov : null,
    // harder difficulty might use previous cover art
    advanced: advanced && advanced.difnum > 0 ? (adv || nov) : null,
    exhaust: exhaust && exhaust.difnum > 0 ? (exh || adv || nov) : null,
    infinite: infinite && infinite.difnum > 0 ? (inf || exh || adv || nov) : null,
    maximum: maximum && maximum.difnum > 0 ? (mxm || exh || adv || nov) : null,
  };
}
