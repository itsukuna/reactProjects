import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  id: number;
  description: string;
  dueDate: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newDueDate, setNewDueDate] = useState<string>("");

  const handleAddTask = (): void => {
    if (newTask.trim() !== "" && newDueDate.trim() !== "") {
      const task: Task = {
        id: Date.now(),
        description: newTask,
        dueDate: newDueDate,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setNewDueDate("");
    }
  };

  const handleRemoveTask = (taskId: number): void => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const isOverdue = (dueDate: string): boolean => {
    const today = new Date().toISOString().split("T")[0];
    return new Date(dueDate) < new Date(today);
  };

  const isDueToday = (dueDate: string): boolean => {
    const today = new Date().toISOString().split("T")[0];
    return new Date(dueDate).toISOString().split("T")[0] === today;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">To-Do List</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task description"
          className="form-control"
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`list-group-item d-flex justify-content-between align-items-center 
              ${
                isOverdue(task.dueDate) && !task.completed
                  ? "list-group-item-danger"
                  : ""
              }
              ${
                isDueToday(task.dueDate) && !task.completed
                  ? "list-group-item-warning"
                  : ""
              }`}
          >
            <span
              className={task.completed ? "text-decoration-line-through" : ""}
            >
              {task.description} - Due:{task.dueDate}
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleRemoveTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
