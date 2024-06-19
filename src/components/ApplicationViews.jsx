import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../views/Login.jsx"
import { Register } from '../views/Register.jsx'
import Booking from '../views/Booking.jsx'
import { Home } from '../views/Home.jsx'


export const ApplicationViews = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Authorized />}>
                <Route path="/" element={ <Home /> } />
                <Route path="/booking" element={ <Booking /> } />
                <Route path="/travels" element={ <h1>My Travel Log</h1> } />
            </Route>

        </Routes>
    </BrowserRouter>
}