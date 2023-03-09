import { NextFunction, Request, Response } from 'express';
import { flightData } from '../data/dataV2'

const getAll = (req: Request, res: Response, next: NextFunction) => {
  res.send(flightData);
};

const getRouteById = (req: Request, res: Response, next: NextFunction) => {
  const routeId = req.params.routeId;
  const flights = flightData.find(flight => flight.route_id === routeId);
  if (!flights) {
    res.status(404).json({ message: `Flight route with id ${req.params.routeId} not found` })
  } 
  res.status(200).json({ flights });
}

const getByLocation = (req: Request, res: Response, next: NextFunction) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const flights = flightData.find(
    flight => flight.departureDestination === departure
        && flight.arrivalDestination === arrival
  )
  if (!flights) {
    res.status(404).send({ message: `Flights from ${departure} to ${arrival} not found` })
  }
  res.status(200).send(flights);
}

const getLayover = (req: Request, res: Response, next: NextFunction) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const depart = req.body.departureAt
  const departFlight = flightData.find(flight => flight.departureDestination === departure)
  const firstFlight = departFlight?.itineraries.filter(
    flight => flight.departureAt === depart
    )
  const stopOver = departFlight?.arrivalDestination
  const stopArrive = firstFlight?.map(flight => flight.arrivalAt).toString()
  console.log(stopArrive)
  const arriveFlight = flightData.find(flight => flight.departureDestination === stopOver && flight.arrivalDestination === arrival)
  if (stopArrive) {
    const secondFlight = arriveFlight?.itineraries.filter(
      flight => flight?.departureAt > stopArrive
    )
    // console.log(secondFlight?.find(flight => flight[0]))
    return secondFlight
  }
  
  // console.log(secondFlight)
}

const getByTime = (req: Request, res: Response, next: NextFunction) => {
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
    res.status(404).send({ message: `Flights from destination ${departure} and ${arrival} at times ${depart} not found` })
  }
  res.status(200).send(flightTime);
}

const getFlightById = (req: Request, res: Response, next: NextFunction) => {
  const flightId = req.params.flightId;
  const findFlight = flightData.map(flight => flight.itineraries.find(item => 
    item.flight_id === flightId) 
  )
  if (!findFlight) {
    res.status(404).send({ message: `Cannot find flight with ID ${flightId}` })
  }
  res.status(200).send(findFlight);
}

const bookFlight = (req: Request, res: Response, next: NextFunction) => {
  const flightId = req.params.flightId;
  const flightDetails = flightData.map(flight => flight.itineraries.find(item => 
    item.flight_id === flightId) 
  )
  flightData.map(flight => flight.itineraries.find(item => {
    if (item.flight_id === flightId && item.availableSeats > 0) {
      item.availableSeats--
      res.status(200).send(flightDetails);
    }
  }
))
  res.status(404).send({ message: `No seats available for flight ${flightId}` })
}

export default { getAll, getRouteById, getByLocation, getLayover, getByTime, getFlightById, bookFlight };
