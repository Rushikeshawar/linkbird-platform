// scripts/debug-db.js
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'local.db');
const db = new Database(dbPath);

function debugDatabase() {
  try {
    console.log('=== USERS ===');
    const users = db.prepare("SELECT * FROM users").all();
    console.log(JSON.stringify(users, null, 2));

    console.log('\n=== ACCOUNTS ===');
    const accounts = db.prepare("SELECT * FROM accounts").all();
    console.log(JSON.stringify(accounts, null, 2));

    console.log('\n=== SESSIONS ===');
    const sessions = db.prepare("SELECT * FROM sessions").all();
    console.log(JSON.stringify(sessions, null, 2));

  } catch (error) {
    console.error('Error reading database:', error);
  } finally {
    db.close();
  }
}

debugDatabase();