import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Fetch todos from Django API when component mounts
    axios.get('/todos/')
    .then(response => {
      setTodos(response.data);
      setIsLoading(false);  // Set loading status to false after todos have been fetched
    })
    .catch(error => {
      console.error('Error fetching todos:', error);
      setIsLoading(false);  // Set loading status to false even if there's an error
    });
}, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Optimistically add new todo to the list of todos
    const newTodoItem = { task: newTodo, completed: false };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    toast('Form submitted successfully!', { type: 'success' });
    // Create new todo by making a POST request to Django API
    axios.post('/todos/', newTodoItem)
      .catch(error => {
        console.error('Error creating todo:', error);
        toast('Error submitting form.', { type: 'error' });
        // If there's an error, revert the optimistic update
        setTodos(todos);
      });
  };
  

  return (
    <div className="App" style={{ paddingLeft: '10px' }}>
      <div>
      <h1>List of TODOs</h1>
      {isLoading ? (
        <p>Loading...</p>  // Show a loading message or a spinner
      ) : (
        todos.map(todo => (
          <li key={todo.id}>{todo.task}</li>
        ))
      )}
    </div>
      <div>
        <h1>Create a TODO</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="todo">TODO: </label>
            <input type="text"   value={newTodo} onChange={handleInputChange} required/>
          </div>
          <div style={{"marginTop": "25px", paddingLeft: '20px'}}>
            <button  type="submit">ADD TODO</button>
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
