import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(params.id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { orderId, type, supplier, itemName, details, status, eta, progress } = body;
  db.prepare(
    "UPDATE orders SET orderId = ?, type = ?, supplier = ?, itemName = ?, details = ?, status = ?, eta = ?, progress = ? WHERE id = ?"
  ).run(orderId, type, supplier, itemName, details, status, eta, progress, params.id);
  const updated = db.prepare("SELECT * FROM orders WHERE id = ?").get(params.id);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  db.prepare("DELETE FROM orders WHERE id = ?").run(params.id);
  return NextResponse.json({ deleted: true });
}
