// scripts/setup-db.js
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'local.db');
console.log('Creating database at:', dbPath);

// Delete existing database to start fresh
const fs = require('fs');
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Deleted existing database');
}

const db = new Database(dbPath);

function setupDatabase() {
  try {
    // Create users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        emailVerified INTEGER DEFAULT 0,
        image TEXT,
        createdAt INTEGER DEFAULT (unixepoch()),
        updatedAt INTEGER DEFAULT (unixepoch())
      );
    `);

    // Create sessions table - Better Auth compatible
    db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        expiresAt INTEGER NOT NULL,
        token TEXT NOT NULL UNIQUE,
        createdAt INTEGER DEFAULT (unixepoch()),
        updatedAt INTEGER DEFAULT (unixepoch()),
        ipAddress TEXT,
        userAgent TEXT,
        userId TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create accounts table - Better Auth compatible
    db.exec(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        accountId TEXT NOT NULL,
        providerId TEXT NOT NULL,
        userId TEXT NOT NULL,
        accessToken TEXT,
        refreshToken TEXT,
        idToken TEXT,
        accessTokenExpiresAt INTEGER,
        refreshTokenExpiresAt INTEGER,
        scope TEXT,
        password TEXT,
        createdAt INTEGER DEFAULT (unixepoch()),
        updatedAt INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create campaigns table
    db.exec(`
      CREATE TABLE IF NOT EXISTS campaigns (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'draft',
        description TEXT,
        userId TEXT NOT NULL,
        createdAt INTEGER DEFAULT (unixepoch()),
        updatedAt INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create leads table
    db.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        jobTitle TEXT,
        linkedinUrl TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        campaignId TEXT NOT NULL,
        userId TEXT NOT NULL,
        lastContactedAt INTEGER,
        createdAt INTEGER DEFAULT (unixepoch()),
        updatedAt INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (campaignId) REFERENCES campaigns(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Create leadInteractions table
    db.exec(`
      CREATE TABLE IF NOT EXISTS leadInteractions (
        id TEXT PRIMARY KEY,
        leadId TEXT NOT NULL,
        type TEXT NOT NULL,
        message TEXT,
        createdAt INTEGER DEFAULT (unixepoch()),
        FOREIGN KEY (leadId) REFERENCES leads(id) ON DELETE CASCADE
      );
    `);

    console.log('Database tables created successfully!');
    
    // Test the connection
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('Created tables:', tables.map(row => row.name));
    
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    db.close();
  }
}

setupDatabase();