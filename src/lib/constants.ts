import { InventoryItem } from "@/types/inventory";

export const INITIAL_INVENTORY_DATA: InventoryItem[] = [
  { id: 1, sku: "HYD-4012", name: "Hydraulic Fluid ISO 46 (200L Drum)", category: "Hydraulics", bin: "Bin C-301", stock: 4, reorder: 10, price: 310.00, supplier: "Apex Hydraulics Ltd" },
  { id: 2, sku: "ELEC-8821", name: "PLC Controller Board Micro-v2", category: "Electronics", bin: "Bin B-202", stock: 18, reorder: 20, price: 450.00, supplier: "Vanguard Microchips" },
  { id: 3, sku: "MECH-1092", name: "Heavy Duty Roller Bearing 50mm", category: "Machinery Parts", bin: "Bin A-101", stock: 140, reorder: 30, price: 28.50, supplier: "Titan Bearings Co" },
  { id: 4, sku: "FAST-0023", name: "M12 Stainless Steel Bolts (Box of 500)", category: "Fasteners & Hardware", bin: "Bin B-105", stock: 85, reorder: 15, price: 42.00, supplier: "Global Fasteners" },
  { id: 5, sku: "ELEC-9931", name: "Optic Laser Sensor Sensor-Pro", category: "Electronics", bin: "Bin B-203", stock: 2, reorder: 8, price: 189.00, supplier: "Vanguard Microchips" },
  { id: 6, sku: "HYD-5021", name: "High Pressure Hose Assembly 2m", category: "Hydraulics", bin: "Bin C-302", stock: 65, reorder: 25, price: 74.00, supplier: "Apex Hydraulics Ltd" },
  { id: 7, sku: "MECH-4412", name: "Pneumatic Cylinder 100mm Stroke", category: "Machinery Parts", bin: "Bin A-102", stock: 28, reorder: 10, price: 115.00, supplier: "Titan Bearings Co" },
  { id: 8, sku: "FAST-0099", name: "Industrial Nylon Lock Nuts M8", category: "Fasteners & Hardware", bin: "Bin B-106", stock: 0, reorder: 50, price: 18.00, supplier: "Global Fasteners" }
];
