// routes/stock.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history',
      params: {
        symbol: 'ICLN',
        interval: '5m',
        diffandsplits: 'false'
      },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error('❌ API 请求失败:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

export default router;
