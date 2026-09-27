"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Boxes, 
  Warehouse, 
  ShoppingCart, 
  Truck, 
  FileSpreadsheet, 
  LogOut,
  X,
  Menu
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Inventory Directory', href: '/inventory', icon: Boxes, badge: '14 Low', badgeColor: 'orange' },
    { name: 'Warehouse Bins', href: '/warehouse', icon: Warehouse },
    { name: 'Order Fulfillment', href: '/orders', icon: ShoppingCart, badge: '29 Active', badgeColor: 'purple' },
  ];

  const managementItems = [
    { name: 'Suppliers Directory', href: '/suppliers', icon: Truck },
    { name: 'Valuation Reports', href: '/reports', icon: FileSpreadsheet },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-navy-900 text-white rounded-lg shadow-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "w-64 bg-navy-900 text-slate-300 flex-shrink-0 flex flex-col justify-between transition-all duration-300 z-50 fixed md:relative inset-y-0 shadow-2xl md:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div>
          {/* App Brand / Logo */}
          <div className="h-16 flex items-center px-6 bg-navy-950 border-b border-slate-800/60 justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-600/30">
                N
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-wider">SP<span className="text-orange-500"> Co., LTD.</span></span>
                <p className="text-[10px] text-slate-400 font-medium -mt-1 tracking-widest uppercase">Stock Control</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 py-6 space-y-1.5">
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Core Modules</div>
            
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive(item.href) ? "nav-item-active" : "nav-item-inactive"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 mr-3 transition-transform group-hover:scale-110",
                  isActive(item.href) ? "text-white" : "text-slate-400"
                )} />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-semibold border",
                    item.badgeColor === 'orange' 
                      ? "bg-orange-500/20 text-orange-400 border-orange-500/30" 
                      : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-6 px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Management</div>

            {managementItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-navy-800 hover:text-white transition-all group"
              >
                <item.icon className="w-5 h-5 mr-3 transition-transform group-hover:scale-110" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Details Footer */}
        <div className="p-4 bg-navy-950/80 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                className="w-9 h-9 rounded-full ring-2 ring-purple-500/50" 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Avatar" 
              />
              <span className="bottom-0 right-0 absolute w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-navy-950"></span>
            </div>
            <div className="text-xs overflow-hidden">
              <p className="font-semibold text-white truncate">Elena Rostova</p>
              <p className="text-slate-400 truncate">Inventory Lead</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-orange-400 transition-colors p-1.5 rounded-lg hover:bg-navy-800" title="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
