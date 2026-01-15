export default function Stats({ todos }) {
  const safeTodos = Array.isArray(todos) ? todos : [];

  const total = safeTodos.length;
  const done = safeTodos.filter(t => t.completed).length;
  const pending = total - done;
  const progress = total > 0 ? (done / total) * 100 : 0;

  return (
    <div className="space-y-4 mb-8">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-violet-500 to-purple-400 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-1">Total</div>
          <div className="text-4xl font-bold">{total}</div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-1">Terminées</div>
          <div className="text-4xl font-bold">{done}</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-blue-400 rounded-2xl p-6 text-white shadow-lg">
          <div className="text-sm font-medium opacity-90 mb-1">En cours</div>
          <div className="text-4xl font-bold">{pending}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-violet-800">
            Progression
          </span>
          <span className="text-xl font-bold text-violet-800">
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-violet-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-violet-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
