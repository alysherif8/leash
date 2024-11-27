// backend/initDb.js

const bcrypt = require('bcrypt');
const pool = require('./db');

async function initializeDatabase() {
  try {
    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if admin user exists
    const adminExists = await pool.query('SELECT * FROM users WHERE username = $1', ['admin']);
    
    if (adminExists.rows.length === 0) {
      // Create admin user if it doesn't exist
      const password = 'password'; // Default password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        ['admin', hashedPassword]
      );
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database initialization completed successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    // Close the pool
    await pool.end();
  }
}

initializeDatabase();
