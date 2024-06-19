import { useEffect, useState } from 'react'

function Booking() {
    const [airlines, setAirlines] = useState([])
    const [flightsForAirline, setFlightsForAirline] = useState([])
    const [chosenFlight, setChosenFlight] = useState(0)

    const getTheAirlinesStateFromTheAPI = async () => {
        const response = await fetch("http://localhost:8000/airlines", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wanderella_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setAirlines(parsedJSONString)
    }

    const goGetFlightsForAirline = (changeEvent) => {
        fetch(`http://localhost:8000/flights?airline=${changeEvent.target.value}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wanderella_token")).token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setFlightsForAirline(data)
            })
    }

    useEffect(() => { getTheAirlinesStateFromTheAPI() }, [])

    return (
        <div>
            <h1>Book a New Adventure</h1>
            <form className="bookingform">
                <fieldset>
                    <legend>Choose an airline</legend>

                    <label>Select an airline:</label>
                    <select id="airlines" onChange={(event) => goGetFlightsForAirline(event)}>
                        <option value="0">-- Choose airline --</option>
                        {
                            airlines.map(airline => <option key={`airline--${airline.id}`} value={airline.id}>{airline.name}</option>)
                        }
                    </select>
                </fieldset>

                {
                    flightsForAirline.length
                        ? <fieldset>
                            <legend>Choose a flight</legend>

                            {
                                flightsForAirline.map(flight => <span key={`flight--${flight.id}`}>
                                    <input type="radio"
                                        name="flight"
                                        onChange={() => setChosenFlight(flight.id)} />{flight.flight_number}
                                </span>)
                            }
                        </fieldset>
                        : ""
                }
            </form>
        </div>
    )
}

export default Booking
