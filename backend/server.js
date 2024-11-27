// backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// backend/server.js

const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

// backend/server.js

const postsRoutes = require('./routes/posts');

app.use('/posts', postsRoutes);
