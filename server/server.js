import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/connection.js';
import authRoutes from './src/routes/authRoutes.js';
import messageRoutes from './src/routes/messagesRoutes.js';
import friendRequest from './src/routes/friendReqRoutes.js'
import { app, server } from './src/lib/socket.js';


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

app.use(cookieParser());



//Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/friends', friendRequest);


const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
    res.send('Hello Nigga');
});

server.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});