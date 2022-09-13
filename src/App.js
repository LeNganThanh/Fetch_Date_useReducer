import React, { useEffect, useReducer } from "react";
import "./App.css";

//initial variables
const initState = {
  resource: "users",
  data: [],
};

//declare reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "setResource": {
      return {
        ...state,
        resource: action.resVal,
      };
    }
    case "getData": {
      return {
        ...state,
        data: action.valData,
      };
    }
    default:
      throw new Error("Data not found.");
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initState);

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

  //get data via parameter get from fetch
  function setItems(datas) {
    dispatch({
      type: "getData",
      valData: datas,
    });
  }

  //get sort of resource via parameter get from Click event
  function setResource(val) {
    dispatch({
      type: "setResource",
      resVal: val,
    });
  }
  return (
    <div className="container">
      <div>
        <button onClick={() => setResource("Posts")}>Posts</button>
        <button onClick={() => setResource("Users")}>Users</button>
        <button onClick={() => setResource("Comments")}>Comments</button>
      </div>
      <h1>{state.resource}</h1>
      <ol>
        {state.data.map(item => (
          <li key={item.id} style={{ padding: "8px" }}>
            {JSON.stringify(item)}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
