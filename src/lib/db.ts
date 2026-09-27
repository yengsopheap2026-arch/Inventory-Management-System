import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "dev.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS inventory_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    bin TEXT NOT NULL,
    stock INTEGER DEFAULT 0,
    reorder INTEGER DEFAULT 10,
    price REAL DEFAULT 0,
    supplier TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    supplier TEXT NOT NULL,
    itemName TEXT NOT NULL,
    details TEXT NOT NULL,
    status TEXT NOT NULL,
    eta TEXT NOT NULL,
    progress INTEGER DEFAULT 1
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    contact TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT DEFAULT 'Active'
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS warehouse_zones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    capacity TEXT NOT NULL,
    capacityColor TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS warehouse_bins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zoneId INTEGER NOT NULL,
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    percentage REAL NOT NULL,
    color TEXT NOT NULL,
    FOREIGN KEY (zoneId) REFERENCES warehouse_zones(id)
  )
`);

export default db;
