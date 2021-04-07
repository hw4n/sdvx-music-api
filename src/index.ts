import dotenv from 'dotenv';
import express from 'express';
import yargs from 'yargs';

import initialize from './utils/initialize';

dotenv.config();
const app = express();

const { argv } = yargs(process.argv);

initialize(argv);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
