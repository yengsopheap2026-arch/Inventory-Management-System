"use client";

import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  CircleDollarSign,
  AlertTriangle,
  Truck,
  Boxes,
  TrendingUp,
  ArrowRight,
  Barcode,
  FilePlus,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
// @ts-ignore
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

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

const DashboardPage = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch("/api/inventory").then((res) => res.json()).then(setItems);
  }, []);

  const lowStockItems = items.filter((item) => item.stock <= item.reorder);

  const totalValue = items.reduce((sum, item) => sum + item.stock * item.price, 0);

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Outbound Sales Fulfillment",
        data: [320, 410, 480, 520, 610, 590, 680, 720, 790, 850, 910, 980],
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Inbound PO Restock",
        data: [280, 350, 420, 490, 530, 500, 610, 640, 710, 780, 820, 890],
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.05)",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const categorySet = new Set(items.map((i) => i.category));
  const categories = Array.from(categorySet);
  const categoryData = categories.map((cat) =>
    items.filter((i) => i.category === cat).reduce((sum, i) => sum + i.stock * i.price, 0)
  );

  const doughnutData = {
    labels: categories,
    datasets: [
      {
        data: categoryData.length > 0 ? categoryData : [42, 31, 17, 10],
        backgroundColor: ["#7c3aed", "#f97316", "#1e293b", "#cbd5e1", "#06b6d4", "#10b981"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <MainLayout>
      <section className="view-panel space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-navy-900 via-navy-800 to-purple-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-40 -top-10 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-medium mb-2 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>System Operations Operational</span>
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Central Inventory Intelligence</h1>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-xl">Real-time valuation, automated reorder tracking, and fulfillment workflow analytics for high-volume control.</p>
          </div>
          <div className="relative z-10 flex flex-wrap items-center gap-2.5">
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-medium px-3.5 py-2.5 rounded-xl transition-all flex items-center space-x-2 backdrop-blur-md">
              <Barcode size={16} className="text-orange-400" />
              <span>Scan Barcode</span>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-2">
              <FilePlus size={16} />
              <span>Create PO</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard title="Total Stock Value" value={`$${totalValue.toLocaleString()}`} trend="+4.8%" trendDesc="vs last month" icon={CircleDollarSign} color="purple" />
          <StatCard title="Low Stock Alerts" value={`${lowStockItems.length} Items`} trend="Action Required" trendDesc="• Below reorder point" icon={AlertTriangle} color="orange" />
          <StatCard title="Active Suppliers" value="4 Vendors" trend="99.2% On-Time" trendDesc="lead rate" icon={Truck} color="navy" />
          <StatCard title="Pending Orders" value="29 Fulfillment" trend="18 PO Inbound" trendDesc="• 11 Outbound" icon={Boxes} color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-navy-900">Stock Turnover Velocity Trends</h3>
                <p className="text-xs text-slate-400">Monthly inbound stock volume vs outbound sales fulfillments</p>
              </div>
            </div>
            <div className="h-64 w-full relative">
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" as const } } }} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-navy-900">Category Distribution</h3>
                <p className="text-xs text-slate-400">Inventory valuation split by core domain</p>
              </div>
            </div>
            <div className="h-56 w-full relative flex items-center justify-center">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "75%" }} />
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-around text-center text-xs">
              {categories.slice(0, 3).map((cat, i) => (
                <div key={cat}>
                  <span className="block font-bold text-navy-900">{cat}</span>
                  <span className="text-purple-600 font-semibold">{categoryData[i] ? `${((categoryData[i] / totalValue) * 100).toFixed(0)}%` : "0%"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block"></span>
                <h3 className="font-bold text-base text-navy-900">Low Stock Priority Action Items</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Items currently below minimum safety stock threshold</p>
            </div>
            <button className="text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center space-x-1">
              <span>View All Inventory</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-200/80">
                <tr>
                  <th className="px-6 py-3.5">SKU / Item Name</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Location Bin</th>
                  <th className="px-6 py-3.5">Current Stock</th>
                  <th className="px-6 py-3.5">Reorder Point</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {lowStockItems.map((item) => (
                  <tr key={item.sku} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-slate-800">
                      {item.name}
                      <span className="block text-[10px] text-slate-400 font-medium">{item.sku}</span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-500">{item.category}</td>
                    <td className="px-6 py-3.5">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-mono text-[11px]">{item.bin}</span>
                    </td>
                    <td className="px-6 py-3.5 font-bold text-orange-600">{item.stock} Units</td>
                    <td className="px-6 py-3.5 text-slate-500">{item.reorder} Min</td>
                    <td className="px-6 py-3.5">
                      <span className="px-2.5 py-1 bg-orange-100 text-orange-600 font-bold rounded-full text-[10px] border border-orange-200">Low Stock Alert</span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-[11px] font-semibold transition-all shadow-sm">
                        Reorder Now
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

const StatCard = ({ title, value, trend, trendDesc, icon: Icon, color }: any) => {
  const colorMap = {
    purple: "border-l-purple-600 text-purple-600 bg-purple-50",
    orange: "border-l-orange-500 text-orange-500 bg-orange-50",
    navy: "border-l-navy-800 text-navy-800 bg-slate-100",
  };

  return (
    <div className={`glass-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border-l-4 ${colorMap[color as keyof typeof colorMap].split(" ")[0]}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color as keyof typeof colorMap].split(" ").slice(1).join(" ")}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-extrabold text-navy-900">{value}</h3>
        <div className="flex items-center space-x-2 mt-1">
          <span className={`text-xs font-bold flex items-center ${color === "navy" ? "text-emerald-600" : color === "orange" ? "text-orange-500" : "text-emerald-600"}`}>
            {trend}
          </span>
          <span className="text-[11px] text-slate-400">{trendDesc}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
