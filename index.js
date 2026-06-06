require('dotenv').config();
const express = require('express');
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));