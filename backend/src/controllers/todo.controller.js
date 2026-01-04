import db from "../db.js";

export const getTodos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM todos ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};


export const createTodo = async (req, res) => {
  const { title, priority } = req.body;
  await db.query(
    "INSERT INTO todos (title, priority) VALUES (?,?)",
    [title, priority]
  );
  res.sendStatus(201);
};

export const updateTodo = async (req, res) => {
  try {
    const { title, priority, completed } = req.body;
    const { id } = req.params;

    // Récupérer d'abord la tâche existante
    const [rows] = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const existingTodo = rows[0];
    
    // Utiliser les valeurs existantes si non fournies
    const updatedTitle = title !== undefined ? title : existingTodo.title;
    const updatedPriority = priority !== undefined ? priority : existingTodo.priority;
    const updatedCompleted = completed !== undefined ? completed : existingTodo.completed;

    // Mettre à jour la tâche
    await db.query(
      "UPDATE todos SET title=?, priority=?, completed=? WHERE id=?",
      [updatedTitle, updatedPriority, updatedCompleted, id]
    );
    
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
};
export const deleteTodo = async (req, res) => {
  await db.query("DELETE FROM todos WHERE id=?", [req.params.id]);
  res.sendStatus(200);
};
