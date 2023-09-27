import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../context/ContextProvider.jsx";

export default function TodoForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [todo, setTodo] = useState({
    id: null,
    title: '',
    description: '',
    status: 'pending',
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
          navigate('/user/todos');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient.post('/user/todos', todo)
        .then(() => {
          setNotification('Todo was successfully created');
          navigate('/user/todos');
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
    <>
      {todo.id && <h1>Update Todo: {todo.title}</h1>}
      {!todo.id && <h1>New Todo</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
          <input
            id="title"
            value={todo.title}
            onChange={(ev) => setTodo({ ...todo, title: ev.target.value })}
            placeholder="Title"
          />
          <input
            id="description"
            value={todo.description}
            onChange={(ev) => setTodo({ ...todo, description: ev.target.value })}
            placeholder="Description"
          />
          <select
            id="status"
            value={todo.status}
            onChange={(ev) => setTodo({ ...todo, status: ev.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <input
            id="due"
            type="date"
            value={todo.due}
            onChange={(ev) => setTodo({ ...todo, due: ev.target.value })}
            placeholder="Due Date"
          />
          <button className="btn">Save</button>
        </form>

        )}
      </div>
    </>
  );
}
