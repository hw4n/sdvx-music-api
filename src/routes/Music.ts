import express from 'express';
import dbMusic from '../models/Music';

const router = express.Router();

router.get('/', (req: express.Request, res) => {
  const title: string = req.query.title as string;
  const artist: string = req.query.artist as string;
  const titleRegex = RegExp(title, 'i');
  const artistRegex = RegExp(artist, 'i');

  const query = {
    $and: [],
  };

  if (title) {
    query.$and.push({
      $or: [{
        'info.title_name': titleRegex,
      }, {
        'info.title_yomigana': titleRegex,
      }, {
        'info.ascii': titleRegex,
      }],
    });
  }

  if (artist) {
    query.$and.push({
      $or: [{
        'info.artist_name': titleRegex,
      }, {
        'info.artist_yomigana': titleRegex,
      }, {
        'info.ascii': artistRegex,
      }],
    });
  }

  dbMusic.find(query).then((found) => {
    res.status(200).json(found);
  });
});

export default router;
