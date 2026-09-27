"use client";

import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Search, FileDown, Plus, Eye, PackageCheck } from "lucide-react";
import { Category, StockStatus } from "@/types/inventory";

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

const InventoryPage = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category>("All");
  const [statusFilter, setStatusFilter] = useState<StockStatus>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const filteredData = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;

      let matchesStatus = true;
      if (statusFilter === "In Stock") matchesStatus = item.stock > item.reorder;
      if (statusFilter === "Low Stock") matchesStatus = item.stock <= item.reorder && item.stock > 0;
      if (statusFilter === "Out of Stock") matchesStatus = item.stock === 0;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchQuery, categoryFilter, statusFilter]);

  if (loading) {
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
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-navy-900">Master Item Directory</h2>
              <p className="text-xs text-slate-400">Complete catalog of raw materials, assemblies, and finished stock units.</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center space-x-2">
                <FileDown size={16} className="text-emerald-600" />
                <span>Export CSV</span>
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md transition-all flex items-center space-x-2">
                <Plus size={16} />
                <span>Add New SKU</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search Name, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category)}
              className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Machinery Parts">Machinery Parts</option>
              <option value="Hydraulics">Hydraulics</option>
              <option value="Fasteners & Hardware">Fasteners & Hardware</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StockStatus)}
              className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              <option value="All">All Stock Statuses</option>
              <option value="In Stock">In Stock (Normal)</option>
              <option value="Low Stock">Low Stock Alert</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

            <select className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30">
              <option value="name-asc">Sort by: Name (A-Z)</option>
              <option value="stock-desc">Sort by: Highest Stock</option>
              <option value="stock-asc">Sort by: Lowest Stock</option>
              <option value="price-desc">Sort by: Highest Value</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-200/80">
                <tr>
                  <th className="px-6 py-4">Item & SKU</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Bin Location</th>
                  <th className="px-6 py-4">Stock Level</th>
                  <th className="px-6 py-4">Unit Price</th>
                  <th className="px-6 py-4">Total Value</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredData.map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {item.name}
                      <span className="block text-[10px] text-slate-400 font-medium">{item.sku}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-mono text-[11px]">{item.bin}</span>
                    </td>
                    <td className="px-6 py-4 font-bold">{item.stock} Units</td>
                    <td className="px-6 py-4 text-slate-600">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">${(item.stock * item.price).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {item.stock === 0 ? (
                        <span className="px-2.5 py-1 bg-purple-100 text-purple-700 font-bold rounded-full text-[10px] border border-purple-200">Out of Stock</span>
                      ) : item.stock <= item.reorder ? (
                        <span className="px-2.5 py-1 bg-orange-100 text-orange-600 font-bold rounded-full text-[10px] border border-orange-200">Low Stock Alert</span>
                      ) : (
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 font-bold rounded-full text-[10px] border border-blue-200">In Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <button className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors" title="View SKU Details">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors" title="Restock Item">
                          <PackageCheck size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <span>Showing 1 to {filteredData.length} of {filteredData.length} items</span>
            <div className="flex items-center space-x-1">
              <button className="px-3 py-1 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed" disabled>Previous</button>
              <button className="px-3 py-1 rounded-lg border border-purple-600 bg-purple-600 text-white font-semibold">1</button>
              <button className="px-3 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600">Next</button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default InventoryPage;
