/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const { Iconv } = require('iconv');

const fs = require('fs');
const convert = require('xml-js');

const musicDB = fs.readFileSync('./data/music_db.xml');

const iconv = new Iconv('SHIFT_JIS', 'UTF-8//translit//ignore');

let utf8xml = iconv.convert(musicDB).toString();

const replacements = [
  ['\u203E', '~'],
  ['\u301C', '～'],
  ['\u49FA', 'ê'],
  ['\u5F5C', 'ū'],
  ['\u66E6', 'à'],
  ['\u66E9', 'è'],
  ['\u8E94', '🐾'],
  ['\u9A2B', 'á'],
  ['\u9A69', 'Ø'],
  ['\u9A6B', 'ā'],
  ['\u9A6A', 'ō'],
  ['\u9AAD', 'ü'],
  ['\u9B2F', 'ī'],
  ['\u9EF7', 'ē'],
  ['\u9F63', 'Ú'],
  ['\u9F67', 'Ä'],
  ['\u973B', '♠'],
  ['\u9F6A', '♣'],
  ['\u9448', '♦'],
  ['\u9F72', '♥'],
  ['\u9F76', '♡'],
  ['\u9F77', 'é'],
];

replacements.forEach((replacement) => {
  const [target, substitute] = replacement;
  utf8xml = utf8xml.replace(RegExp(target, 'g'), substitute);
});

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
