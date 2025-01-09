import express from 'express';
import { fetchWasteData } from './readData.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('./'));

// Store the last update time
let lastUpdateTime = new Date().getTime();

app.get('/api/waste-data', async (req, res) => {
    try {
        const data = await fetchWasteData();
        lastUpdateTime = new Date().getTime();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Add endpoint to check for updates
app.get('/api/last-update', (req, res) => {
    res.json({ timestamp: lastUpdateTime });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
