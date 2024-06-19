import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./NavBar.jsx"

export const Authorized = () => {
  if (localStorage.getItem("wanderella_token")) {
    return <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login' replace />
}
