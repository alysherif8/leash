// backend/generateHashedPassword.js

const bcrypt = require('bcrypt');

const password = 'password'; // The password to hash
const saltRounds = 10; // Number of salt rounds

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    process.exit(1);
  }
  console.log('Hashed Password:', hash);
  process.exit(0);
});
