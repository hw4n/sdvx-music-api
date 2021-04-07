import dotenv from 'dotenv';
import express from 'express';

import initialize from './utils/initialize';

dotenv.config();
const app = express();

initialize();

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
