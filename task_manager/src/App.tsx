import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const handleNewTask = (): void => {
    if (newTask.trim() !== "") {
      const task: Task = { id: Date.now(), text: newTask, completed: false };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const handleCompletedTask = (taskId: number): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleRemoveTask = (taskId: number): void => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Task Manager</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          className="form-control"
        />
        <button onClick={handleNewTask} className="btn btn-primary">
          Add Task
        </button>
      </div>

      <div className="btn-group mb-3" role="group" aria-label="Filter tasks">
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          checked={filter === "all"}
          onChange={() => setFilter("all")}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio1">
          All
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          checked={filter === "pending"}
          onChange={() => setFilter("pending")}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio2">
          Pending
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          checked={filter === "completed"}
          onChange={() => setFilter("completed")}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio3">
          Completed
        </label>
      </div>

      <ul className="list-group">
        {filteredTasks.map((task) => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompletedTask(task.id)}
              />
              <label
                className={`form-check-label ms-2 ${
                  task.completed ? "text-decoration-line-through" : ""
                }`}
              >
                {task.text}
              </label>
            </div>
            <button
              type="button"
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
