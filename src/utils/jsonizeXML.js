/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import Iconv from 'iconv';

const fs = require('fs');
const convert = require('xml-js');

const musicDB = fs.readFileSync('./data/music_db.xml');

const iconv = new Iconv('SHIFT_JIS', 'UTF-8//translit//ignore');

const utf8xml = iconv.convert(musicDB).toString();

// fs.writeFileSync('./data/music_db_utf8.xml', utf8xml);

function removeTextAttribute(value, parentElement) {
  try {
    const keyNo = Object.keys(parentElement._parent).length;
    const keyName = Object.keys(parentElement._parent)[keyNo - 1];
    parentElement._parent[keyName] = value;
  // eslint-disable-next-line no-empty
  } catch (e) {}
}

const utf8json = convert.xml2js(utf8xml, {
  compact: true,
  ignoreDeclaration: true,
  ignoreAttributes: true,
  textFn: removeTextAttribute,
});

utf8json.mdb.music.forEach((music) => delete music.tag);

fs.writeFileSync('./data/music_db.json', JSON.stringify(utf8json.mdb.music, null, 2));
