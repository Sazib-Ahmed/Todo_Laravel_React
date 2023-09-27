import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function UserLayout() {
  const {id, user, roles, token, setUser, setToken, notification} = useStateContext();

  if (!token || !roles === "user") {
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
          <h1>User Panel</h1>
          </div>

          <div>
            {user?.name} &nbsp; &nbsp;
            <Link className="btn-logout" to="user/dashboard">Dashboard</Link>
             <Link className="btn-logout" to={'/user/users/'+{id}}>Profile</Link>
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
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
