export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full bg-slate-50">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}
