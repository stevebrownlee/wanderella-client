import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [airlines, setAirlines] = useState([])
  const [flightsForAirline, setFlightsForAirline] = useState([])
  const [chosenFlight, setChosenFlight] = useState(0)

  const getTheAirlinesStateFromTheAPI = () => {
    fetch("http://localhost:8000/airlines", {
      headers: {
        "Authorization": "Token e71c19e5deb906fac5f2b3a4e7491bac4d41c6da"
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
        "Authorization": "Token e71c19e5deb906fac5f2b3a4e7491bac4d41c6da"
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
          <label>Select an airline to travel with:</label>
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
            flightsForAirline.map(flight => <>
                <input type="radio" key={`flight--${flight.id}`} name="flight" onChange={() => setChosenFlight(flight.id)} />{flight.flight_number}
              </>)
          }
        </fieldset>
      </form>
    </div>
  )
}

export default App
