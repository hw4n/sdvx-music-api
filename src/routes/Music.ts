import express from 'express';
import dbMusic from '../models/Music';

const router = express.Router();

import fs from 'fs';

router.get('/', (req: express.Request, res) => {
  const title: string = req.query.title as string;
  const artist: string = req.query.artist as string;
  const titleRegex = RegExp(title, 'i');
  const artistRegex = RegExp(artist, 'i');

  if (!title && !artist) {
    res.status(400).json({
      error: {
        code: 400,
        message: 'The request is missing a valid query string.',
      },
    });
    return;
  }

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
        'info.artist_name': artistRegex,
      }, {
        'info.artist_yomigana': artistRegex,
      }, {
        'info.ascii': artistRegex,
      }],
    });
  }

  dbMusic.find(query).then((found) => {
    if (found.length >= 10) {
      // exact search
      const exact = found.filter((music) => {
        // eslint-disable-next-line camelcase
        const { title_name, artist_name } = music.info;
        return (
          title.toLowerCase() === title_name.toLowerCase()
          || artist === artist_name.toLowerCase()
        );
      });
      if (exact.length === 1) {
        return res.status(200).json(exact);
      }
    }
    res.status(200).json(found);
  });
});

export default router;
