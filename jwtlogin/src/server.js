const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/adminroute.js');
const userRoutes = require('./routes/userroute');
const cors=require('cors')

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/',(req,res)=>{
    res.send("welcome")
})
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
