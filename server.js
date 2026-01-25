const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./config/logger');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/bookings', require('./routes/bookings'));
app.use('/api/v1/admin', require('./routes/admin'));

app.use(require('./middleware/error'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
process.on('unhandledRejection', (err, promise) => {
  logger.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
