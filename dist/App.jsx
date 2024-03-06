import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        name: newTodo,
        description: newDescription,
        status: "Not Completed"
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      setNewDescription("");
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === "All") {
      return true;
    } else if (statusFilter === "Completed") {
      return todo.status === "Completed";
    } else {
      return todo.status === "Not Completed";
    }
  });

  return (
    <div>
      <h1>My Todos</h1>
      <div className="inp">
        <input
          type="text"
          placeholder="Todo Name"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={newDescription}
          onChange={e => setNewDescription(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div>
        <label>Status Filter:</label>
        <select className="select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      {filteredTodos.map(todo => (
        <div className= "box"key={todo.id}>
          <h3>{todo.name}</h3>
          <p>{todo.description}</p>
          <p>
            Status: {todo.status}{" "}
            <button
              onClick={() =>
                handleStatusChange(
                  todo.id,
                  todo.status === "Not Completed" ? "Completed" : "Not Completed"
                )
              }
            >
              Change Status
            </button>
          </p>
          <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
