import { useEffect, useState } from 'react'
import "./Bookings.css"

function Booking() {
    const [adventurePrice, setPrice] = useState(0)
    const [adventureDate, setDate] = useState("")
    const [cars, setCars] = useState([])
    const [chosenCar, setChosenCar] = useState(0)
    const [airlines, setAirlines] = useState([])
    const [flightsForAirline, setFlightsForAirline] = useState([])
    const [chosenFlight, setChosenFlight] = useState({})
    const [searchCity, setSearchCity] = useState("")
    const [foundHotels, setFoundHotels] = useState([])
    const [chosenHotel, setChosenHotel] = useState({})

    const getTheAirlinesStateFromTheAPI = async () => {
        const response = await fetch("http://localhost:8000/airlines", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wanderella_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setAirlines(parsedJSONString)
    }

    const getCarRentalOptionsFromAPI = async () => {
        const response = await fetch("http://localhost:8000/cars", {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wanderella_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setCars(parsedJSONString)
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

    const findHotelForCity = async () => {
        const response = await fetch(`http://localhost:8000/hotels?city=${searchCity}`, {
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("wanderella_token")).token}`
            }
        })
        const parsedJSONString = await response.json()
        setFoundHotels(parsedJSONString)
    }

    useEffect(() => {
        getTheAirlinesStateFromTheAPI()
        getCarRentalOptionsFromAPI()
    }, [])

    return (
        <div>
            <h1>Book a New Adventure</h1>
            <form className="bookingform" onSubmit={e => e.preventDefault()}>
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
                                        onChange={() => setChosenFlight(flight)} />{flight.flight_number}
                                </span>)
                            }
                        </fieldset>
                        : ""
                }

                <fieldset>
                    <legend>Search for hotels in your destination city</legend>

                    <input type="text" placeholder='Enter city...' value={searchCity}
                        onChange={e => setSearchCity(e.target.value)}
                        onKeyUp={e => {
                            if (e.key === "Enter") {
                                findHotelForCity()
                            }
                        }} />
                </fieldset>

                <fieldset>
                    <legend>Choose a matching hotel</legend>

                    {
                        foundHotels.map(hotel => <div className='hotelAmenities'>
                            <div>
                                <input type="radio" name="chosenHotel"
                                    onChange={() => setChosenHotel(hotel)} />{hotel.name}
                            </div>
                            <div>
                                {
                                    hotel.amenities.map(amenity => <button>{amenity.name}</button>)
                                }
                            </div>
                        </div>)
                    }
                </fieldset>

                <fieldset>
                    <legend>Choose a rental car</legend>

                    <label>Select an car:</label>
                    <select id="cars" onChange={e => setChosenCar(e.target.value)}>
                        <option value="0">-- Choose vehicle --</option>
                        {
                            cars.map(car => <option key={`car--${car.id}`} value={car.id}>{car.make} {car.model}</option>)
                        }
                    </select>
                </fieldset>


                <fieldset>
                    <legend>Adventure date</legend>

                    <label>When do you want to start?:</label>
                    <input type="date" value={adventureDate} onChange={e => setDate(e.target.value)} />
                </fieldset>


                <fieldset>
                    <legend>Price Quote</legend>

                    <label>Price of all accomodations:</label>
                    <input type="number" value={adventurePrice} onChange={e => setPrice(e.target.value)} />
                </fieldset>


            </form>
        </div>
    )
}

export default Booking
