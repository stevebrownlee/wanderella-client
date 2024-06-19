import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const navigate = useNavigate()

    return <div>
        <h1>Welcome to Wanderella</h1>
        <button onClick={() => navigate("/booking")}>Book Your Travel</button>
    </div>
}
