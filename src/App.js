import React, { useEffect, useReducer } from "react";
import "./App.css";
const initState = {
  resource: "users",
  data: [],
};

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
  /*   const [resource, setResource] = useState("Posts");
  const [items, setItems] = useState([]);
 */
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

  function setItems(datas) {
    dispatch({
      type: "getData",
      valData: datas,
    });
  }

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
      <ul>
        {state.data.map(item => (
          <li key={item.id}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
