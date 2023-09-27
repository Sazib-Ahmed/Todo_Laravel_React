import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function AdminLayout() {
  const {id, user, roles, setRole, token, setUser, setToken, notification} = useStateContext();

  if (!token || !roles === "admin") {
    return <Navigate to="/login"/>
  }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <div className="content">
        <header>
          <div>
            <h1>Admin Panel</h1>
          </div>

          <div>
            {user && user.name && (
              <>
                {user.name} &nbsp; &nbsp;

                <Link to="admin/dashboard">Dashboard</Link>
                 <Link to="admin/users">Users</Link>
                 <Link to="admin/todos">Todos</Link>
                <a onClick={onLogout} className="btn-logout" href="#">
                  Logout
                </a>
              </>
            )}
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
