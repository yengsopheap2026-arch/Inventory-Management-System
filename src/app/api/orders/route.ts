import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const orders = db.prepare("SELECT * FROM orders ORDER BY id DESC").all();
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { orderId, type, supplier, itemName, details, status, eta, progress } = body;
  const result = db.prepare(
    "INSERT INTO orders (orderId, type, supplier, itemName, details, status, eta, progress) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(orderId, type, supplier, itemName, details, status, eta, progress);
  const newOrder = db.prepare("SELECT * FROM orders WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(newOrder, { status: 201 });
}
