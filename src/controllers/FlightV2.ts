import { Request, Response } from 'express';
import { flightData } from '../data/dataV2'

const getAll = (req: Request, res: Response) => {
  if (!flightData) {
    res.status(500).json({ message: `Flight information not found` })
  }
  res.send(flightData);
};

const getRouteById = (req: Request, res: Response) => {
  const routeId = req.params.routeId;
  const flights = flightData.find(flight => flight.route_id === routeId);
  if (!flights) {
    res.status(404).json({ message: `Flight route with id ${req.params.routeId} not found` })
  } 
  res.status(200).send(flights);
};

const getByLocation = (req: Request, res: Response) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const flights = flightData.find(
    flight => flight.departureDestination === departure
        && flight.arrivalDestination === arrival
  );
  if (!flights) {
    res.status(404).send({ message: `Flights from ${departure} to ${arrival} not found. See connecting flights.` })
  };
  res.status(200).send(flights);
};

const getByDateTime = (req: Request, res: Response) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const depart = req.body.departureAt
  const flightLocation = flightData.find(
    flight => flight.departureDestination === departure && flight.arrivalDestination === arrival
  );
  const flightTime = flightLocation?.itineraries.filter(
    flight => flight.departureAt === depart
  )
  if (!flightTime) {
    res.status(404).send({ message: `Flights from destination ${departure} and ${arrival} at ${depart} not found` })
  }
  res.status(200).send(flightTime);
};

const getByDate = (req: Request, res: Response) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const date = req.body.departureDate
  console.log(date)
  const flightLocation = flightData.find(
    flight => flight.departureDestination === departure && flight.arrivalDestination === arrival
  );
  const flightTime = flightLocation?.itineraries.filter(
    flight => flight.departureDate === date
  )
  if (!flightTime) {
    res.status(404).send({ message: `Flights from destination ${departure} and ${arrival} on ${date} not found` })
  }
  res.status(200).send(flightTime);
};


const getConnectingFlight = (req: Request, res: Response) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const date = req.body.departureDate
  const depart = req.body.departureAt
  const departFlight = flightData.find(flight => flight.departureDestination === departure)
  const firstFlight = departFlight?.itineraries.filter(flight => flight.departureAt === depart)
  const stopOver = departFlight?.arrivalDestination
  const stopArriveDT = firstFlight?.map(flight => flight.arrivalAt).toString();
  const stopArrive = stopArriveDT?.split('T')[1].split(':')[0]
  const arriveFlightOptions = flightData.find(flight => flight.departureDestination === stopOver && flight.arrivalDestination === arrival);
  const secondFlights = arriveFlightOptions?.itineraries.filter(f => f.departureDate === date && f.departureTime > (stopArrive ? stopArrive : '00'))
  const secondFlight = secondFlights ? secondFlights[0] : {}
  const layover = secondFlights && firstFlight ? parseInt(secondFlights[0].departureTime) - parseInt(firstFlight[0].arrivalTime) : 'Unknown layover time'
  const connectedFlight = {
    "Departing flight": firstFlight,
    "Layover": `${layover} hours`,
    "Connecting flight": secondFlight,
  }
  res.status(200).send(connectedFlight);
};

const getFlightById = (req: Request, res: Response) => {
  const flightId = req.params.flightId;
  const findFlight = flightData.map(flight => flight.itineraries.find(item => 
    item.flight_id === flightId) 
  )
  const flight = findFlight?.filter(f => f !== null && f !== undefined);
  if (!flight) {
    res.status(404).send({ message: `Cannot find flight with ID ${flightId}` })
  }
  res.status(200).send(flight);
}

const bookFlightSeat = (req: Request, res: Response) => {
  const flightId = req.params.flightId;
  const flightDetails = flightData.map(flight => flight.itineraries.find(item => 
    item.flight_id === flightId)
  )
  const flightBooking = flightDetails?.filter(f => f !== null && f !== undefined);
  flightData.map(flight => flight.itineraries.find(item => {
    if (item.flight_id === flightId && item.availableSeats > 0) {
      item.availableSeats--
      res.status(200).send(flightBooking);
    }
  }
))
  res.status(404).send({ message: `No seats available for flight ${flightId}` })
}

export default { getAll, getRouteById, getByLocation, getConnectingFlight, getByDateTime, getByDate, getFlightById, bookFlightSeat };
