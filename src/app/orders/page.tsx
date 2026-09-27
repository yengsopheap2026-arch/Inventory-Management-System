"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { clsx } from "clsx";

interface Order {
  id: number;
  orderId: string;
  type: string;
  supplier: string;
  itemName: string;
  details: string;
  status: string;
  eta: string;
  progress: number;
  color: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'po' | 'so'>('po');

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const filteredOrders = activeTab === 'po'
    ? orders.filter((o) => o.type === 'po')
    : orders.filter((o) => o.type === 'so');

  return (
    <MainLayout>
      <section className="view-panel space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-navy-900">Order Fulfillment Workflows</h2>
            <p className="text-xs text-slate-400">Track inbound vendor purchase orders (PO) and outbound customer sales orders.</p>
          </div>

          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('po')}
              className={clsx(
                "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                activeTab === 'po' ? "bg-white text-navy-900 shadow-sm" : "text-slate-500 hover:text-navy-900"
              )}
            >
              Purchase Orders (Inbound)
            </button>
            <button
              onClick={() => setActiveTab('so')}
              className={clsx(
                "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                activeTab === 'so' ? "bg-white text-navy-900 shadow-sm" : "text-slate-500 hover:text-navy-900"
              )}
            >
              Sales Orders (Outbound)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className={clsx(
                  "text-xs font-bold px-2.5 py-1 rounded-lg",
                  order.color === 'purple' ? "text-purple-600 bg-purple-50" : "text-orange-600 bg-orange-50"
                )}>
                  {order.orderId}
                </span>
                <span className="text-xs text-slate-400">Supplier: <strong>{order.supplier}</strong></span>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-sm">{order.itemName}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{order.details}</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-semibold">
                  <span className={order.color === 'purple' ? "text-purple-600" : "text-orange-500"}>{order.status}</span>
                  <span className="text-slate-400">{order.eta}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={clsx(
                        "h-2 flex-1 rounded-full",
                        step <= order.progress
                          ? (order.color === 'purple' ? "bg-purple-600" : "bg-orange-500")
                          : "bg-slate-200",
                        step === order.progress && step < 4 && "animate-pulse"
                      )}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Draft</span>
                  <span>Dispatched</span>
                  <span>In Transit</span>
                  <span>Received</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Track Shipment</button>
                <button className={clsx(
                  "text-xs px-3 py-1.5 rounded-lg text-white font-medium",
                  order.progress < 3 ? "bg-purple-600 hover:bg-purple-700" : "bg-orange-500 hover:bg-orange-600"
                )}>
                  {order.progress < 3 ? "Approve & Send" : "Receive Goods"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default OrdersPage;
