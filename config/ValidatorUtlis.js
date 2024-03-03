// config/ValidatorUtils.js
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = {
  validateEmail: (email) => EMAIL_REGEX.test(email),
  // Add more validation functions as needed
};
