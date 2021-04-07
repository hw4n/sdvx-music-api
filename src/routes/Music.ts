import express from 'express';
import dbMusic from '../models/Music';

const router = express.Router();

router.get('/', (req, res) => {
  dbMusic.find({}).then((musics) => {
    res.status(200).json(musics);
  });
});

export default router;
