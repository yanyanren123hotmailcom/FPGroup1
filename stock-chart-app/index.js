// index.js
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3000;

// ⬇️ 设置 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⬇️ 启用静态文件服务（前端页面）
app.use(express.static(path.join(__dirname, 'public')));

// ⬇️ 允许跨域（前端可以请求接口）
app.use(cors());

// ⬇️ API 路由：支持前端传 symbol 参数
app.get('/api/stock-data', async (req, res) => {
  const symbol = req.query.symbol?.toUpperCase() || 'ICLN';

  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history',
      params: {
        symbol: symbol,
        interval: '5m',
        range: '1d', 
        diffandsplits: 'false'
      },
      headers: {
        'x-rapidapi-key': '33b611f5demsh6475972129d309cp108f9ejsn8c803ffc88fe',
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('❌ API 请求失败:', error.message);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// ⬇️ 启动服务
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
