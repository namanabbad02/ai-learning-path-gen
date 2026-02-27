// const express = require('express');
// const cors = require('cors');
// const app = express();
// require('dotenv').config();

// // Middleware
// app.use(cors());
// app.use(express.json()); // Allows parsing JSON body

// // Routes
// app.use('/auth', require('./routes/auth'));
// app.use('/api/career', require('./routes/career'));
// app.use('/api/quiz', require('./routes/quiz'));
// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON body

// --- Routes ---

// 1. Authentication (Login/Register)
app.use('/auth', require('./routes/auth'));

// 2. Career & AI Path Generation
app.use('/api/career', require('./routes/career'));

// 3. Quiz & Assessment (NEW)
app.use('/api/quiz', require('./routes/quiz'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});