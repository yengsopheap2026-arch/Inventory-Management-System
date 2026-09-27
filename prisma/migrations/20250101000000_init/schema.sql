-- Migration 1: init

CREATE TABLE "InventoryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "bin" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "reorder" INTEGER NOT NULL DEFAULT 10,
    "price" REAL NOT NULL DEFAULT 0,
    "supplier" TEXT NOT NULL
);

CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "eta" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Supplier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active'
);

CREATE UNIQUE INDEX "InventoryItem_sku_key" ON "InventoryItem"("sku");
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");
CREATE UNIQUE INDEX "Supplier_name_key" ON "Supplier"("name");
