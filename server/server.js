import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/connection.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
    res.send('Hello Nigga');
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});