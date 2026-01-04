import { useEffect } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" 
    ? "bg-gradient-to-r from-violet-600 to-purple-600" 
    : "bg-gradient-to-r from-red-600 to-rose-600";
  
  const Icon = type === "success" ? CheckCircle : AlertCircle;

  return (
    <div className={`${bgColor} text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 min-w-80 animate-slideIn`}>
      <Icon size={20} />
      <span className="flex-1 font-semibold">{message}</span>
      <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1.5 transition-all">
        <X size={16} />
      </button>
    </div>
  );
}