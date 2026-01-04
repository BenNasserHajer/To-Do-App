// import { Trash2, CheckCircle } from "lucide-react";

// export default function TodoItem({ todo, onToggle, onDelete }) {
//   return (
//     <div className="card bg-base-100 shadow p-4 flex justify-between items-center">
//       <div>
//         <h3 className={`font-semibold ${todo.completed && "line-through"}`}>
//           {todo.title}
//         </h3>
//         <span className={`badge badge-${todo.priority === "HIGH" ? "error" :
//           todo.priority === "MEDIUM" ? "warning" : "success"}`}>
//           {todo.priority}
//         </span>
//       </div>

//       <div className="flex gap-2">
//         <button className="btn btn-success btn-sm" onClick={onToggle}>
//           <CheckCircle size={16} />
//         </button>
//         <button className="btn btn-error btn-sm" onClick={onDelete}>
//           <Trash2 size={16} />
//         </button>
//       </div>
//     </div>
//   );
// }


import { CheckCircle, Circle, AlertCircle, Star, Trash2 } from "lucide-react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  const priorityConfig = {
    HIGH: {
      gradient: "from-rose-400 to-red-500",
      icon: AlertCircle
    },
    MEDIUM: {
      gradient: "from-amber-400 to-orange-500",
      icon: Star
    },
    LOW: {
      gradient: "from-emerald-400 to-green-500",
      icon: Circle
    }
  };

  const config = priorityConfig[todo.priority];
  const PriorityIcon = config.icon;

  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 ${
      todo.completed ? "opacity-60" : ""
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={onToggle}
            className="mt-0.5 transition-all"
          >
            {todo.completed ? (
              <CheckCircle size={24} className="text-violet-600" />
            ) : (
              <Circle size={24} className="text-violet-300 hover:text-violet-500" />
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`text-lg font-bold mb-2 ${
              todo.completed 
                ? "line-through text-gray-400" 
                : "text-gray-800"
            }`}>
              {todo.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${config.gradient} text-white shadow-sm flex items-center gap-1`}>
                <PriorityIcon size={12} />
                {todo.priority === "HIGH" ? "Haute" : todo.priority === "MEDIUM" ? "Moyenne" : "Basse"}
              </span>
              {todo.completed && (
                <span className="text-xs font-bold text-violet-600">
                  Terminée
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}