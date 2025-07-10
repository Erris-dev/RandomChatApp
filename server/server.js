import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/connection.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());



//Routes
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
    res.send('Hello Nigga');
});

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});