import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import expressAsyncHandler from 'express-async-handler';
import Flight from '../models/Flight';


const getAll = async (req: Request, res: Response) => {
  const flights = await Flight.find();
  res.send(flights);
};

const getRouteById = async (req: Request, res: Response) => {
  const flightId = req.params.flightId;
  const flights = await Flight.findById(flightId);
  if (!flights) {
    res.status(404).json({ message: `Flight route with id ${req.params.flightId} not found` })
  } 
  res.status(200).json({ flights });
}

const getByRouteCode = async (req: Request, res: Response) => {
  const routeCode = req.params.routeCode
  const flights = await Flight.findOne({routeCode: req.params.routeCode});
  if (!flights) {
    res.status(404).send({ message: `Flight route with code ${routeCode} not found` })
  }
  res.status(200).send(flights);
}

const getByLocation = async (req: Request, res: Response) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  console.log('req body', req.body)
  const flights = await Flight.find({
    departureDestination: departure,
    arrivalDestination: arrival
  });
  if (!flights) {
    res.status(404).send({ message: `Flights from destination ${departure} and ${arrival} not found` })
  }
  res.status(200).send(flights.map(flight => flight));
}

const getByTime = async (req: Request, res: Response) => {
  const departure = req.body.departureDestination
  const arrival = req.body.arrivalDestination
  const depart = req.body.departureAt
  const date = depart.split('T');
  console.log(depart)
  const arrive = req.body.arrivalAt
  console.log('req body', req.body)
  const flightLocation = await Flight.find({
    departureDestination: departure,
    arrivalDestination: arrival,
  });
  const flightDetails = flightLocation.map(flight => flight.flights)
  console.log('flight location:', flightDetails)
  const flightTimes = flightDetails.map(flight => console.log(flight.departureAt))
  if (!flightTimes) {
    res.status(404).send({ message: `Flights from destination ${departure} and ${arrival} at times ${depart} not found` })
  }
  res.status(200).send(flightTimes);
}

export default { getAll, getRouteById, getByRouteCode, getByLocation, getByTime };

// const createFlight = (req: Request, res: Response, next: NextFunction) => {
//   const { name } = req.body;
//   const flight = new Flight({
//     _id: new mongoose.Types.ObjectId(),
//     name
//   });
//   return flight
//     .save()
//     .then((flight) => res.status(201).json({ flight }))
//     .catch((error) => res.status(500).json({ error }));
// };

// const readAll = (req: Request, res: Response, next: NextFunction) => {
//   return Flight.find()
//     .then((flights) => (res.status(200).json({ flights })))
//     .catch((error) => res.status(500).json({ error }));
// };

// const readRoute = async (req: Request, res: Response, next: NextFunction) => {
//   const routeId = req.params.flightId;
//   console.log(routeId, 'request flightId')
//   return Flight.findById(req.params._id)
//   .then((flight) => (flight ? res.status(200).json({ flight }) : res.status(404).json({ message: 'Not found'})))
//   .catch((error) => res.status(500).json({ error }))
// };

// const readFlight = (req: Request, res: Response, next: NextFunction) => {
//   const flightId = req.params.flightId;
//   return Flight.findById(flightId)
//   .then((flight) => (flight ? res.status(200).json({ flight }) : res.status(404).json({ message: 'Not found'})))
//   .catch((error) => res.status(500).json({ error }))
// };


// const updateFlight = (req: Request, res: Response, next: NextFunction) => {
//   const flightId = req.params.flightId;
//   return Flight.findById(flightId)
//     .then((flight) => {
//       if (flight) {
//         flight.set(req.body);
//         return flight
//           .save()
//           .then((flight) => res.status(201).json({ flight }))
//           .catch((error) => res.status(500).json({ error }));
//       } else {
//         res.status(404).json({ message: 'Not found' });
//       }
//     })
//     .catch((error) => res.status(500).json({ error }));
// };
// const deleteFlight = (req: Request, res: Response, next: NextFunction) => {
//   const flightId = req.params.flightId;
//   return Flight.findByIdAndDelete(flightId)
//     .then((flight) => (flight ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found '}))) 
// };

// export default { createFlight, readRoute, readFlight, readAll, updateFlight, deleteFlight };

