import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supplier = db.prepare("SELECT * FROM suppliers WHERE id = ?").get(params.id);
  if (!supplier) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(supplier);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { name, contact, email, phone, status } = body;
  db.prepare(
    "UPDATE suppliers SET name = ?, contact = ?, email = ?, phone = ?, status = ? WHERE id = ?"
  ).run(name, contact, email, phone, status, params.id);
  const updated = db.prepare("SELECT * FROM suppliers WHERE id = ?").get(params.id);
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  db.prepare("DELETE FROM suppliers WHERE id = ?").run(params.id);
  return NextResponse.json({ deleted: true });
}
