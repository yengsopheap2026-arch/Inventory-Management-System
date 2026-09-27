import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const zones = db.prepare("SELECT * FROM warehouse_zones ORDER BY id").all();
  const bins = db.prepare("SELECT * FROM warehouse_bins ORDER BY zoneId, id").all();

  const zoneMap: Record<number, any[]> = {};
  bins.forEach((bin: any) => {
    if (!zoneMap[bin.zoneId]) zoneMap[bin.zoneId] = [];
    zoneMap[bin.zoneId].push(bin);
  });

  const result = zones.map((zone: any) => ({
    ...zone,
    bins: zoneMap[zone.id] || [],
  }));

  return NextResponse.json(result);
}
