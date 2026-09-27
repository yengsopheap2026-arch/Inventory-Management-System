import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const items = db.prepare("SELECT * FROM inventory_items ORDER BY id DESC").all();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sku, name, category, bin, stock, reorder, price, supplier } = body;
  const result = db.prepare(
    "INSERT INTO inventory_items (sku, name, category, bin, stock, reorder, price, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(sku, name, category, bin, stock, reorder, price, supplier);
  const newItem = db.prepare("SELECT * FROM inventory_items WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(newItem, { status: 201 });
}
