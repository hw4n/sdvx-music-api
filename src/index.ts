import dotenv from 'dotenv';
import express from 'express';
import yargs from 'yargs';
import cors from 'cors';

import initialize from './utils/initialize';
import musicRoute from './routes/Music';

dotenv.config();
const app = express();

const { argv } = yargs(process.argv);

initialize(argv);

app.use(cors());
app.use('/v1', musicRoute);

app.use('/cover', express.static('cover'));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
