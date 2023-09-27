import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function TodoForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [todo, setTodo] = useState({
    userId: id, // Set userId to id
    title: '',
    description: '',
    status: 'pending', // Set a default status
    due: ''
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/todos/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setTodo(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (todo.id) {
      axiosClient.put(`/todos/${todo.id}`, todo)
        .then(() => {
          setNotification('Todo was successfully updated');
          navigate('/todos');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/todos', todo)
        .then(() => {
          setNotification('Todo was successfully created');
          navigate('/todos');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {todo.id && <h1 className="mb-4">Update Todo: {todo.title}</h1>}
          {!todo.id && <h1 className="mb-4">New Todo</h1>}
          <div className="card">
            {loading && (
              <div className="card-body text-center">Loading...</div>
            )}
            {errors && (
              <div className="alert alert-danger">
                {Object.keys(errors).map((key) => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            )}
            {!loading && (
              <form className="card-body" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    id="title"
                    className="form-control"
                    value={todo.title}
                    onChange={(ev) => setTodo({ ...todo, title: ev.target.value })}
                    placeholder="Title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    id="description"
                    className="form-control"
                    value={todo.description}
                    onChange={(ev) => setTodo({ ...todo, description: ev.target.value })}
                    placeholder="Description"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    id="status"
                    className="form-select"
                    value={todo.status}
                    onChange={(ev) => setTodo({ ...todo, status: ev.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="due" className="form-label">Due Date</label>
                  <input
                    id="due"
                    className="form-control"
                    type="date"
                    value={todo.due}
                    onChange={(ev) => setTodo({ ...todo, due: ev.target.value })}
                    placeholder="Due Date"
                  />
                </div>
                <button className="btn btn-primary">Save</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
