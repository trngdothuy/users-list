import './App.css';
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({name: '', age: ''});
  const [error, setError] = useState(null);

  // Fetch data 
  useEffect(() => {
    fetch('http://13.51.170.36:8000/items')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response not ok');
      }
      return response.json(); //parse the response json
    })
    .then((data) => {
      console.log('Fetched data:', data);
      setData(data.items || []);
    })
    .catch((error) => {
      console.log('API error:', error);
      setError(error.message); 
    });
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      });
      const newItem = await res.json();
      setData([...data, newItem]);
      setForm({name: '', age: ''});
      console.log(newItem)
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://13.51.170.36:8000/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Update FE list after deleting
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      setError("Could not delete item");
    }
  };
  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Users List</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <button type="submit">Add User</button>
      </form>
      {error && <p className="text-danger">{`Error: ${error}`}</p>}
        <ul className="list-group mt-4">
          {Array.of(data).length > 0 ? (
            <div className="row">
              {data.map((item, index) => (
                <li 
                  key={index} 
                  className="list-group-item d-flex justify-content-between align-items-center py-2 px-3">
                <div className="flex-grow-1 me-3">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${item.name}&background=random&size=32`}
                    alt={item.name}
                    width="32"
                    style={{borderRadius: '50%'}}
                  />
                  <strong className="fw-bold text-truncate">{item.name}</strong> <br/>
                  <small className="text-muted">{item.age} years old</small> 
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <i className="bi bi-trash">Delete</i>
                </button>
                </li>
          ))}
            </div>
            ) : (
              <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
      )}
        </ul>
    </div>
  );
}

export default App;
