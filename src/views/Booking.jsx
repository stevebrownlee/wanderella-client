import { useEffect, useState } from 'react'

function Booking() {
    const [airlines, setAirlines] = useState([])
    const [flightsForAirline, setFlightsForAirline] = useState([])
    const [chosenFlight, setChosenFlight] = useState(0)

    const getTheAirlinesStateFromTheAPI = () => {
        fetch("http://localhost:8000/airlines", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wanderella_token")).token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setAirlines(data)
            })
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

    useEffect(() => {
        getTheAirlinesStateFromTheAPI()
    }, [])

    return (
        <div>
            <form>
                <fieldset>
                    <label>Select an airline:</label>
                    <select id="airlines" onChange={(event) => goGetFlightsForAirline(event)}>
                        <option value="0">-- Choose airline --</option>
                        {
                            airlines.map(airline => <option key={`airline--${airline.id}`} value={airline.id}>{airline.name}</option>
                            )
                        }
                    </select>
                </fieldset>

                <fieldset>
                    <legend>Choose a flight</legend>

                    {
                        flightsForAirline.map(flight => <span key={`flight--${flight.id}`}>
                            <input type="radio"
                                name="flight"
                                onChange={() => setChosenFlight(flight.id)} />{flight.flight_number}
                        </span>)
                    }
                </fieldset>
            </form>
        </div>
    )
}

export default Booking
