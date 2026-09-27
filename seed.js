const Database = require("better-sqlite3");
const path = require("path");

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

db.exec("DELETE FROM inventory_items");
db.exec("DELETE FROM orders");
db.exec("DELETE FROM suppliers");
db.exec("DELETE FROM warehouse_bins");
db.exec("DELETE FROM warehouse_zones");

const insertItem = db.prepare("INSERT INTO inventory_items (sku, name, category, bin, stock, reorder, price, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
[
  ["HYD-4012", "Hydraulic Fluid ISO 46 (200L Drum)", "Hydraulics", "Bin C-301", 4, 10, 310.00, "Apex Hydraulics Ltd"],
  ["ELEC-8821", "PLC Controller Board Micro-v2", "Electronics", "Bin B-202", 18, 20, 450.00, "Vanguard Microchips"],
  ["MECH-1092", "Heavy Duty Roller Bearing 50mm", "Machinery Parts", "Bin A-101", 140, 30, 28.50, "Titan Bearings Co"],
  ["FAST-0023", "M12 Stainless Steel Bolts (Box of 500)", "Fasteners & Hardware", "Bin B-105", 85, 15, 42.00, "Global Fasteners"],
  ["ELEC-9931", "Optic Laser Sensor Sensor-Pro", "Electronics", "Bin B-203", 2, 8, 189.00, "Vanguard Microchips"],
  ["HYD-5021", "High Pressure Hose Assembly 2m", "Hydraulics", "Bin C-302", 65, 25, 74.00, "Apex Hydraulics Ltd"],
  ["MECH-4412", "Pneumatic Cylinder 100mm Stroke", "Machinery Parts", "Bin A-102", 28, 10, 115.00, "Titan Bearings Co"],
  ["FAST-0099", "Industrial Nylon Lock Nuts M8", "Fasteners & Hardware", "Bin B-106", 0, 50, 18.00, "Global Fasteners"],
].forEach(item => insertItem.run(...item));

const insertOrder = db.prepare("INSERT INTO orders (orderId, type, supplier, itemName, details, status, eta, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
[
  ["PO-2026-8821", "po", "Apex Hydraulics Ltd", "Hydraulic Seals & O-Rings Kit", "Quantity: 500 Units • Total Value: $12,400", "In Transit", "Tomorrow, 10:00 AM", 3],
  ["PO-2026-8829", "po", "Vanguard Microchips Inc", "Industrial Control Board v4", "Quantity: 120 Units • Total Value: $51,600", "Draft / Pending Approval", "Created 2 hours ago", 1],
].forEach(order => insertOrder.run(...order));

const insertSupplier = db.prepare("INSERT INTO suppliers (name, contact, email, phone, status) VALUES (?, ?, ?, ?, ?)");
[
  ["Apex Hydraulics Ltd", "Jane Smith", "jane@apexhydraulics.com", "+1 (555) 234-5678", "Active"],
  ["Vanguard Microchips Inc", "John Doe", "john@vanguardmicrochips.com", "+1 (555) 345-6789", "Active"],
  ["Titan Bearings Co", "Sarah Lee", "sarah@titanbearings.com", "+1 (555) 456-7890", "Active"],
  ["Global Fasteners", "Mike Chen", "mike@globalfasteners.com", "+1 (555) 567-8901", "Pending"],
].forEach(supplier => insertSupplier.run(...supplier));

// Warehouse zones
const insertZone = db.prepare("INSERT INTO warehouse_zones (name, description, capacity, capacityColor) VALUES (?, ?, ?, ?)");
const zones = [
  ["Aisle A (High-Bay Racks)", "Heavy Equipment & Machinery", "88%", "text-purple-600 bg-purple-50"],
  ["Aisle B (Climate-Controlled)", "Micro-Electronics & Sensors", "62%", "text-emerald-600 bg-emerald-50"],
  ["Aisle C (Bulk Fluid Storage)", "Hydraulic Fluids & Oils", "94%", "text-orange-500 bg-orange-50"],
];
zones.forEach(z => insertZone.run(...z));

const zoneIds = db.prepare("SELECT id FROM warehouse_zones WHERE name = ?").get;
const insertBin = db.prepare("INSERT INTO warehouse_bins (zoneId, name, value, percentage, color) VALUES (?, ?, ?, ?, ?)");
const bins = [
  [1, "Bin A-101 (Floor Level)", "180 / 200 Pallets", 90, "bg-purple-600"],
  [1, "Bin A-102 (Tier 2 Rack)", "142 / 200 Pallets", 71, "bg-orange-500"],
  [1, "Bin A-103 (Tier 3 Rack)", "95 / 200 Pallets", 47.5, "bg-emerald-500"],
  [2, "Bin B-201 (Small Parts Bins)", "620 / 1000 Units", 62, "bg-emerald-500"],
  [2, "Bin B-202 (Static Safe Bin)", "510 / 1000 Units", 51, "bg-emerald-500"],
  [2, "Bin B-203 (Security Cage)", "790 / 1000 Units", 79, "bg-orange-500"],
  [3, "Bin C-301 (Hazard Containment)", "94 / 100 Drums", 94, "bg-purple-600"],
  [3, "Bin C-302 (Pump Station Bin)", "89 / 100 Drums", 89, "bg-orange-500"],
  [3, "Bin C-303 (Staging Area)", "20 / 100 Drums", 20, "bg-emerald-500"],
];
bins.forEach(b => insertBin.run(...b));

console.log("Database seeded successfully!");
db.close();
