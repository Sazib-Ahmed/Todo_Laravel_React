import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider.jsx";
import { useParams } from "react-router-dom";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification, id } = useStateContext();
  const userId = id; // Assign 0 as the default value if id is null

  useEffect(() => {
    getTodosByUserId();
  }, [userId]); // Trigger the effect when the `userId` changes

  const onDeleteClick = (todo) => {
    if (!window.confirm("Are you sure you completed this todo?")) {
      return;
    }
    axiosClient.delete(`/todos/${todo.id}`)
      .then(() => {
        setNotification('Todo was successfully deleted');
        getTodosByUserId();
      });
  };

  const getTodosByUserId = () => {
    setLoading(true);
    axiosClient.get(`/todos/user/${userId}`)
      .then(({ data }) => {
        setLoading(false);
        setTodos(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Todos for User {userId}</h1>
        <Link className="btn-add" to={`/user/${userId}/todos/new`}>Add New</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.status}</td>
                  <td>{todo.due}</td>
                  <td>
                    <Link className="btn-edit" to={`/user/${userId}/todos/${todo.id}`}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={(ev) => onDeleteClick(todo)}>Complete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
