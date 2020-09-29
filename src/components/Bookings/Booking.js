import React, { useState,useEffect, useContext } from 'react'
import { UserContext } from '../../App'

function Booking() {
    const [booking,setBooking] = useState([])
    const [loggedInUser, setLoggedInUser]  = useContext(UserContext)

    useEffect(() => {
fetch(`http://localhost:8000/bookings?email=${loggedInUser.email}`,{
    headers:{
        "Content-Type" : "application/json",
        authorization:`Bearer ${sessionStorage.getItem("token")}`
    }
})
.then(res=> res.json())
.then(data => setBooking(data))
    },[])
    console.log(booking);
    return (
        <div>
            <h3>you have {booking.length}</h3>
            {
                booking.map(bdata => <li>{bdata.name} from : {bdata.checkin} to : {bdata.checkout}</li>)
            }
        </div>
    )
}

export default Booking
