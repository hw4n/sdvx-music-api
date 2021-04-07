import fs from 'fs';
import mongoose from 'mongoose';
import dbMusic from '../models/Music';

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
  const json = JSON.parse(fs.readFileSync('./data/music_db.json').toString());
  dbMusic.insertMany(json).then(() => {
    console.log('Inserted music data');
  });
}

export default function initialize() {
  connectDB();
  insertMusicArray();
}
