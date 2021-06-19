import fs from 'fs';
import mongoose from 'mongoose';
import dbMusic from '../models/Music';
import generateUrl from './generateUrl';

function connectDB() {
  mongoose.connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to database'));
}

function insertMusicArray() {
  let json = JSON.parse(fs.readFileSync('./data/music_db.json').toString());
  json = json.map((music) => {
    // eslint-disable-next-line no-param-reassign
    music.cover = generateUrl(music);
    return music;
  });
  dbMusic.insertMany(json).then(() => {
    console.log('Inserted music data to database');
  });
}

export default function initialize(argv) {
  const { resetDb } = argv;
  connectDB();
  if (resetDb) {
    dbMusic.deleteMany({}).then(() => {
      console.log('Dropped music data on database');
    });
  }
  dbMusic.countDocuments().then((length) => {
    if (!length) {
      insertMusicArray();
    }
  });
}
