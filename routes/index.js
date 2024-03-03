// routes/index.js
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

module.exports = (app) => {
  app.use('/api/v1/auth', authRoutes);
  // app.use('/user', userRoutes);
};