import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const suppliers = db.prepare("SELECT * FROM suppliers ORDER BY id DESC").all();
  return NextResponse.json(suppliers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, contact, email, phone, status } = body;
  const result = db.prepare(
    "INSERT INTO suppliers (name, contact, email, phone, status) VALUES (?, ?, ?, ?, ?)"
  ).run(name, contact, email, phone, status);
  const newSupplier = db.prepare("SELECT * FROM suppliers WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(newSupplier, { status: 201 });
}
