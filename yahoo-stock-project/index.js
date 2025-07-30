// index.js
import express from 'express';
import dotenv from 'dotenv';
import stockRoute from './routes/stock.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use('/api/stock-data', stockRoute);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
