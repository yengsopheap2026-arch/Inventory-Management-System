"use client";

import React, { useState } from 'react';
import { Search, Bell, Plus, MapPin } from 'lucide-react';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-8 flex items-center justify-between z-10 flex-shrink-0 shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block w-72 lg:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search SKU, item name, barcode or supplier..." 
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Facility Selector */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/80 text-xs text-slate-600">
          <MapPin className="text-purple-600" size={14} />
          <span className="font-medium">Active Facility:</span>
          <select className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer">
            <option value="Main Distribution Hub">Main Distribution Hub</option>
            <option value="East Coast Logistics">East Coast Logistics</option>
            <option value="West Depot Center">West Depot Center</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-purple-600 transition-all relative"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 p-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-800">Alerts & Notifications</span>
                <span className="text-[10px] bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto my-2 text-xs">
                <div className="py-2.5 hover:bg-slate-50 transition-colors rounded-lg px-2 cursor-pointer">
                  <div className="flex items-start space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-slate-800">Critical Stock Warning</p>
                      <p className="text-slate-500 mt-0.5">Hydraulic Fluid ISO 46 dropped below reorder threshold (4 units remaining).</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">12 mins ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full text-center text-xs text-purple-600 font-semibold pt-2 border-t border-slate-100 hover:text-purple-700">Mark all as read</button>
            </div>
          )}
        </div>

        {/* Add Item Trigger */}
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 flex items-center space-x-2 transition-all hover-orange-glow active:scale-95">
          <Plus size={16} />
          <span className="hidden sm:inline">Add New Item</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
