import React, { useEffect, useReducer } from "react";
import "./App.css";
const initialState = {
  resource: "Posts",
  items: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "Posts": {
      return {
        ...state,
        resource: action.value,
      };
    }
    case "Users": {
      return {
        ...state,
        resource: action.value,
      };
    }
    case "Comments": {
      return {
        ...state,
        resource: action.value,
      };
    }
    case "data": {
      return {
        ...state,
        items: action.value,
      };
    }
    default: {
      return state;
    }
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${state.resource}?_limit=10`
      );
      const data = await response.json();
      setItems(data);
    }
    fetchData();
  }, [state.resource]);

  function setItems(val) {
    dispatch({
      type: "data",
      value: val,
    });
  }
  return (
    <div className="container">
      <div>
        <button
          onClick={() => {
            dispatch({ type: "Posts", value: "Posts" });
          }}
        >
          Posts
        </button>
        <button
          onClick={() => {
            dispatch({ type: "Users", value: "Users" });
          }}
        >
          Users
        </button>
        <button
          onClick={() => {
            dispatch({ type: "Comments", value: "Comments" });
          }}
        >
          Comments
        </button>
      </div>
      <h1>{state.resource}</h1>
      <ul>
        {state.items.map(item => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
