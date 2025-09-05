// scripts/clear-users.js
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'local.db');
const db = new Database(dbPath);

function clearUsers() {
  try {
    // Show existing users
    const users = db.prepare("SELECT * FROM users").all();
    console.log('Existing users:', users);
    
    // Clear all users and related data
    db.exec('DELETE FROM leadInteractions');
    db.exec('DELETE FROM leads');
    db.exec('DELETE FROM campaigns');
    db.exec('DELETE FROM sessions');
    db.exec('DELETE FROM accounts');
    db.exec('DELETE FROM users');
    
    console.log('All users and related data cleared successfully!');
    
  } catch (error) {
    console.error('Error clearing users:', error);
  } finally {
    db.close();
  }
}

clearUsers();