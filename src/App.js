import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [resource, setResource] = useState('Posts');
  const [items, setItems] = useState([]);


  useEffect(() => {
    // fetch(`https://jsonplaceholder.typicode.com/${resource}/?_limit=10`)
    //   .then(response => response.json())
    //   .then(json => setItems(json))
    async function fetchData() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${resource}?_limit=10`);
      const data = await response.json();
      setItems(data);
    }
    fetchData();
  })

  return (
    <div className="container">
      <div>
        <button onClick={() => setResource('Posts')}>Posts</button>
        <button onClick={() => setResource('Users')}>Users</button>
        <button onClick={() => setResource('Comments')}>Comments</button>
      </div>
      <h1>{resource}</h1>
      <ul>
        {items.map(item => <li key={item.id}>{JSON.stringify(item)}</li>)}
      </ul>
    </div>
  );
}

export default App;
