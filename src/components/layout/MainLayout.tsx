"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-slate-50">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {children}
        </main>
      </div>
    </>
  );
}
