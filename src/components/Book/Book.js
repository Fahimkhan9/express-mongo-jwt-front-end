import React from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
// import 'date-fns';
import {
    MuiPickersUtilsProvider,

    KeyboardDatePicker,
  } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';
import Booking from '../Bookings/Booking';
const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser]  = useContext(UserContext)
    const [selectedDate, setSelectedDate] = React.useState({
      checkin: new Date(),
      checkout: new Date()
    })
    const handleCheckinDate = (date) => {
      const newdated= {...selectedDate}
      newdated.checkin = date

      setSelectedDate(newdated);
    };
  const handleCheckoutDate =(date) => {
    const newdated= {...selectedDate}
    newdated.checkout = date

    setSelectedDate(newdated);
  }
  const handlebooking =() => {
    alert("booked")
    const newbooking = {...loggedInUser,...selectedDate}
fetch("http://localhost:8000/addbooking",{
  method:"POST",
  headers:{"Content-Type": "application/json"},
  body: JSON.stringify(newbooking)
})
.then(res => res.json())
.then(data => console.log(data))

  }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>hello {loggedInUser.name}Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate.checkin}
          onChange={handleCheckinDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate.checkout}
          onChange={handleCheckoutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       
      </Grid>
    </MuiPickersUtilsProvider>
    <Button color="primary" onClick={handlebooking}>Book Now</Button>
    <Booking/>
        </div>
    );
};

export default Book;