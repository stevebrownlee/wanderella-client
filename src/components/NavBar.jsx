import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <NavLink to={"/travels"}>My Travels</NavLink>
            </li>
            {
                (localStorage.getItem("wanderella_token") !== null) ?
                    <li className="navbar__item">
                        <button className="underline text-blue-600 hover:text-purple-700"
                            onClick={() => {
                                localStorage.removeItem("wanderella_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> : ""
            }
        </ul>
    )
}