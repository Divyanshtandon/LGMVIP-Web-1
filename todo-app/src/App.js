import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editedTodo, setEditedTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index, todo) => {
    setEditingIndex(index);
    setEditedTodo(todo.text);
  };

  const handleUpdateTodo = () => {
    if (editedTodo.trim() !== '') {
      const updatedTodos = todos.map((todo, index) =>
        index === editingIndex ? { ...todo, text: editedTodo } : todo
      );
      setTodos(updatedTodos);
      setEditingIndex(-1);
      setEditedTodo('');
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo App</h1>
      </header>
      <div className="todo-container">
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Enter your todo..."
          />
          <button onClick={handleAddTodo}>Add</button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className={todo.completed ? 'completed' : ''}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
              ) : (
                <span>{todo.text}</span>
              )}
              <div className="buttons">
                {editingIndex === index ? (
                  <button onClick={handleUpdateTodo}>Save</button>
                ) : (
                  <button onClick={() => handleEditTodo(index, todo)}>Edit</button>
                )}
                <button onClick={() => handleToggleComplete(index)}>
                  {todo.completed ? 'Undo' : 'Done'}
                </button>
                <button onClick={() => handleDeleteTodo(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
