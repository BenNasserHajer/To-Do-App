// import { Plus } from "lucide-react";
// import { useState } from "react";

// export default function TodoForm({ onAdd }) {
//   const [title, setTitle] = useState("");
//   const [priority, setPriority] = useState("LOW");

//   return (
//     <div className="card bg-base-100 shadow p-4">
//       <input
//         className="input input-bordered mb-2"
//         placeholder="New task..."
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />

//       <select
//         className="select select-bordered mb-2"
//         value={priority}
//         onChange={e => setPriority(e.target.value)}
//       >
//         <option>LOW</option>
//         <option>MEDIUM</option>
//         <option>HIGH</option>
//       </select>

//       <button
//         className="btn btn-primary"
//         onClick={() => {
//           onAdd(title, priority);
//           setTitle("");
//         }}
//       >
//         <Plus size={18} /> Add Task
//       </button>
//     </div>
//   );
// }


import { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    
    if (!title.trim()) {
      setError("Le titre est obligatoire");
      return;
    }
    
    if (title.trim().length < 3) {
      setError("Le titre doit contenir au moins 3 caractères");
      return;
    }
    
    if (title.trim().length > 100) {
      setError("Le titre ne doit pas dépasser 100 caractères");
      return;
    }
    
    onAdd(title.trim(), priority);
    setTitle("");
    setPriority("LOW");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-violet-800 mb-4 flex items-center gap-2">
        <Plus size={24} className="text-violet-600" />
        Nouvelle tâche
      </h2>
      
      <div className="space-y-4">
        <div>
          <input
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all ${
              error ? "border-red-400 bg-red-50" : "border-violet-200"
            }`}
            placeholder="Que devez-vous faire ?"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
          />
          {error && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
          <div className="text-xs text-violet-500 mt-1 font-medium">
            {title.length}/100 caractères
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setPriority("LOW")}
            className={`py-2.5 px-4 rounded-xl font-bold transition-all ${
              priority === "LOW"
                ? "bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-md"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            Basse
          </button>
          <button
            onClick={() => setPriority("MEDIUM")}
            className={`py-2.5 px-4 rounded-xl font-bold transition-all ${
              priority === "MEDIUM"
                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md"
                : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            Moyenne
          </button>
          <button
            onClick={() => setPriority("HIGH")}
            className={`py-2.5 px-4 rounded-xl font-bold transition-all ${
              priority === "HIGH"
                ? "bg-gradient-to-br from-rose-400 to-red-500 text-white shadow-md"
                : "bg-rose-50 text-rose-700 hover:bg-rose-100"
            }`}
          >
            Haute
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
        >
          <Plus size={20} />
          Ajouter la tâche
        </button>
      </div>
    </div>
  );
}