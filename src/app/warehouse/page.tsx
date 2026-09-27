"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";

interface Bin {
  name: string;
  value: string;
  percentage: number;
  color: string;
}

interface Zone {
  id: number;
  name: string;
  description: string;
  capacity: string;
  capacityColor: string;
  bins: Bin[];
}

const WarehousePage = () => {
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    fetch("/api/warehouse")
      .then((res) => res.json())
      .then(setZones);
  }, []);

  if (!zones.length) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section className="view-panel space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Spatial Allocation</span>
            <h2 className="text-xl font-bold text-navy-900 mt-0.5">Warehouse Aisle & Bin Layout</h2>
            <p className="text-xs text-slate-400">Visual occupancy monitoring across physical storage racks.</p>
          </div>

          <div className="flex items-center space-x-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500"></span>
              <span className="text-slate-600">&lt; 70% Optimal</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-orange-500"></span>
              <span className="text-slate-600">70-90% High</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded bg-purple-600"></span>
              <span className="text-slate-600">&gt; 90% Full</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">{zone.name}</h3>
                  <p className="text-[11px] text-slate-400">{zone.description}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${zone.capacityColor}`}>{zone.capacity} Capacity</span>
              </div>

              <div className="space-y-3">
                {zone.bins.map((bin) => (
                  <div key={bin.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">{bin.name}</span>
                      <span className="text-slate-500">{bin.value}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className={`${bin.color} h-full rounded-full`} style={{ width: `${bin.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default WarehousePage;
