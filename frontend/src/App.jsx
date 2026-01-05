import { useEffect, useState } from "react";
import { Filter, Circle } from "lucide-react";
import api from "./services/api";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import Stats from "./components/Stats";
import ToastContainer from "./components/ToastContainer";

 

const logoLeft = "https://todo-app-s3-test.s3.us-east-1.amazonaws.com/pink.jpg";
const logoRight = "https://todo-app-s3-test.s3.us-east-1.amazonaws.com/brown.jpg";
const sidebarLeft = "https://todo-app-s3-test.s3.us-east-1.amazonaws.com/with-pencil.jpg";
const sidebarRight = "https://todo-app-s3-test.s3.us-east-1.amazonaws.com/blue.jpg";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/todos");
      setTodos(res.data);
    } catch (error) {
      showToast("Erreur lors du chargement des tâches", "error");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (title, priority) => {
    try {
      await api.post("/todos", { title, priority });
      await loadTodos();
      showToast("Tâche ajoutée avec succès !", "success");
    } catch (error) {
      showToast("Erreur lors de l'ajout de la tâche", "error");
      console.error("Erreur:", error);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      await api.put(`/todos/${todo.id}`, {
        completed: !todo.completed
      });
      await loadTodos();
      showToast(
        todo.completed ? "Tâche réactivée !" : "Tâche terminée !",
        "success"
      );
    } catch (error) {
      showToast("Erreur lors de la modification", "error");
      console.error("Erreur:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      await loadTodos();
      showToast("Tâche supprimée !", "success");
    } catch (error) {
      showToast("Erreur lors de la suppression", "error");
      console.error("Erreur:", error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Images décoratives sur les côtés */}
      <img 
        src={sidebarLeft} 
        alt="Decoration" 
        className="fixed left-0 top-1/4 w-32 opacity-30 pointer-events-none hidden lg:block" 
      />
      <div 
        style={{ backgroundImage: `url(${sidebarRight})` }}
        className="fixed right-0 top-1/3 w-32 h-32 bg-cover bg-center opacity-30 pointer-events-none hidden lg:block" 
      />
      
      <div className="max-w-5xl mx-auto py-10 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-6 mb-4">
            {/* Image à gauche du titre */}
            <img src={logoLeft} alt="Logo" className="w-16 h-16 hidden md:block" />
            
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent mb-2">
                Ma Todo List
              </h1>
              <p className="text-black-600 font-medium">Organisez vos tâches efficacement</p>
            </div>
            
            {/* Image à droite du titre */}
            <img src={logoRight} alt="Logo" className="w-16 h-16 hidden md:block" />
          </div>
        </div>

        <Stats todos={todos} />
        <TodoForm onAdd={addTodo} />

        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={18} className="text-violet-600" />
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filter === "all" 
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md" 
                  : "text-violet-700 hover:bg-violet-50"
              }`}
            >
              Toutes ({todos.length})
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filter === "active" 
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md" 
                  : "text-violet-700 hover:bg-violet-50"
              }`}
            >
              Actives ({todos.filter(t => !t.completed).length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filter === "completed" 
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md" 
                  : "text-violet-700 hover:bg-violet-50"
              }`}
            >
              Terminées ({todos.filter(t => t.completed).length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
            <p className="text-violet-600 font-medium mt-4">Chargement...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <Circle size={48} className="mx-auto text-violet-300 mb-3" />
                <p className="text-violet-600 font-medium">Aucune tâche à afficher</p>
              </div>
            ) : (
              filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodo(todo)}
                  onDelete={() => deleteTodo(todo.id)}
                />
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
