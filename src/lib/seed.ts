import Database from "better-sqlite3";
import path from "path";

// First initialize db to create tables
import "@/lib/db";

const db = new Database(path.join(process.cwd(), "dev.db"));

const items = [
  { sku: "HYD-4012", name: "Hydraulic Fluid ISO 46 (200L Drum)", category: "Hydraulics", bin: "Bin C-301", stock: 4, reorder: 10, price: 310.00, supplier: "Apex Hydraulics Ltd" },
  { sku: "ELEC-8821", name: "PLC Controller Board Micro-v2", category: "Electronics", bin: "Bin B-202", stock: 18, reorder: 20, price: 450.00, supplier: "Vanguard Microchips" },
  { sku: "MECH-1092", name: "Heavy Duty Roller Bearing 50mm", category: "Machinery Parts", bin: "Bin A-101", stock: 140, reorder: 30, price: 28.50, supplier: "Titan Bearings Co" },
  { sku: "FAST-0023", name: "M12 Stainless Steel Bolts (Box of 500)", category: "Fasteners & Hardware", bin: "Bin B-105", stock: 85, reorder: 15, price: 42.00, supplier: "Global Fasteners" },
  { sku: "ELEC-9931", name: "Optic Laser Sensor Sensor-Pro", category: "Electronics", bin: "Bin B-203", stock: 2, reorder: 8, price: 189.00, supplier: "Vanguard Microchips" },
  { sku: "HYD-5021", name: "High Pressure Hose Assembly 2m", category: "Hydraulics", bin: "Bin C-302", stock: 65, reorder: 25, price: 74.00, supplier: "Apex Hydraulics Ltd" },
  { sku: "MECH-4412", name: "Pneumatic Cylinder 100mm Stroke", category: "Machinery Parts", bin: "Bin A-102", stock: 28, reorder: 10, price: 115.00, supplier: "Titan Bearings Co" },
  { sku: "FAST-0099", name: "Industrial Nylon Lock Nuts M8", category: "Fasteners & Hardware", bin: "Bin B-106", stock: 0, reorder: 50, price: 18.00, supplier: "Global Fasteners" },
];

const orders = [
  { orderId: "PO-2026-8821", type: "po", supplier: "Apex Hydraulics Ltd", itemName: "Hydraulic Seals & O-Rings Kit", details: "Quantity: 500 Units • Total Value: $12,400", status: "In Transit", eta: "Tomorrow, 10:00 AM", progress: 3 },
  { orderId: "PO-2026-8829", type: "po", supplier: "Vanguard Microchips Inc", itemName: "Industrial Control Board v4", details: "Quantity: 120 Units • Total Value: $51,600", status: "Draft / Pending Approval", eta: "Created 2 hours ago", progress: 1 },
];

const suppliers = [
  { name: "Apex Hydraulics Ltd", contact: "Jane Smith", email: "jane@apexhydraulics.com", phone: "+1 (555) 234-5678", status: "Active" },
  { name: "Vanguard Microchips Inc", contact: "John Doe", email: "john@vanguardmicrochips.com", phone: "+1 (555) 345-6789", status: "Active" },
  { name: "Titan Bearings Co", contact: "Sarah Lee", email: "sarah@titanbearings.com", phone: "+1 (555) 456-7890", status: "Active" },
  { name: "Global Fasteners", contact: "Mike Chen", email: "mike@globalfasteners.com", phone: "+1 (555) 567-8901", status: "Pending" },
];

db.exec("DELETE FROM inventory_items");
db.exec("DELETE FROM orders");
db.exec("DELETE FROM suppliers");

const insertItem = db.prepare("INSERT INTO inventory_items (sku, name, category, bin, stock, reorder, price, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
for (const item of items) {
  insertItem.run(item.sku, item.name, item.category, item.bin, item.stock, item.reorder, item.price, item.supplier);
}

const insertOrder = db.prepare("INSERT INTO orders (orderId, type, supplier, itemName, details, status, eta, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
for (const order of orders) {
  insertOrder.run(order.orderId, order.type, order.supplier, order.itemName, order.details, order.status, order.eta, order.progress);
}

const insertSupplier = db.prepare("INSERT INTO suppliers (name, contact, email, phone, status) VALUES (?, ?, ?, ?, ?)");
for (const supplier of suppliers) {
  insertSupplier.run(supplier.name, supplier.contact, supplier.email, supplier.phone, supplier.status);
}

console.log("Database seeded!");
db.close();
