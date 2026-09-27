import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-50 text-slate-800">
      <AlertCircle size={48} className="text-orange-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-6 text-sm">The page you are looking for does not exist.</p>
      <Link
        href="/dashboard"
        className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 transition-all"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
