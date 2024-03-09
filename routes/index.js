// routes/index.js
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const tagRoutes = require('./tagRoutes');
const categoryRoutes = require('./categoryRoutes');
const blogRoutes = require('./blogRoutes');
module.exports = (app) => {

  //Authentication
  app.use('/api/v1/auth', authRoutes);

  //User
  app.use('/api/v1/user', userRoutes);

  //Blog
  app.use('/api/v1/tag', tagRoutes);
  app.use('/api/v1/category', categoryRoutes);
  app.use('/api/v1/blog', blogRoutes);
};