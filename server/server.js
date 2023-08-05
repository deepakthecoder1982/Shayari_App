const express = require('express');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const CORS = require('cors');
require("dotenv").config();

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // Adjust this to match the RPM limit
});
const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(limiter)
app.use(CORS())
app.post('/getShayari', async (req, res) => {
  try {
    const { keyword } = req.body;
    const {lang} = req.body;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: `
        Act as best poetier,
        I want you to create a shayari, on the given keyword not more than 100 words
        ` }, { role: 'user', content: keyword }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const shayari = response.data.choices[0].message.content;
    res.json({ shayari });
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('API Response Status:', error.response.status);
      console.error('API Response Data:', error.response.data);
    }
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
