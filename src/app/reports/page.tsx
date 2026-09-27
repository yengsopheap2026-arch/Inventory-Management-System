"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { BarChart3 } from "lucide-react";

interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  category: string;
  bin: string;
  stock: number;
  reorder: number;
  price: number;
  supplier: string;
}

const ReportsPage = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then(setItems);
  }, []);

  const totalValue = items.reduce((sum, item) => sum + item.stock * item.price, 0);
  const lowStockCount = items.filter((i) => i.stock <= i.reorder && i.stock > 0).length;
  const outOfStockCount = items.filter((i) => i.stock === 0).length;

  const categorySet = new Set(items.map((i) => i.category));
  const categories = Array.from(categorySet);
  const categoryTotals = categories.map((cat) => ({
    category: cat,
    value: items.filter((i) => i.category === cat).reduce((s, i) => s + i.stock * i.price, 0),
    count: items.filter((i) => i.category === cat).length,
  }));

  return (
    <MainLayout>
      <section className="view-panel space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Analytics</span>
              <h2 className="text-xl font-bold text-navy-900 mt-0.5">Valuation Reports</h2>
              <p className="text-xs text-slate-400">View inventory valuation and stock analytics.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="glass-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-purple-600">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Valuation</span>
              <h3 className="text-2xl font-extrabold text-navy-900 mt-1">${totalValue.toLocaleString()}</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">+4.8% from last month</p>
            </div>
            <div className="glass-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-orange-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Low Stock Items</span>
              <h3 className="text-2xl font-extrabold text-navy-900 mt-1">{lowStockCount}</h3>
              <p className="text-xs text-orange-500 font-semibold mt-1">Below reorder point</p>
            </div>
            <div className="glass-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-emerald-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Out of Stock</span>
              <h3 className="text-2xl font-extrabold text-navy-900 mt-1">{outOfStockCount}</h3>
              <p className="text-xs text-slate-500 font-semibold mt-1">Needs immediate reorder</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <BarChart3 size={18} className="text-purple-600" />
              <h3 className="font-bold text-base text-navy-900">Category Valuation Summary</h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-200/80">
                <tr>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Total Items</th>
                  <th className="px-6 py-4">Total Value</th>
                  <th className="px-6 py-4">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {categoryTotals.map(({ category, value, count }) => (
                  <tr key={category} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{category}</td>
                    <td className="px-6 py-4">{count}</td>
                    <td className="px-6 py-4">${value.toLocaleString()}</td>
                    <td className="px-6 py-4">{totalValue > 0 ? `${((value / totalValue) * 100).toFixed(1)}%` : "0%"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ReportsPage;
