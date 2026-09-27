"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Truck, Search, Mail, Phone } from "lucide-react";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
}

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/suppliers")
      .then((res) => res.json())
      .then(setSuppliers);
  }, []);

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <section className="view-panel space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Vendor Directory</span>
              <h2 className="text-xl font-bold text-navy-900 mt-0.5">Suppliers Directory</h2>
              <p className="text-xs text-slate-400">Manage and track all vendor relationships.</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 w-full max-w-md"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-200/80">
                <tr>
                  <th className="px-6 py-4">Supplier</th>
                  <th className="px-6 py-4">Contact Person</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{supplier.name}</td>
                    <td className="px-6 py-4 text-slate-500">{supplier.contact}</td>
                    <td className="px-6 py-4 text-slate-500">{supplier.email}</td>
                    <td className="px-6 py-4 text-slate-500">{supplier.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        supplier.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                      }`}>
                        {supplier.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-semibold transition-all">
                        View Details
                      </button>
                    </td>
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

export default SuppliersPage;
