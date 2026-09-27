import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const item = db.prepare("SELECT * FROM inventory_items WHERE id = ?").get(params.id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { sku, name, category, bin, stock, reorder, price, supplier } = body;
  db.prepare(
    "UPDATE inventory_items SET sku = ?, name = ?, category = ?, bin = ?, stock = ?, reorder = ?, price = ?, supplier = ? WHERE id = ?"
  ).run(sku, name, category, bin, stock, reorder, price, supplier, params.id);
  const updated = db.prepare("SELECT * FROM inventory_items WHERE id = ?").get(params.id);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  db.prepare("DELETE FROM inventory_items WHERE id = ?").run(params.id);
  return NextResponse.json({ deleted: true });
}
